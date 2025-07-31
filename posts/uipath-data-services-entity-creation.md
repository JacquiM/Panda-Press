---
title: "Creating a UiPath Data Services Entity Record From UiPath Studio"
date: "2022-04-24"
author: "Jacqui Muller"
excerpt: "Step-by-step guide to creating and populating UiPath Data Services entities from UiPath Studio, including setup, configuration, and best practices."
image: "https://thejpanda.com/wp-content/uploads/2020/08/rpa.png"
category: "Automation"
tags: ["UiPath", "Data Services", "Entity Management", "RPA", "Database"]
difficulty: "Junior – Senior"
---

# Creating a UiPath Data Services Entity Record From UiPath Studio

I recently started playing with integrating UiPath Apps, UiPath Data Services and UiPath Storage Buckets into my automations. It has been a tremendous amount of fun to see it all come together and how it all gels together.

I had a few challenges creating records in UiPath Data Services Entities from UiPath but I managed to figure it out and it turns out to be quite simple.

![UiPath Data Services](https://thejpanda.com/wp-content/uploads/2020/08/rpa.png)

## Prerequisites: Enabling UiPath Data Services

If you cannot see the Data Services icon on the navigation menu located on the left hand side of the screen, ensure that Data Services is enabled on your tenant by directing to **Admin**, expanding your tenant and selecting **Data Services**.

![Enable Data Services](https://thejpanda.com/wp-content/uploads/2022/04/image-4.png)

## Create the Entity in UiPath Data Services

Navigate to the UiPath Data Services through the UiPath Automation Cloud and **Create New Entity:**

![Create New Entity](https://thejpanda.com/wp-content/uploads/2022/04/image-5.png)

Complete the relevant fields before clicking **Save** at the bottom right hand side of the page:

![Entity Configuration](https://thejpanda.com/wp-content/uploads/2022/04/image-6.png)

### Define Entity Fields

Click on the entity and add the appropriate fields:

![Entity Fields Setup](https://thejpanda.com/wp-content/uploads/2022/04/image-12.png)

When designing your entity structure, consider:

- **Field Types**: Text, Number, Boolean, Date, etc.
- **Required Fields**: Mark essential fields as mandatory
- **Field Length**: Set appropriate character limits
- **Default Values**: Specify defaults where applicable
- **Relationships**: Define connections to other entities

Now navigate to UiPath Studio to connect the data services and start populating the entity.

## Populating the Entity From UiPath Studio

### Step 1: Install Data Services Library

First thing's first… Install the Data Services library by clicking on **Manage Packages** in the taskbar. **Search** for the library, **install** and **save**.

![Install Data Services Package](https://thejpanda.com/wp-content/uploads/2022/04/image-7.png)

### Step 2: Connect Entity to Studio

Before we can populate the entity, we first need to connect the entity to Studio. You can do this by clicking on **Manage Entities** in the taskbar – check the entity you want to add and click **Save**:

![Manage Entities](https://thejpanda.com/wp-content/uploads/2022/04/image-10.png)

The entity will appear under **Entities** in your **Project Explorer**:

![Project Explorer Entities](https://thejpanda.com/wp-content/uploads/2022/04/image-11.png)

### Step 3: Create Entity Variable

**Create** a new variable in the **Variables** pane named 'InstrumentEntity'. You will need to reassign the variable type to the **Instrument** entity. Click on **Browse for more types** in the variable type drop down:

![Variable Type Selection](https://thejpanda.com/wp-content/uploads/2022/04/image-13.png)

### Step 4: Initialize Entity Instance

Assign the **default value** of the newly created variable, **InstrumentEntity**, to a new instance of the **Instrument** entity:

![Initialize Entity Variable](https://thejpanda.com/wp-content/uploads/2022/04/image-14.png)

### Step 5: Populate Entity Attributes

Assign the attributes of the entity to values individually:

![Assign Entity Attributes](https://thejpanda.com/wp-content/uploads/2022/04/image-15.png)

### Step 6: Create Entity Record

Drag the **Create Entity Record** activity below the assignment and configure the properties to create the record in the entity:

![Create Entity Record Activity](https://thejpanda.com/wp-content/uploads/2022/04/image-16.png)

### Step 7: Test and Verify

**Run** the file and test that the process populates the entity before further customising your process:

![Entity Record Created](https://thejpanda.com/wp-content/uploads/2022/04/image-17.png)

## Best Practices for Entity Management

### Data Validation
Implement proper validation before creating records:

```
Sequence: Validate Data
├── Check Required Fields
├── Validate Data Types
├── Ensure Field Length Limits
└── Business Rule Validation
```

### Error Handling
Wrap entity operations in try-catch blocks:

```
Try-Catch: Create Entity Record
├── Try Block
│   ├── Validate Input Data
│   ├── Create Entity Record
│   └── Log Success
└── Catch Block
    ├── Log Error Details
    ├── Handle Duplicate Key Errors
    └── Send Error Notifications
```

### Bulk Operations
For multiple records, consider batch processing:

```
For Each: Data Collection
├── Build Entity Collection
├── Validate Each Record
└── Bulk Create Records
```

## Advanced Entity Operations

### Querying Entities
Use the **Query Entity Records** activity to retrieve data:

- Filter by specific criteria
- Sort results appropriately
- Limit result sets for performance
- Handle pagination for large datasets

### Updating Records
Implement update operations:

- Retrieve existing record first
- Modify only necessary fields
- Handle concurrency conflicts
- Maintain audit trails

### Deleting Records
Safe deletion practices:

- Implement soft deletes where possible
- Check for dependencies before deletion
- Maintain deletion logs
- Consider archiving instead of deleting

## Integration Patterns

### With UiPath Apps
- Display entity data in app interfaces
- Allow data entry through app forms
- Implement approval workflows
- Create data visualisation dashboards

### With Storage Buckets
- Store file references in entities
- Link documents to entity records
- Implement document workflows
- Maintain file metadata

### With External Systems
- Sync data with external databases
- Import/export functionality
- Real-time data updates
- API integration patterns

## Performance Considerations

### Optimisation Strategies
- Minimise entity queries in loops
- Use appropriate data types
- Implement caching where beneficial
- Consider data archiving policies

### Monitoring and Maintenance
- Track entity performance metrics
- Monitor data growth patterns
- Implement regular maintenance routines
- Plan for scalability requirements

## Security and Compliance

### Access Control
- Implement role-based permissions
- Use service accounts appropriately
- Regular permission audits
- Principle of least privilege

### Data Protection
- Encrypt sensitive data
- Implement data masking
- Follow data retention policies
- Ensure compliance requirements

## Sample Code Repository

The sample code is available in this [GitHub repo](https://github.com/JacquiM/BasicUiPathProcesses/tree/master/Upload%20Data%20to%20Data%20Services).

## Troubleshooting Common Issues

### Connection Problems
- Verify Data Services is enabled
- Check network connectivity
- Validate authentication credentials
- Ensure proper permissions

### Entity Not Found
- Confirm entity exists in tenant
- Check entity naming conventions
- Verify entity is connected to Studio
- Refresh entity connections

### Data Type Mismatches
- Validate field data types
- Check for null values
- Ensure proper type conversions
- Handle special characters appropriately

This foundation enables powerful data management scenarios within UiPath automations, providing structured storage and retrieval capabilities that integrate seamlessly with the broader UiPath ecosystem.