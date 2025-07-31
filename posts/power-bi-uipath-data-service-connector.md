---
title: "Setting up a Power BI Custom Connector for UiPath Data Service"
date: "2022-08-08"
author: "Jacqui Muller"
excerpt: "Learn how to create a custom Power BI connector for UiPath Data Service, enabling powerful visualisations and analytics from your automation data using Power Query."
image: "https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png"
category: "Business Intelligence"
tags: ["UiPath", "Power BI", "Data Service", "Custom Connector", "Analytics"]
difficulty: "Intermediate – Senior"
---

# Setting up a Power BI Custom Connector for UiPath Data Service

UiPath Data Service has become a sophisticated way to encapsulate data and information used in automation solutions within the UiPath platform without needing to invest in additional infrastructure. The power that data enables which ties everything together is the ability to integrate and visualise the available data.

For this, UiPath relies heavily on the [UiPath Data Service activity](https://docs.uipath.com/activities/docs/about-the-dataservice-activities-pack) and the [UiPath Data Service API](https://docs.uipath.com/data-service/docs/api-access).

![UiPath Data Service Integration](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

## The Challenge

UiPath has a product referred to as [UiPath Insights](https://docs.uipath.com/insights/docs/about-insights) in the product suite which is aimed at building visualisations from data within the environment (currently specific to UiPath Automation Hub and UiPath Orchestrator). UiPath Insights is a good tool to use for visualisations for data that is not living in Data Service.

Unfortunately there is not an integration between Data Service and Insights just yet.

Since visualisation is an important layer used to understand the underlying data and UiPath have not yet catered for the capability, other tools and options should be considered as a 'stop gap'. The industry leading tool in this space is Microsoft's Power BI. Power BI Desktop is available for download at no cost and is a very user friendly platform used to develop reports and dashboards.

## The Solution Architecture

![UiPath Data Service Power BI Integration](https://thejpanda.com/wp-content/uploads/2022/08/uipath-data-service-power-bi-integration.png)

In this post we'll be covering how to use a Power Query Script to connect to the UiPath Data Service API, packaged as a custom connector that can be ingested into Power BI Desktop as a data source.

## Getting Started

### Prerequisites

Some things you may want to consider before getting started:

- Install Visual Studio 2016, 2017 or 2019. **2022 does not seem to support what we will be trying to do**
- Download and install the [Power Query SDK](https://aka.ms/powerquerysdk)
- Download the following [Power Query code sample](https://forum.uipath.com/uploads/short-url/sRx3xyHAPOH8FgnKjeRTYzI7raU.zip)
- Build the project and copy the generated UiPathDataService.mez file into your Custom Connectors directory (`Documents\Power BI Desktop\Custom Connectors`)

### Alternative Option

Alternatively, you can download the custom connector from this [GitHub repo](https://github.com/JacquiM/UiPath-Data-Service-Power-BI-Custom-Connector) and move it to your Power BI Custom Connectors directory.

## Create a UiPath External Application

Navigate to the [UiPath Automation Cloud](https://platform.uipath.com/) where you will need to create an External Application. To do that, go to the 'Admin' tab and navigate to 'External Applications'.

![UiPath Admin External Applications](https://thejpanda.com/wp-content/uploads/2022/08/image.png)

Click 'Add Application' and insert the following information:

### Application Configuration
- **Type**: Non-Confidential application
- **Scopes**: `DataService.Schema.Read`, `DataService.Data.Read`
- **Redirect URL**: `https://oauth.powerbi.com/views/oauthredirect.html`

![Add External Application](https://thejpanda.com/wp-content/uploads/2022/08/image-1.png)

## Configuring Security Settings in Power BI

When you open Power BI Desktop, you may be prompted to update your security settings before you can use the custom connector.

![Security Settings Prompt](https://thejpanda.com/wp-content/uploads/2022/08/image-2.png)

To configure security:

1. Go to **File > Options > Security > Web Preview Level > Data Extensions**
2. Check the **'Allow any extension to load without validation or warning'** option
3. Restart Power BI Desktop

![Power BI Security Configuration](https://thejpanda.com/wp-content/uploads/2022/08/image-3.png)

## Pulling the UiPath Data Service Data into Power BI

### Step 1: Get Data
Select 'Get Data'. Search for the 'UiPath Data Service' data source, which should appear as a custom connector:

![UiPath Data Service Connector](https://thejpanda.com/wp-content/uploads/2022/08/image-4.png)

### Step 2: Connection Parameters
You'll be prompted to provide the following information:

- **Organisation Name**: Your UiPath organisation identifier
- **Tenant Name**: Your UiPath tenant name
- **Client ID**: App ID of the external app created in UiPath Automation Cloud

![Connection Parameters](https://thejpanda.com/wp-content/uploads/2022/08/image-7.png)

### Step 3: Select Entities
You should now be able to select the entities that you would like to use as data sources from UiPath Data Service:

![Entity Selection](https://thejpanda.com/wp-content/uploads/2022/08/image-5.png)

### Step 4: Create Visualisations
Now you can go on to create powerful visualisations from the data in Power BI:

![Power BI Visualisations](https://thejpanda.com/wp-content/uploads/2022/08/image-6.png)

## Technical Implementation Details

### Power Query Script Structure

The custom connector uses Power Query M language to:

1. **Authenticate** with UiPath Automation Cloud using OAuth 2.0
2. **Retrieve Schema** information from Data Service API
3. **Fetch Data** from specified entities
4. **Transform Data** into Power BI compatible format

### Authentication Flow

```m
// OAuth 2.0 authentication with UiPath
UiPath.Authenticate = (organizationName as text, tenantName as text, clientId as text) =>
    let
        authorizeUrl = "https://account.uipath.com/oauth/authorize",
        tokenUrl = "https://account.uipath.com/oauth/token",
        redirectUrl = "https://oauth.powerbi.com/views/oauthredirect.html",
        scope = "DataService.Schema.Read DataService.Data.Read"
    in
        OAuth.AuthorizationCode(authorizeUrl, tokenUrl, clientId, null, scope, redirectUrl);
```

### Data Retrieval

```m
// Fetch entity data from UiPath Data Service
UiPath.GetEntityData = (organizationName as text, tenantName as text, entityName as text, accessToken as text) =>
    let
        url = "https://platform.uipath.com/" & organizationName & "/" & tenantName & "/dataservice_/api/v1/entities/" & entityName & "/records",
        headers = [
            Authorization = "Bearer " & accessToken,
            #"Content-Type" = "application/json"
        ],
        response = Web.Contents(url, [Headers = headers])
    in
        Json.Document(response);
```

## Benefits of This Integration

### Enhanced Analytics Capabilities
- **Real-time Dashboards**: Monitor automation performance in real-time
- **Historical Trends**: Analyse automation data over time periods
- **Cross-platform Integration**: Combine UiPath data with other business systems

### Business Intelligence Features
- **Automated Reporting**: Schedule and distribute automation reports
- **Data Relationships**: Create relationships between different UiPath entities
- **Advanced Visualisations**: Leverage Power BI's extensive chart library

## Best Practices

### Security Considerations
- Use dedicated service accounts for Power BI connections
- Regularly rotate OAuth tokens and credentials
- Implement row-level security for sensitive automation data
- Monitor data access and usage patterns

### Performance Optimisation
- Filter large datasets at the source level
- Implement incremental refresh for historical data
- Use aggregations for summary reports
- Consider data archiving strategies for old automation logs

### Data Governance
- Document data lineage and transformation logic
- Implement change management for connector updates
- Establish data quality monitoring
- Create standardised naming conventions

## Troubleshooting Common Issues

### Authentication Errors
If you encounter authentication issues:
1. Verify the redirect URL matches exactly
2. Check scope permissions in UiPath Admin
3. Ensure the external application is enabled
4. Validate organisation and tenant names

### Data Loading Issues
For data loading problems:
1. Check API rate limits and quotas
2. Verify entity permissions and access rights
3. Test connectivity outside of Power BI
4. Review error logs in UiPath Automation Cloud

## Future Enhancements

This integration opens possibilities for:
- **Real-time streaming** of automation events
- **Predictive analytics** for process optimisation
- **Machine learning** integration for anomaly detection
- **Multi-tenant** reporting across UiPath environments

The custom connector approach provides a robust foundation for UiPath data analytics, enabling organisations to leverage their automation investments through comprehensive business intelligence capabilities.