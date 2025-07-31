---
title: "Understanding UiPath Licensing Compared to Power Platform Licensing"
date: "2023-01-05"
author: "Jacqui Muller"
excerpt: "Comprehensive comparison of UiPath and Microsoft Power Platform licensing strategies, costs, limitations, and recommendations for enterprise automation implementations."
image: "https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png"
category: "Automation"
tags: ["UiPath", "Power Platform", "Licensing", "Enterprise", "Comparison"]
difficulty: "Beginner – Senior"
---

# Understanding UiPath Licensing Compared to Power Platform Licensing

As a follow-on from the post written [comparing UiPath to the Microsoft Power Platform](https://thejpanda.com/2021/09/27/automation-a-comparison-between-uipath-and-power-automate/), this post aims to unpack the different licenses and licensing strategies implemented by the two different vendors. Since both are leaders in the automation space, it is apt to understand both when evaluating the feasibility of each for the implementation of either platform within an environment.

![Automation Platform Comparison](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

## High-Level Differences in Approach

Microsoft are relying heavily on utilising existing user licenses as part of the Power Platform with limited functionality. Since Microsoft dominates the market for their Microsoft 365 offering that allows users access to Word, Excel, Outlook, SharePoint, etc. it has become intertwined with their approach to drive adoption among citizen developers and allow organisations an opportunity to minimise cost to an extent.

The complexity starts to become apparent when considering how Power BI licensing differs slightly from the rest of the Power Platform licensing. A user would need some form of licensing to actually start developing processes, apps or chatbots whereas the same user could download Power BI Desktop for free and start developing reports locally. The user would only need a license when publishing a report or consuming an online report.

The UiPath licensing approach is somewhat different – UiPath is very much driven from the Automation Cloud with the inclusion of the Orchestrator which allows organisations to orchestrate all automation-related operations. On-Prem or cloud orchestration options are now included in the user and robot-specific licensing options, meaning that clients no longer need to purchase an orchestrator separately.

Users can install UiPath Studio or UiPath Studio X Community for free to play around with the functionality and understand how it all fits together. Within an organisation, users would need to download UiPath Studio/Studio X from the Automation Cloud for which they would need a license before being able to sign in. The difference between the licensed version and community version is essentially the license applied to the Automation Cloud. Users can use a community version of the Automation Cloud which has a limited lifespan of approximately three years.

## Microsoft Power Platform Licensing

Before we begin trying to understand the Power Platform licensing, let's take a look at what all is encapsulated within the Power Platform and group the different licensing approaches accordingly:

![Power Platform Components](https://thejpanda.com/wp-content/uploads/2023/01/image-3.png)

Based on the above, Power BI licensing and administration is kept somewhat separate from the rest of the Power Platform. There are multiple ways that Power Platform artefacts can be licensed – with specific focus on Power Apps and Automate flows.

### Licensing Categories

The two main categories of licensing are:

- **User-based licensing**: utilising a license already assigned to a user to interact with and create content on the Power Automate environment
- **Flow/App-based licensing**: utilising a license specifically allocated to a flow or app to create Power Automate flows

Each license is subject to limitations and restrictions in terms of connector access, AI builder access, Dataverse capacity and number of actions that can be executed in a day.

### Power Platform Licensing Comparison

| **License** | **Daily Action Limits** | **Standard Connectors** | **Premium Connectors** | **RPA Attended** | **AI Builder Credits** | **Dataverse DB** | **Dataverse File** |
|-------------|------------------------|------------------------|----------------------|------------------|---------------------|------------------|-------------------|
| Power Automate per Flow Plan (5 flows/month) | 250,000/flow | ✅ Included | ✅ Included | ❌ Not Included | ❌ Not Included | 50MB | 200MB |
| Power Automate per User Plan | 40,000/flow | ✅ Included | ✅ Included | ❌ Not Included | ❌ Not Included | 50MB | 200MB |
| Power Automate per User with Attended RPA | 40,000/flow | ✅ Included | ✅ Included | ✅ 1 Bot | 5,000 | 50MB | 200MB |
| **Microsoft 365 Plan** | **6,000/flow** | **✅ Included** | **❌ Not Included** | **❌ Not Included** | **❌ Not Included** | **❌ Not Included** | **❌ Not Included** |
| Power Apps per User Plan | 40,000/flow | ✅ Included | ✅ Supported | ❌ Not Included | ❌ Not Included | 250MB | 2GB |
| Power Apps per App Plan | 6,000/flow | ✅ Included | ✅ Supported | ❌ Not Included | ❌ Not Included | 50MB | 400MB |

### Performance Profiles

Power Platform artefacts have different limits depending on their _performance profile_. Performance profiles are subject to the license that is being used to license a flow/user.

| **Performance Profile** | **Plans** |
|------------------------|-----------|
| **Low** | • Free<br>• **Microsoft 365 plans**<br>• All license trials<br>• Dynamics 365 Team Member |
| **Medium** | • Power Apps triggered flows & child flows<br>• **Power Automate per user Plan**<br>• Dynamics 365 Enterprise plans |
| **High** | • **Power Automate per flow plan** |

### Power BI Licensing

Power BI has multiple different licenses attached to the product – the two main license types are Power BI Pro and Power BI Premium.

| **Feature** | **Power BI Pro** | **Power BI Premium** | **Power BI Premium per capacity** |
|-------------|------------------|--------------------|---------------------------------|
| **Model size limit** | **1 GB** | **100 GB** | 400 GB |
| **Refresh rate** | **8/day** | **48/day** | 48/day |
| **Mobile app access** | ✅ | ✅ | ✅ |
| **Advanced AI** | ❌ | ✅ | ✅ |
| **XMLA endpoint** | ❌ | ✅ | ✅ |
| **Maximum storage** | 10 GB/user | 100 TB | 100 TB |

### Dataverse Limitations

Every tenant with a Power Apps license gets default capacity. In addition, for each license there's additional capacity (pooled) added to the tenant.

| **Power Apps Capacity Limits** | **Per App Plan** | **Per User Plan** |
|-------------------------------|------------------|-------------------|
| Dataverse Database Capacity | +50 MB | +250 MB |
| Dataverse File Capacity | +400 MB | +2 GB |

| **Power Automate Capacity Limits** | **Per User** | **Per Flow** |
|-----------------------------------|--------------|--------------|
| Dataverse Database Capacity | +250 MB | +50 MB |
| Dataverse File Capacity | +2 GB | +200 MB |

### Licensing Recommendations

- **Business users** should use their M365 plan for citizen development
- **IT departments** should make use of per user plans, attached to service accounts/principals as well as per flow/app plans

## UiPath Plans

In order to understand UiPath's licensing approach, it is important to understand the products within the UiPath technology stack.

![UiPath Technology Stack](https://thejpanda.com/wp-content/uploads/2023/01/image-6.png)

[UiPath pricing](https://www.uipath.com/pricing) can be summarised by three major plans:

### UiPath Licensing Tiers

#### Free Plan
- Used by developers/users for personal use, training and exploring capabilities
- No limits on automation runs per user
- Should typically not be used within business environments
- Different from community license (3-year limitation)

#### Pro Plan
- Used by smaller departments looking for dedicated support
- Pro Trial available for organisations to understand platform functionality
- Includes core automation capabilities

#### Enterprise Plan
- Used by large teams using multi-tenancy and complex organisational structures
- Dedicated support and access to more tools on the platform
- Full scope of UiPath platform offered through internal sellers or partners
- Includes a-la-carte licenses and enterprise licensing agreements (ELAs)
- **Includes 100 automation express licenses**

### UiPath Feature Comparison

| **Feature** | **Free** | **Pro** | **Enterprise** |
|-------------|----------|---------|----------------|
| **Platform** | Cloud | Cloud | Cloud / On-Premises |
| **Automation Hub** | ❌ | ❌ | ✅ |
| **Task Capture** | ✅ | ✅ | ✅ |
| **Process Mining** | ❌ | ❌ | ✅ |
| **Task Mining** | ❌ | ❌ | ✅ |
| **Automation Express** | 25 free licenses | 25 free licenses | 100 free licenses |
| **Studio** | ❌ | ✅ | ✅ |
| **Automation Ops** | ❌ | ✅ | ✅ |
| **Document Understanding** | ❌ | ❌ | ✅ |

## Key Differences Summary

### Microsoft Power Platform
- **Leverages existing M365 licenses** for basic functionality
- **Graduated pricing model** with clear performance tiers
- **Integrated ecosystem** with Office 365 and Azure
- **Citizen developer focused** with professional upgrade paths

### UiPath
- **Dedicated automation platform** with specialised tooling
- **Enterprise-focused licensing** with robust governance
- **Comprehensive RPA suite** including process mining and task mining
- **Cloud-first approach** with on-premises options for Enterprise

## Licensing Strategy Recommendations

### For Small to Medium Businesses
- **Power Platform**: Start with M365 licenses for citizen development
- **UiPath**: Consider Pro plan for dedicated automation teams

### For Large Enterprises
- **Power Platform**: Implement hybrid approach with per-user and per-flow licenses
- **UiPath**: Enterprise plan with ELA for volume discounts and comprehensive tooling

### Cost Considerations
- **Power Platform**: Lower entry cost due to M365 integration
- **UiPath**: Higher specialisation and dedicated automation capabilities
- **Hybrid Approach**: Many enterprises use both platforms for different use cases

The choice between platforms often depends on existing Microsoft investments, automation complexity requirements, and organisational structure for citizen vs. professional development approaches.