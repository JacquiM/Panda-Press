---
title: "Uploading Files to UiPath Storage Buckets"
date: "2022-03-24"
author: "Jacqui Muller"
excerpt: "Learn how to overcome common access issues and successfully upload files to UiPath Storage Buckets from UiPath Studio with proper permissions and configuration."
image: "https://thejpanda.com/wp-content/uploads/2020/08/rpa.png"
category: "Automation"
tags: ["UiPath", "Storage Buckets", "File Upload", "RPA", "Data Management"]
difficulty: "Junior – Senior"
---

# Uploading Files to UiPath Storage Buckets

I recently started playing with integrating UiPath Apps, UiPath Data Services and UiPath Storage Buckets into my automations. It has been a tremendous amount of fun to see it all come together and how it all gels together.

One of my biggest frustrations, however, was getting my file uploads to the storage buckets to work. I kept getting a "403 Forbidden" error regardless of how many times I changed my properties.

![UiPath Storage Buckets](https://thejpanda.com/wp-content/uploads/2020/08/rpa.png)

## The Solution: Permissions and Access

After trolling through the forums, I found that it is an access issue. My user on orchestrator did not have any storage bucket permissions assigned to it. I wrote [this post](https://jd-bots.com/2022/03/25/creating-a-uipath-storage-bucket-role-and-assigning-it-to-a-user/) which explains how to create a new storage bucket role and assign it to a user.

Once the permissions and access have been sorted, we can get to uploading a file to storage buckets and here's how.

## Create the Storage Bucket in UiPath Orchestrator

Remember, storage buckets are folder based, so you'll need to navigate to the appropriate **Folder** that you'd like to create the storage bucket in before navigating to **Storage Buckets** and clicking **Add storage bucket:**

![Create Storage Bucket](https://thejpanda.com/wp-content/uploads/2022/03/image-11.png)

You have an option to create a storage bucket on orchestrator (the option I'm going with for this example), connect to Azure or AWS. Provide your storage bucket information and click **Add:**

![Storage Bucket Configuration](https://thejpanda.com/wp-content/uploads/2022/03/image-12.png)

## Upload Files From UiPath Studio

Now navigate to UiPath Studio where you can create a new process or library to store the file upload. If this is a function you'll use often, across automations, consider creating a library.

Don't forget to work through the [UiPath docs](https://docs.uipath.com/orchestrator/docs/about-storage-buckets) as well, it has some really useful info about what each of the properties represents or expects.

### Simple Configuration

This is literally all you need to configure:

![UiPath Studio Configuration](https://thejpanda.com/wp-content/uploads/2022/03/image-14.png)

## Key Components for File Upload

### Required Properties

When configuring the **Upload Files** activity in UiPath Studio, ensure you set:

1. **Bucket Name**: The name of your storage bucket
2. **File Path**: Local path to the file you want to upload
3. **Object Name**: The name/path for the file in the bucket
4. **Folder Name**: If using folder-based organisation

### Authentication Requirements

The upload activity automatically uses the robot's credentials, so ensure:

- Your robot user has proper storage bucket permissions
- The storage bucket role includes upload permissions
- The robot is associated with the correct folder context

## Best Practices

### Error Handling
Implement proper error handling around the upload activity:

```
Try
├── Upload Files Activity
└── Log Success Message

Catch
├── Log Error Details
└── Handle 403 Forbidden specifically
```

### File Validation
Before uploading, validate:
- File exists and is accessible
- File size within bucket limits
- File type is supported
- Target bucket exists and is accessible

### Performance Considerations
- Upload files during off-peak hours for large files
- Consider compression for text-based files
- Use appropriate timeout values for large uploads
- Implement retry logic for network issues

## Integration with Other UiPath Services

### With UiPath Data Services
Storage buckets integrate seamlessly with Data Services:
- Store file references in Data Service entities
- Use bucket files as data sources for processing
- Maintain audit trails of file operations

### With UiPath Apps
UiPath Apps can reference bucket files:
- Display uploaded files in app interfaces
- Allow users to upload files through apps
- Create file management workflows

## Common Issues and Solutions

### 403 Forbidden Error
**Cause**: Insufficient permissions
**Solution**: 
1. Check robot user permissions
2. Verify storage bucket role assignment
3. Ensure folder-level access is correct

### File Not Found Error
**Cause**: Incorrect file path or file doesn't exist
**Solution**:
1. Validate file path before upload
2. Use File.Exists() to check file availability
3. Handle relative vs absolute paths correctly

### Network Timeout
**Cause**: Large files or slow network connection
**Solution**:
1. Increase timeout values
2. Implement retry logic
3. Consider file size optimisation

## Security Considerations

### Access Control
- Implement least-privilege access
- Use dedicated service accounts for automations
- Regularly audit storage bucket permissions
- Monitor file access patterns

### Data Protection
- Encrypt sensitive files before upload
- Use appropriate bucket policies
- Implement data retention policies
- Consider regulatory compliance requirements

## Sample Implementation

Here's a basic workflow structure:

```
Main Sequence
├── Initialize Variables
│   ├── strBucketName
│   ├── strFilePath
│   └── strObjectName
├── Validate File Exists
├── Try-Catch Block
│   ├── Upload Files Activity
│   ├── Log Success
│   └── Catch Exceptions
└── Clean Up Resources
```

## Source Code

Give it a whirl and drop a comment below if you get stuck. This basic template is available on this [GitHub repo](https://github.com/JacquiM/BasicUiPathProcesses/tree/master/Upload%20File%20to%20UiPath%20Storage%20Buckets).

## Next Steps

Once you have file uploads working:
1. Explore file download capabilities
2. Implement file versioning strategies
3. Create automated backup processes
4. Build file processing workflows
5. Integrate with external systems

This foundation opens up many possibilities for document management and data processing workflows within the UiPath ecosystem.