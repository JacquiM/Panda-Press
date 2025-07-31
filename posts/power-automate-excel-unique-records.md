---
title: "Getting Unique Records or Items from an Excel Table"
date: "2024-11-18"
category: "Training & Development"
excerpt: "Learn efficient techniques for managing large datasets and removing duplicates in Excel using Power Automate. Essential skills for data management and analysis."
author: "JPanda Solutions"
readTime: "6 min read"
image: "https://thejpanda.com/wp-content/uploads/2024/11/image-1.png"
---

# Getting Unique Records or Items from an Excel Table

**Level of Difficulty: Beginner – Senior**

![Power Automate Excel](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

In today's fast-paced world, managing data is important, and Excel is a common tool for organising and analysing information. Still, working with large datasets can be tough when duplicates arise. When handling a contact list, it is crucial to have unique entries. It is also important for tracking sales or analysing project results. A clean dataset helps in making good decisions.

This is where Power Automate steps in to make your life easier. With its automation capabilities, you can quickly extract unique records from an Excel table. This saves time and eliminates the need for tedious manual effort. In this post, we'll demonstrate how to utilise Power Automate. This will simplify the process and help you work smarter. It allows you to focus on what really matters. Let's get started!

## Setting the Scene

Let's say we have a spreadsheet that contains multiple records detailing the participants of a hackathon. The hackathon submissions can be submitted and presented as groups that contain multiple team members. Each team member is recorded in the spreadsheet. An automated solution is needed to notify each team of their acceptance with each member cc'ed in a mail sent to each team. The challenge is that the data requires some manipulation for the automation to be functional. What now?

## Create an Excel Spreadsheet with a Table & Data in it

Create an Excel workbook. Insert a table and add columns with corresponding data to the table:

![Excel Table Setup](https://thejpanda.com/wp-content/uploads/2024/11/image-1.png)

Ensure the Excel spreadsheet is accessible from the cloud. Add it to SharePoint or OneDrive.

## Build a Power Automate Flow

Let's develop a Power Automate flow that will read the Excel spreadsheet and find a list of distinct projects from the Excel spreadsheet:

![Power Automate Flow Design](https://thejpanda.com/wp-content/uploads/2024/11/image-2.png)

Start by listing all rows present in the table. Then select only the Projects column (or the column which you would like to get the distinct values of). Then set the **array** variable to the following:

> union(body('Select_Project_Names'), body('Select_Project_Names'))

For each project, you can now filter the results from the Excel and compile the list of email addresses to be cc'ed on the mail.

![Flow Implementation](https://thejpanda.com/wp-content/uploads/2024/11/flow-3.png)

### Method 1: Using Select and Union Functions

```json
{
    "Select_unique_items": {
        "inputs": {
            "from": "@body('List_rows_present_in_a_table')?['value']",
            "select": {
                "Email": "@item()?['Email']",
                "Name": "@item()?['Name']",
                "Company": "@item()?['Company']"
            }
        }
    }
}
```

### Method 2: Filter with Contains Function

```json
{
    "Filter_array": {
        "inputs": {
            "from": "@body('List_rows_present_in_a_table')?['value']",
            "where": "@not(contains(variables('ProcessedEmails'), item()?['Email']))"
        }
    }
}
```

## Implementation Steps

### Step 1: Connect to Excel Table

First, establish connection to your Excel file:
1. Use "List rows present in a table" action
2. Select your Excel file and table
3. Ensure proper authentication

### Step 2: Create Tracking Variable

Initialise a variable to track processed records:

```json
{
    "Initialize_variable": {
        "inputs": {
            "variables": [{
                "name": "UniqueRecords",
                "type": "array",
                "value": []
            }]
        }
    }
}
```

### Step 3: Process Each Row

Apply logic to identify and process unique records:

```json
{
    "Apply_to_each": {
        "foreach": "@body('List_rows_present_in_a_table')?['value']",
        "actions": {
            "Condition": {
                "if": "@not(contains(variables('UniqueRecords'), items('Apply_to_each')?['Email']))",
                "then": {
                    "Append_to_array_variable": {
                        "inputs": {
                            "name": "UniqueRecords",
                            "value": "@items('Apply_to_each')"
                        }
                    }
                }
            }
        }
    }
}
```

## Advanced Techniques

### Multi-Column Uniqueness

For scenarios requiring uniqueness across multiple columns:

```json
{
    "Compose_unique_key": {
        "inputs": "@concat(item()?['Email'], '_', item()?['Phone'], '_', item()?['Company'])"
    }
}
```

### Handling Case Sensitivity

Implement case-insensitive comparison:

```json
{
    "Condition_case_insensitive": {
        "if": "@equals(toLower(item()?['Email']), toLower(variables('CurrentEmail')))"
    }
}
```

## Best Practices

### Data Validation
- **Pre-validation**: Check data formats before processing
- **Empty field handling**: Account for blank or null values
- **Data type consistency**: Ensure consistent data types

### Performance Optimisation
- **Batch processing**: Process large datasets in chunks
- **Indexing**: Use efficient lookup methods
- **Parallel processing**: Implement concurrent operations where possible

### Error Handling
- **Try-catch blocks**: Implement proper error handling
- **Logging**: Track processing steps and errors
- **Rollback procedures**: Plan for data recovery

## Common Scenarios

### Contact List Management
Remove duplicate contacts based on email addresses whilst preserving the most recent entry.

### Sales Data Cleanup
Eliminate duplicate transactions whilst maintaining data integrity for reporting.

### Inventory Management
Ensure unique product entries whilst handling variant information appropriately.

### Survey Response Processing
Remove duplicate survey submissions based on participant identification.

## Troubleshooting

**Issue**: Flow runs slowly with large datasets
**Solution**: Implement pagination and batch processing

**Issue**: Some duplicates remain after processing
**Solution**: Review uniqueness criteria and data formatting

**Issue**: Original data is modified unexpectedly
**Solution**: Implement proper backup and staging procedures

## Integration Considerations

### SharePoint Lists
Combine with SharePoint for enhanced collaboration and data management.

### Teams Integration
Implement notifications for data processing completion.

### Power BI Integration
Connect cleaned datasets directly to reporting solutions.

## In Conclusion

The above "should" work. It worked for me. If it doesn't work for you, Microsoft definitely broke something and hopefully Copilot can help figure it out. I wanted to filter the array (Excel results), it showed me all of the fingers, so I had to "requery" the Excel – Copilot wasn't smart enough to get around that but hopefully you'll have better luck!

This approach provides a practical solution for extracting unique records from Excel tables using Power Automate, making it particularly useful for scenarios like hackathon participant management, contact list deduplication, and project team coordination.