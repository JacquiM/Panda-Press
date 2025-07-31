---
title: "Exporting Power BI Reports as Images and Embedding into Word Documents"
date: "2023-07-12"
category: "Digital Transformation"
excerpt: "Learn how to automate the process of exporting Power BI report pages as images and seamlessly embedding them into Word documents using Power Automate."
author: "JPanda Solutions"
readTime: "10 min read"
image: "https://thejpanda.com/wp-content/uploads/2023/07/image.png"
---

# Exporting Power BI Reports as Images and Embedding into Word Documents

**Level of Difficulty: Beginner – Senior**

![Power Automate BI Integration](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

Now, we all know that data speaks volumes, but only if we can understand its language. Power BI has been a game changer in converting complex data into insightful, visually engaging reports. But there's more magic in the mix! Have you ever tried extracting a Power BI report into an image and embedding it into a Word document? If not, let me explain why it's worth considering. The process adds a whole new dimension to presenting and sharing data. You see, by transforming your BI reports into images, we can insert them seamlessly into Word docs. This makes the data easily digestible, ensuring we're all on the same page. It's about bringing data alive in a format that's simple, portable, and best of all, doesn't require Power BI expertise to comprehend. It's like bridging the gap between data nerds and the rest of us, which is a win-win, right? So, let's dive in and find out more about this.

To get Power BI content into a Word document, follow these steps:

1. Make sure that the Developer Tab has been added to the Word Toolbar
2. Add an image through the Developer Tab
3. Update the Properties
4. Create a Power Automate Flow with a defined trigger
5. Export the Power BI Report Page to an image
6. Populate the Word document with the image file content

## Add Developer Tab

Navigate to **File > Options > Customize Ribbon > Tick the Developer toolbox**

![Enable Developer Tab](https://thejpanda.com/wp-content/uploads/2023/07/image.png)

Hit "OK" and navigate to the toolbox where you should see the following:

![Developer Tab Enabled](https://thejpanda.com/wp-content/uploads/2023/07/image-1.png)

## Add Image Placeholder

Focus the cursor on the part of the document where the image should be added. Select the **Developer** tab and select the **Picture Content Control**.

![Picture Content Control](https://thejpanda.com/wp-content/uploads/2023/07/image-2.png)

Once the image has been added, select and amend the **Properties** under the **Controls** section. Complete the **Title** and **Tag** properties:

![Content Control Properties](https://thejpanda.com/wp-content/uploads/2023/07/image-3.png)

## Create Power Automate Flow

Navigate to [Power Automate](https://powerautomate.com/), then create a new instant flow (or add your required trigger). On a high-level, the flow should follow the following structure:

![Power Automate Flow Structure](https://thejpanda.com/wp-content/uploads/2023/07/power-bi-report-extract.png)

### Export Power BI Report to Image (PNG)

Select the Power BI Workspace and Report along with the Export Format.

![Export Power BI Report](https://thejpanda.com/wp-content/uploads/2023/07/image-4.png)

Power BI Reports are filtered using URL query parameters which are detailed in these [Microsoft Docs](https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-url-filters). The structure of the query follows the following format:

```
<table name>/<column name> <operator> '<value>'
```

### Populate the Word Document

Add the **Populate a Microsoft Word Template** action, then select the location (SharePoint, Teams or OneDrive), select the library and the file. The "Image Placeholder" will appear as the title you gave the image in the document when the picture content control was added. Assign the Power BI file content to the field.

![Populate Word Template](https://thejpanda.com/wp-content/uploads/2023/07/image-5.png)

Save and run!

## Benefits of This Approach

### Enhanced Accessibility
- **No Power BI licensing required**: Recipients don't need Power BI access to view reports
- **Offline viewing**: Word documents work without internet connectivity
- **Universal format**: Word documents are widely accessible across platforms

### Improved Collaboration
- **Consistent formatting**: Embedded images maintain visual integrity
- **Version control**: Track document changes alongside report snapshots
- **Distribution flexibility**: Easy sharing via email, SharePoint, or Teams

### Automation Advantages
- **Scheduled reporting**: Automate regular report generation
- **Template consistency**: Standardised document formatting
- **Reduced manual effort**: Eliminate copy-paste workflows

## Advanced Implementation Tips

### URL Filtering for Dynamic Reports
Use Power BI URL filters to create targeted report exports:

```
https://app.powerbi.com/groups/{workspace-id}/reports/{report-id}/ReportSection?filter=Sales/Region eq 'North'
```

### Multiple Report Pages
Extend the flow to include multiple report pages by:
1. Adding multiple "Export Power BI Report" actions
2. Creating corresponding image placeholders in Word
3. Mapping each export to its placeholder

### Error Handling
Implement robust error handling:
- Check if Power BI report is accessible
- Validate image export success
- Provide fallback content for failed exports

### Scheduling Considerations
- **Peak hours**: Avoid heavy automation during business hours
- **Report refresh timing**: Align with Power BI data refresh schedules
- **File size management**: Monitor and clean up temporary files

This automation bridges the gap between powerful BI insights and accessible business communication, ensuring data-driven decisions reach every stakeholder regardless of their technical expertise.