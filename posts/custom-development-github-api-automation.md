---
title: "Getting Data from the 'New' GitHub Projects API"
date: "2025-03-13"
category: "Custom Development"
excerpt: "Learn to automate and integrate GitHub Projects using the powerful API. Essential techniques for development teams and project management automation."
author: "JPanda Solutions"
readTime: "8 min read"
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
---

# Getting Data from the 'New' GitHub Projects API

**Level of Difficulty: Beginner – Senior**

GitHub Projects is nothing new – it has been around for a while now with a really cool API that allows you to pull data from it. For those who have made use of that functionality, it has been a breeze trying to automate and integrate different tasks across development workflows.

However, GitHub's "new" Projects experience (Projects V2) introduced significant changes to the API structure and capabilities, offering enhanced flexibility and more powerful automation possibilities.

## Understanding GitHub Projects V2

### Key Differences from Classic Projects
- **Enhanced data model**: More flexible field types and relationships
- **Improved API structure**: GraphQL-based with better query capabilities  
- **Advanced automation**: Richer workflow triggers and actions
- **Better integration**: Seamless connection with GitHub ecosystem

### API Architecture
The new GitHub Projects API uses GraphQL, providing:
- **Precise data fetching**: Request exactly the data you need
- **Reduced API calls**: Combine multiple requests into single queries
- **Real-time updates**: Efficient subscription mechanisms
- **Type safety**: Strongly typed schema definitions

## Getting Started with the API

### Authentication Setup

```javascript
// Using GitHub Personal Access Token
const headers = {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'GraphQL-Features': 'projects_next_graphql'
};
```

### Basic Project Query

```graphql
query GetProject($projectId: ID!) {
    node(id: $projectId) {
        ... on ProjectV2 {
            id
            title
            description
            url
            createdAt
            updatedAt
            owner {
                ... on Organization {
                    login
                }
                ... on User {
                    login
                }
            }
        }
    }
}
```

## Core API Operations

### 1. Fetching Project Data

```javascript
async function getProjectData(projectId) {
    const query = `
        query($projectId: ID!) {
            node(id: $projectId) {
                ... on ProjectV2 {
                    id
                    title
                    description
                    fields(first: 20) {
                        nodes {
                            ... on ProjectV2Field {
                                id
                                name
                                dataType
                            }
                            ... on ProjectV2SingleSelectField {
                                id
                                name
                                options {
                                    id
                                    name
                                    color
                                }
                            }
                        }
                    }
                    items(first: 50) {
                        nodes {
                            id
                            type
                            content {
                                ... on Issue {
                                    title
                                    state
                                    assignees(first: 5) {
                                        nodes {
                                            login
                                        }
                                    }
                                }
                                ... on PullRequest {
                                    title
                                    state
                                    author {
                                        login
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
    
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables: { projectId }
        })
    });
    
    return response.json();
}
```

### 2. Adding Items to Projects

```javascript
async function addIssueToProject(projectId, issueId) {
    const mutation = `
        mutation($projectId: ID!, $contentId: ID!) {
            addProjectV2ItemById(input: {
                projectId: $projectId
                contentId: $contentId
            }) {
                item {
                    id
                }
            }
        }
    `;
    
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: mutation,
            variables: {
                projectId,
                contentId: issueId
            }
        })
    });
    
    return response.json();
}
```

### 3. Updating Field Values

```javascript
async function updateProjectItem(projectId, itemId, fieldId, value) {
    const mutation = `
        mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: ProjectV2FieldValue!) {
            updateProjectV2ItemFieldValue(input: {
                projectId: $projectId
                itemId: $itemId
                fieldId: $fieldId
                value: $value
            }) {
                projectV2Item {
                    id
                }
            }
        }
    `;
    
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: mutation,
            variables: {
                projectId,
                itemId,
                fieldId,
                value
            }
        })
    });
    
    return response.json();
}
```

## Advanced Integration Patterns

### Automated Project Updates

```javascript
// Webhook handler for issue events
app.post('/webhook/issues', async (req, res) => {
    const { action, issue, repository } = req.body;
    
    if (action === 'opened') {
        // Automatically add new issues to project
        await addIssueToProject(PROJECT_ID, issue.node_id);
        
        // Set initial status
        await updateProjectItem(
            PROJECT_ID,
            itemId,
            STATUS_FIELD_ID,
            { singleSelectOptionId: BACKLOG_OPTION_ID }
        );
    }
    
    if (action === 'closed') {
        // Update status to completed
        await updateProjectItem(
            PROJECT_ID,
            itemId,
            STATUS_FIELD_ID,
            { singleSelectOptionId: DONE_OPTION_ID }
        );
    }
    
    res.status(200).send('OK');
});
```

### Reporting and Analytics

```javascript
async function generateProjectReport(projectId) {
    const projectData = await getProjectData(projectId);
    const items = projectData.data.node.items.nodes;
    
    const report = {
        totalItems: items.length,
        byStatus: {},
        byAssignee: {},
        completionRate: 0
    };
    
    items.forEach(item => {
        // Analyse status distribution
        const status = getFieldValue(item, 'Status');
        report.byStatus[status] = (report.byStatus[status] || 0) + 1;
        
        // Analyse assignee workload
        if (item.content.assignees) {
            item.content.assignees.nodes.forEach(assignee => {
                report.byAssignee[assignee.login] = 
                    (report.byAssignee[assignee.login] || 0) + 1;
            });
        }
    });
    
    // Calculate completion rate
    const completed = report.byStatus['Done'] || 0;
    report.completionRate = Math.round((completed / items.length) * 100);
    
    return report;
}
```

### Bulk Operations

```javascript
async function bulkUpdateItems(projectId, updates) {
    const promises = updates.map(update => 
        updateProjectItem(
            projectId,
            update.itemId,
            update.fieldId,
            update.value
        )
    );
    
    // Execute with concurrency limit
    const results = await Promise.allSettled(promises);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    return { successful, failed, total: updates.length };
}
```

## Power Platform Integration

### Power Automate Flow

```json
{
    "GitHubProjectSync": {
        "Trigger": "Recurrence - Every 15 minutes",
        "Actions": [
            {
                "HTTP_GetProjectData": {
                    "method": "POST",
                    "uri": "https://api.github.com/graphql",
                    "headers": {
                        "Authorization": "Bearer @{parameters('GitHubToken')}",
                        "Content-Type": "application/json"
                    },
                    "body": {
                        "query": "@variables('ProjectQuery')"
                    }
                }
            },
            {
                "Parse_JSON": {
                    "content": "@body('HTTP_GetProjectData')",
                    "schema": "@variables('GitHubProjectSchema')"
                }
            },
            {
                "Apply_to_each_Item": {
                    "foreach": "@body('Parse_JSON')?['data']?['node']?['items']?['nodes']",
                    "actions": {
                        "Create_SharePoint_Item": {
                            "site": "@parameters('SharePointSite')",
                            "list": "Project Items",
                            "item": {
                                "Title": "@items('Apply_to_each_Item')?['content']?['title']",
                                "GitHubId": "@items('Apply_to_each_Item')?['id']",
                                "Status": "@variables('MappedStatus')",
                                "LastUpdated": "@utcNow()"
                            }
                        }
                    }
                }
            }
        ]
    }
}
```

### Power Apps Integration

```powerapps
// Function to fetch GitHub project data
FetchGitHubProject() = 
    With(
        {
            Response: PowerApps.HTTPRequest(
                "POST",
                "https://api.github.com/graphql",
                {
                    "Authorization": "Bearer " & GitHubToken,
                    "Content-Type": "application/json"
                },
                JSON({
                    query: GitHubProjectQuery,
                    variables: { projectId: ProjectId }
                })
            )
        },
        ParseJSON(Response.Body)
    );
```

## Best Practices

### API Rate Limiting
- **Monitor usage**: Track API quota consumption
- **Implement caching**: Store frequently accessed data
- **Batch operations**: Combine multiple updates efficiently
- **Use webhooks**: Prefer event-driven updates over polling

### Error Handling
```javascript
async function safeApiCall(operation, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === retries) throw error;
            
            // Exponential backoff
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
        }
    }
}
```

### Security Considerations
- **Token management**: Secure storage and rotation
- **Webhook validation**: Verify payload signatures
- **Access control**: Principle of least privilege
- **Audit logging**: Track all API interactions

## Common Use Cases

### Team Productivity Tracking
- Monitor sprint progress and velocity
- Identify bottlenecks in development workflow
- Generate automated status reports
- Track individual and team contributions

### Release Management
- Coordinate feature releases across projects
- Automate deployment pipeline triggers
- Manage rollback procedures
- Track release metrics and success rates

### Customer Support Integration
- Link customer issues to development work
- Prioritise bug fixes based on customer impact
- Automate escalation procedures
- Generate customer communication updates

## Conclusion

The GitHub Projects V2 API provides powerful capabilities for automating development workflows and integrating project management with broader business processes. By leveraging GraphQL's flexibility and GitHub's rich ecosystem, teams can create sophisticated automation solutions.

Success with the GitHub Projects API requires understanding both the technical implementation and the business processes it supports. Start with simple data retrieval operations and gradually build more complex automation workflows as your expertise grows.

The investment in API integration pays dividends through improved team productivity, better project visibility, and enhanced coordination across development and business functions.