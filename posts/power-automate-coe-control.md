---
title: "Ensuring Center of Excellence (COE) Control of Apps and Automate Flows"
date: "2024-03-05"
category: "Digital Transformation"
excerpt: "Learn how to maintain governance and control over Power Platform environments, preventing orphaned artefacts and ensuring organisational oversight."
author: "JPanda Solutions"
readTime: "10 min read"
image: "https://thejpanda.com/wp-content/uploads/2024/02/update-artefact-owner.drawio.png"
---

# Ensuring Center of Excellence (COE) Control of Apps and Automate Flows

**Level of Difficulty: Beginner – Senior**

![Power Platform Governance](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

One of the biggest challenges in the Power Platform is maintaining control of the environments with the necessary visibility, especially when faced with the risk of orphaned artefacts (apps/flows without owners – possibly because the owner has left the organisation and the user account associated no longer exists).

The solution to this would be to assign ownership of all apps and flows in an environment to a service account or user group that contains users who should have visibility of what is happening in the environment. This user group would be a group of users who do not require elevated permissions. Elevated permissions allow access to the tenant and multiple other environments which goes against the "least access necessary" principle and is a GDPR (among other compliance regulations) violation.

Assigning a group or account to the flows and apps can be done on reoccurring basis (daily reoccurrence is recommended).

![COE Solution Architecture](https://thejpanda.com/wp-content/uploads/2024/02/update-artefact-owner.drawio.png)

This solution does not require any additional licensing as none of the connectors are premium – all connectors used in this flow are standard connectors:

![Power Automate Flow](https://thejpanda.com/wp-content/uploads/2024/02/flow-2.png)

The flow above assigns groups (of users) and individual users (service principal accounts) to apps and flows. Depending on your use case, you can reduce some of the actions in the flow to only work with the roles relevant to your use case.

## Retrieve Service Account/User Group for Use

To retrieve the service account profile and/or the user group, make use of the following configuration on the relevant actions:

![User Group Configuration](https://thejpanda.com/wp-content/uploads/2024/03/image-6.png)

## Set App Owner & Role Assignment

Once you've retrieved the user/group, you'll want to set the owner and add a role assignment per app. Which can be done as follows:

![App Owner Assignment](https://thejpanda.com/wp-content/uploads/2024/03/image-4.png)

The expression used to get the environment is as follows:

```
workflow()['tags']['environmentName']
```

The body of 'put item' is as follows:

```json
{
  "properties/roleName": "CanEdit",
  "properties/principal/email": outputs('List_groups')?['body/value'][0]['mail'],
  "properties/principal/id": outputs('List_groups')?['body/value'][0]['id'],
  "properties/principal/type": "Group",
  "properties/principal/tenantId": items('Apply_to_each_Power_App')?['properties/owner/tenantId']
}
```

If you are using a user instead of a group, change the principal type to 'User'.

## Modify Flow Owners

The same principle can be applied to flows.

![Flow Owner Modification](https://thejpanda.com/wp-content/uploads/2024/03/image-7.png)

The expression used to get the environment is as follows:

```
workflow()['tags']['environmentName']
```

The body of 'add user item' is as follows:

```json
{
  "properties/principal/id": outputs('List_groups')?['body/value'][0]['id'],
  "properties/principal/type": "Group"
}
```

If you are using a user instead of a group, change the principal type to 'User'.

Your flow should now be connected correctly. Don't forget the exception handling!

## Governance Policies

### App Creation Standards
- **Naming conventions**: Consistent naming across organisation
- **Documentation requirements**: Mandatory description and purpose
- **Approval workflows**: Pre-deployment review process
- **Environment assignment**: Proper environment allocation

### Ownership Management
- **Primary owner**: Designated app owner
- **Secondary owner**: Backup ownership for continuity
- **Business sponsor**: Department-level accountability
- **Regular reviews**: Quarterly ownership validation

## Technical Implementation

### COE Starter Kit Integration

The Microsoft COE Starter Kit provides:
- **Dashboard views**: Visual representation of platform usage
- **Automated workflows**: Orphan detection and notification
- **Compliance checking**: Policy adherence monitoring
- **User management**: Access control and permission tracking

### Custom Solution Development

```powerapps
// Custom governance app structure
App_GovernancePortal = {
    Screens: {
        Dashboard: "Environment overview and metrics",
        AppInventory: "Complete app catalogue",
        FlowInventory: "Flow monitoring and management", 
        UserManagement: "Access control and permissions",
        Compliance: "Policy adherence tracking"
    }
};
```

## Monitoring and Reporting

### Key Metrics
- **App utilisation**: Usage statistics and adoption rates
- **Owner status**: Active vs inactive ownership
- **Environment health**: Resource consumption and performance
- **Compliance score**: Policy adherence percentage

### Automated Reporting

```json
{
    "Weekly_Report": {
        "OrphanedApps": "@length(body('Get_Orphaned_Apps'))",
        "NewApps": "@length(body('Get_Apps_This_Week'))",
        "InactiveApps": "@length(body('Get_Unused_Apps'))",
        "ComplianceScore": "@div(body('Get_Compliant_Apps'), body('Get_Total_Apps'))"
    }
}
```

## Best Practices

### Proactive Management
- **Regular audits**: Monthly environment reviews
- **Owner verification**: Quarterly ownership confirmation
- **Documentation updates**: Continuous knowledge base maintenance
- **Training programmes**: Ongoing citizen developer education

### Risk Mitigation
- **Backup procedures**: Regular app and flow exports
- **Transfer protocols**: Smooth ownership transition processes
- **Emergency contacts**: Alternative support channels
- **Recovery procedures**: Disaster recovery planning

## Common Challenges and Solutions

### Challenge: Resistance to Governance
**Solution**: Demonstrate value through improved efficiency and reduced risk

### Challenge: Scale Management
**Solution**: Implement automated monitoring and self-service portals

### Challenge: Technical Complexity
**Solution**: Leverage COE Starter Kit and gradual implementation

### Challenge: Resource Constraints
**Solution**: Prioritise high-risk areas and automate routine tasks

## Future Considerations

### Advanced Analytics
- **Usage patterns**: Predictive analytics for app lifecycle
- **Performance monitoring**: Automated optimisation suggestions
- **Security scanning**: Continuous vulnerability assessment
- **Cost optimisation**: Resource allocation efficiency

### Integration Opportunities
- **Azure Active Directory**: Enhanced identity management
- **Microsoft 365**: Seamless collaboration integration
- **Power BI**: Advanced reporting and visualisation
- **Teams**: Embedded governance workflows

## Conclusion

Effective COE control requires a balanced approach combining technical solutions with organisational governance. By implementing comprehensive monitoring, clear policies, and proactive management, organisations can harness the power of citizen development whilst maintaining security and compliance.

Success depends on executive support, clear communication, and gradual implementation that demonstrates value whilst building user confidence in the governance framework.