---
title: "10 Tips for Optimising Power Automate Flows"
date: "2021-09-28"
author: "Jacqui Muller"
excerpt: "Essential performance optimisation strategies for Power Automate flows, covering both Desktop and Cloud flows to improve execution times and reliability."
image: "https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png"
category: "Automation"
tags: ["Power Automate", "Optimisation", "Performance", "Best Practices", "RPA"]
difficulty: "Beginner – Senior"
---

# 10 Tips for Optimising Power Automate Flows

Power Automate is a powerful tool that allows for integrations and RPA solutions to be developed through the use of Power Automate Desktop and Cloud flows. A disadvantage of using Power Automate is that it can take strain when working with large volumes of data.

Lengthy flows take long to save, load and execute. Large amounts of data increase the run time of flows exponentially if they aren't developed optimally. There are a few things that you could try to optimise a flow and reduce the runtime of a flow while maintaining the functionality of the solution.

![Power Automate Optimisation](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

## Power Automate Desktop Flows

### 1. Remove Commented (or Disabled) Code

A large part of the RPA development process includes debugging a solution while developing the functionality. Often developers comment out or disable actions instead of removing them. These could act as test harnesses (actions used purely for testing) or safety nets (often used when hoarders of code fear deleting code that previously worked).

It becomes quite easy to pollute a solution with disabled actions.

**Performance Impact**: When a PA desktop flow is run, disabled actions are read, even though they aren't necessarily executed. Removing a few disabled actions might not make a massive dent in process duration but it does make a difference.

**Best Practice**: Regularly clean up disabled actions during development reviews.

### 2. Build Business Exception Checks

When building UI Automation flows, 'Send hotkey', 'Click' and 'Get details' actions are commonly used with 'On Error' actions set up. Send hotkeys are efficient ways of executing actions to work around frequently changing user interfaces, although the 'Send hotkey' actions can often get lost between screen changes.

**The Challenge**: This could result in many issues if the automation continues when the screen state is unexpected.

**The Solution**: A good practice for UI automations would be to execute an action and check that the screen is in the correct state before submitting an action. In a case where the screen did not change as expected or that the executed action did not render the expected result, these checks could return Business or Application Exceptions and immediately end the sub-flow before proceeding to the environment clean-up phase.

### 3. Introduce Sub-flows to Group Reusable Logic

**Environment Clean-up Example**: It is a good practice to clean up an environment before and after every process run. The clean up process would refer to the termination of any applications that may be open or be used within the process.

**Modularisation Benefits**:
- Reduces code duplication
- Improves maintainability
- Enhances debugging capabilities
- Decreases overall flow complexity

By cleaning the environment, that risk is mitigated. This is just one example of logic that can be grouped by building a single clean-up sub-flow and invoking or 'running' the sub-flow at all points where it is applicable.

### 4. Ensure That 'On Error' Actions are Setup Correctly

'Clicks' and 'Get details' activities are common with UI automations. These activities come with the ability to configure 'On Error' actions. These actions allow for retries, delays, setting variables, executing specific actions and running sub-flows.

**Optimisation Strategy**:
- Ensure that the waiting time between retries is feasible
- Decrease wait times and add validation checks instead
- Group exception handling logic in sub-flows
- Configure 'On Error' to execute exception handling sub-flows

### 5. Reduce the Amount of Waits Being Used

When using a concatenation of hotkeys and clicks, waits (and wait untils) are commonly used to ensure that an application is ready for input.

**The Problem**: These waits could turn into endless loops and prolong process execution times more than is necessary.

**Better Approach**: By building in checks and limits, these process execution times could be reduced with more indicative measures of where the process encounters errors.

```
Replace:
Wait 5 seconds → Send hotkey

With:
Wait until element exists (max 10 seconds) → Send hotkey
```

### 6. Use Clicks Rather Than Send Hot Keys

**Performance Trade-off**: Although send hotkeys execute faster, clicks allow for more stable execution and also allow for the configuration of 'On Error' actions.

**Recommendation**: As far as possible, rather use clicks than send hotkeys when building UI automations for better reliability and error handling capabilities.

### 7. Write Input Data to Textfile

In a case where large amounts of data are being parsed through to the desktop flow from the cloud flow, consider writing the input variable contents to a text file.

**Benefits**:
- Enables unit testing of Power Automate solutions
- Allows testing Desktop and Cloud flows independently
- Reduces development and testing times
- Provides data persistence for debugging

**Implementation**: The data from the cloud flow would be written to a text file before the process is executed. If the input variables are blank, read the contents from the text files to execute the process with previous run data.

## Power Automate Cloud Flows

### 1. Remove Loops That Process Items Individually

**The Challenge**: Connectors, like the Excel connector, only allow for items to be processed on a 'line-by-line' basis. The more items that there are to process, the longer the process will take to execute.

**The Solution**: By bulk processing these items, the risk of exponentially increasing process duration is mitigated to some degree. This could be done through introducing other components, like Azure functions.

**Example Implementation**: A good example of this can be found in [this post](https://thejpanda.com/2021/09/17/azure-function-in-stream-excel-manipulation-in-c/).

**Performance Benefits**:
- Reduces API call limits impact
- Decreases process duration
- Minimises licensing costs for per-user plans
- Improves overall flow reliability

### 2. Rework Loop Levels

Power Automate cloud allows for a maximum depth of 9 levels. Scopes are really useful when grouping actions logically although they are considered to be a 'level' of 'loops' which does have an effect on execution times.

**Performance Impact**: The theory behind the [Big O notation](https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/) explains why this has such a significant impact on process duration.

**Best Practice**: In cases where logical validations go further down than 6 levels, it would be advised to rather set variables and process logic based on conditional variables rather than adding loops within loops.

**Avoid**: Especially when adding 'apply to each' loops within 'apply to each loops'.

### 3. Introduce Sub-flows to Group Reusable Logic

It is important that flows that are built as automation solutions have some form of exception handling and logging. These components can be built as a separate flow to group the logic of handling and logging exceptions which can be reused each time that an exception or error occurs.

**Benefits of Sub-flows**:
- Centralised exception handling
- Consistent logging practices
- Improved error reporting capabilities
- Reusable components across multiple flows

**Implementation Example**:
```
Main Flow
├── Try Scope
│   ├── Business Logic
│   └── Process Data
├── Catch Scope
│   ├── Call Exception Handling Sub-flow
│   └── Log Error Details
└── Finally Scope
    └── Cleanup Actions
```

## Advanced Optimisation Strategies

### API Call Optimisation
- **Batch Operations**: Use SharePoint batch operations for bulk CRUD operations
- **Caching**: Store frequently accessed data in variables
- **Conditional Logic**: Avoid unnecessary API calls with proper validation

### Memory Management
- **Variable Scope**: Use appropriate variable scopes to reduce memory usage
- **Data Structures**: Choose efficient data structures for large datasets
- **Garbage Collection**: Clear large variables when no longer needed

### Parallel Processing
- **Concurrent Actions**: Use parallel branches for independent operations
- **Asynchronous Patterns**: Implement async processing where possible
- **Load Distribution**: Distribute work across multiple flows

## Monitoring and Performance Analysis

### Key Metrics to Track
- **Execution Time**: Monitor flow duration trends
- **Action Count**: Track the number of actions per flow
- **Error Rates**: Monitor failure patterns
- **API Usage**: Track connector usage against limits

### Performance Tools
- **Flow Analytics**: Use built-in analytics in Power Automate
- **Custom Logging**: Implement detailed logging for performance analysis
- **Third-party Monitoring**: Consider external monitoring solutions

## SharePoint Specific Optimisations

As highlighted in the comments, batch operations can significantly improve SharePoint integrations:

### Batch Operations
- **Batch Create**: Reduce API calls for bulk item creation
- **Batch Update**: Efficiently update multiple items
- **Batch Delete**: Remove multiple items in single operations

**Performance Impact**: These optimisations can cut total action API calls and flow run-times by up to one-third.

**Implementation Resources**:
- [Batch Create Guide](https://www.youtube.com/watch?v=2dV7fI4GUYU)
- [Batch Update Guide](https://www.youtube.com/watch?v=l0NuYtXdcrQ)
- [Batch Delete Guide](https://www.youtube.com/watch?v=2ImkuGpEeoo)

## Testing and Validation

### Performance Testing
- **Load Testing**: Test flows with production-level data volumes
- **Stress Testing**: Identify breaking points and limitations
- **Baseline Metrics**: Establish performance benchmarks

### Optimisation Validation
- **Before/After Metrics**: Measure improvement from optimisations
- **User Experience**: Validate that optimisations don't impact functionality
- **Monitoring**: Implement ongoing performance monitoring

These optimisation strategies provide a comprehensive approach to improving Power Automate flow performance, ensuring efficient and reliable automation solutions that scale effectively with organisational needs.