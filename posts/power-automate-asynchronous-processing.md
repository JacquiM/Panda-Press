---
title: "Asynchronous Processing and Concurrency in Power Automate Flows"
date: "2023-11-18"
category: "Low-Code Solutions"
excerpt: "Master efficient and responsive automation using asynchronous processing concepts in Power Automate. Essential techniques for high-performance flows."
author: "JPanda Solutions"
readTime: "10 min read"
image: "https://thejpanda.com/wp-content/uploads/2023/11/image.png"
---

# Asynchronous Processing and Concurrency in Power Automate Flows

**Level of Difficulty: Beginner – Senior**

![Power Automate Automation](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

In today's fast-paced digital landscape, the need for efficient and responsive automation has never been greater. As developers and businesses strive to streamline operations, enhance user experiences, and tackle increasingly complex tasks, one key concept has emerged as a game-changer: asynchronous processing.

In this blog post, we'll dive deep into the world of asynchronous processing (specifically in Power Automate), exploring its benefits and potential pitfalls. Whether you're a developer looking to optimise workflows or a business owner seeking to boost efficiency, understanding the power of asynchronous processing can be the key to unlocking new possibilities in your digital endeavours. So, let's embark on a journey to uncover the secrets behind this essential technology and discover how it can revolutionise your approach to automation.

## What is Asynchronous Processing?

In most technology stacks, the discussion around synchronous versus asynchronous processing has been somewhat of a "no-brainer". In most cases asynchronous processing just makes more sense since the pros far outweigh the cons. But why? To understand that, we need to understand the difference between the two processing types.

In **synchronous processing**, tasks or operations are executed one after the other in a sequential manner. **Each task must complete before the next one starts**. Synchronous processing is well-suited for scenarios where tasks require immediate attention or where the order of execution is critical. It can block the user interface or system until all tasks are finished, potentially causing delays in responsiveness.

In **asynchronous processing**, tasks or operations are queued and executed in the background without blocking the main thread or system. **Tasks can run concurrently or be scheduled to run at a later time**. Asynchronous processing is beneficial for handling long-running tasks, optimising system resources, and improving user experience by preventing delays. It is commonly used for batch processing, background jobs, and scenarios where real-time interaction is not required.

![Synchronous vs Asynchronous Processing](https://thejpanda.com/wp-content/uploads/2023/11/image.png)

## Asynchronous Processing in Power Automate

So how does this relate to Power Automate? Well, when working with 'Apply to each' actions in Power Automate, you can set concurrency as well as the concurrency count in the settings of the action. This is supposed to be the functionality that allows for asynchronous processing in Power Automate. For the most part, it works well. But there are also times when it falls over horribly.

![Apply to Each Concurrency Settings](https://thejpanda.com/wp-content/uploads/2023/11/image-1.png)

## Pros of Concurrency in Power Automate

According to ChatGPT and the humans before us… There are a few very generic advantages of concurrency:

1. **Scalability**: Asynchronous processing allows you to handle a large volume of tasks or workflows without causing performance issues or delays. You can queue up tasks and let them be processed in the background, freeing up system resources for other tasks.
2. **Improved User Experience**: Users don't have to wait for long-running processes to complete before they can continue with their work. Asynchronous processing enables users to submit requests or trigger workflows and carry on with their tasks without interruption.
3. **Error Handling**: If a workflow fails during execution, asynchronous processing can provide better error handling capabilities. Failed tasks can be retried, and errors can be logged and analysed more effectively.
4. **Long-Running Workflows**: Asynchronous processing is essential for handling long-running workflows that may take hours, days, or even weeks to complete. It ensures that these workflows can run without impacting system responsiveness.
5. **Load Balancing**: By distributing workload across multiple processing nodes, asynchronous processing can help balance the load on your resources, improving overall system performance.

**But the reality of it tells a very different story…**

The only one really worth mentioning from the above is "**Long-Running Workflows**". By setting up concurrency, you're allowing your process to run at different degrees of parallelism which means that you do not need to wait for one item to be processed before the next starts. Up to 50 can be processed at the same time. This can significantly decrease the runtime of your process. But it's not quite that simple. It's all in the design and development. **Load Balancing** can arguably be seen as a disadvantage of concurrency in Power Automate as it is not a "full-proof" solution and can often result in API and action limits being hit a lot sooner. If you're working on smaller processes, load balancing is definitely something that could be realised as an advantage but as the implementations get bigger, **Scalability** is also impacted. The more you scale, the more expensive the solution would become because there's more to take into account and concurrency won't solve your problems.

## Cons of Concurrency in Power Automate

As is to be expected, ChatGPT gave some mediocre explanations of what some of the disadvantages are. Which are debatably more accurate and less conflicting than the advantages:

1. **Complexity**: Asynchronous processing can introduce complexity into your workflows, especially when dealing with dependencies between tasks or workflows. Managing the sequencing of tasks can be challenging.
2. **Delayed Results**: Since asynchronous processing involves background execution, the results of a workflow or task may not be immediately visible. Users may need to wait for notifications or check status updates to know when a task is completed.
3. **Limited Real-Time Interactivity**: Asynchronous processing may not be suitable for scenarios where real-time interaction or immediate feedback is required. It is not ideal for applications that rely on real-time responses.
4. **Resource Consumption**: While asynchronous processing can free up system resources for immediate tasks, it still requires resources to manage the queuing and execution of background tasks. This can lead to increased resource consumption.
5. **Monitoring and Debugging**: Tracking the progress of asynchronous workflows and debugging issues can be more challenging than with synchronous workflows, as you may need to rely on logging and status checks.

There are definitely scenarios where each of the above are relevant, even in the Power Automate stack. The most important would probably be the '**Complexity**' aspect. There's a lot to consider when wanting to setup concurrency. One of the biggest aspects would be from a design perspective – ensuring that you're removing nested 'apply to each' actions and removing any dependencies within the 'apply to each'. Both of these would make concurrency somewhat redundant in the solution. If we are honest, **Delayed Results** is a problem in its entirety in the Power Automate stack, when using 'Apply to each'. Regardless of whether concurrency is on or not, you need to wait for all items to be processed before the results are returned.

### 3. Batch Processing with Apply to Each

Optimise loops for concurrent execution:

```json
{
    "ApplyToEach": {
        "Settings": {
            "ConcurrencyControl": {
                "Enabled": true,
                "DegreeOfParallelism": 4
            }
        },
        "Items": "@variables('DataCollection')",
        "Actions": {
            "ProcessItem": "Individual item processing logic"
        }
    }
}
```

## Advanced Concurrency Patterns

### Fan-Out/Fan-In Pattern

Distribute work across multiple branches and consolidate results:

```json
{
    "FanOut": {
        "Description": "Split large dataset into chunks",
        "Implementation": {
            "ChunkSize": 100,
            "MaxConcurrency": 5,
            "ProcessingBranches": [
                "ProcessChunk1",
                "ProcessChunk2", 
                "ProcessChunk3",
                "ProcessChunk4",
                "ProcessChunk5"
            ]
        }
    },
    "FanIn": {
        "Description": "Combine results from all branches",
        "WaitFor": "All branches to complete",
        "Action": "Merge and validate results"
    }
}
```

### Producer-Consumer Pattern

Separate data generation from data processing:

```json
{
    "Producer": {
        "Role": "Generate work items",
        "Output": "Queue of tasks to process",
        "Frequency": "Continuous"
    },
    "Consumer": {
        "Role": "Process work items",
        "Input": "Tasks from queue",
        "Concurrency": "Multiple instances"
    }
}
```

## Performance Optimisation

### Concurrency Settings

Configure optimal concurrency levels:

```json
{
    "ConcurrencySettings": {
        "ApplyToEach": {
            "DegreeOfParallelism": 4,
            "Recommendation": "Based on system capacity and external API limits"
        },
        "HTTPActions": {
            "MaxConcurrentConnections": 10,
            "Consideration": "Respect rate limiting"
        }
    }
}
```

### Resource Management

Monitor and manage resource consumption:

- **Memory usage**: Track data volume in concurrent operations
- **API limits**: Respect rate limiting across parallel calls
- **Execution time**: Monitor for timeout scenarios
- **Error rates**: Implement proper error handling

## Error Handling in Asynchronous Flows

### Resilient Design Patterns

```json
{
    "ErrorHandling": {
        "RetryPolicy": {
            "Count": 3,
            "Interval": "PT30S",
            "Type": "Exponential"
        },
        "TimeoutSettings": {
            "Duration": "PT10M",
            "Action": "Cancel and log error"
        },
        "FailureHandling": {
            "ContinueOnError": true,
            "LogErrors": true,
            "NotifyAdministrator": "On critical failures"
        }
    }
}
```

### Circuit Breaker Pattern

Prevent cascade failures in concurrent operations:

```json
{
    "CircuitBreaker": {
        "FailureThreshold": 5,
        "TimeoutDuration": "PT5M",
        "HalfOpenRetryInterval": "PT2M",
        "Actions": {
            "Open": "Stop making calls to failing service",
            "HalfOpen": "Test if service has recovered",
            "Closed": "Normal operation"
        }
    }
}
```

## Monitoring and Observability

### Performance Metrics

Track key performance indicators:

```json
{
    "Metrics": {
        "Throughput": "Items processed per minute",
        "Latency": "Time from start to completion",
        "ErrorRate": "Percentage of failed operations",
        "Concurrency": "Number of parallel operations",
        "ResourceUtilisation": "Memory and CPU usage"
    }
}
```

### Logging and Tracing

Implement comprehensive logging:

```json
{
    "LoggingStrategy": {
        "CorrelationId": "Track related operations",
        "Timestamps": "Precise timing information",
        "OperationContext": "Which branch/operation",
        "PerformanceData": "Execution duration and resource usage"
    }
}
```

## Real-World Use Cases

### 1. Document Processing Pipeline

```json
{
    "DocumentPipeline": {
        "Stage1": "Receive documents in parallel",
        "Stage2": "Concurrent OCR processing",
        "Stage3": "Parallel validation and classification",
        "Stage4": "Simultaneous storage and indexing"
    }
}
```

### 2. Multi-System Data Synchronisation

```json
{
    "DataSync": {
        "Sources": [
            "CRM system",
            "ERP system", 
            "Marketing platform",
            "Customer support tool"
        ],
        "Process": "Concurrent data extraction and transformation",
        "Destination": "Centralised data warehouse"
    }
}
```

### 3. Notification Broadcasting

```json
{
    "NotificationSystem": {
        "Channels": [
            "Email notifications",
            "SMS alerts",
            "Teams messages",
            "Mobile push notifications"
        ],
        "Processing": "Parallel delivery across all channels"
    }
}
```

## Best Practices

### Design Considerations
- **Identify parallelizable operations**: Look for independent tasks
- **Consider dependencies**: Ensure proper sequencing where needed
- **Plan for failures**: Design resilient error handling
- **Monitor performance**: Implement comprehensive observability

### Implementation Guidelines
- **Start simple**: Begin with basic parallel branches
- **Gradually increase complexity**: Add advanced patterns as needed
- **Test thoroughly**: Validate under various load conditions
- **Document patterns**: Maintain clear implementation documentation

### Operational Excellence
- **Capacity planning**: Understand system limits
- **Rate limiting**: Respect external service constraints
- **Graceful degradation**: Maintain functionality under stress
- **Continuous improvement**: Regular performance optimisation

## In Conclusion…

Earlier today I ran into an issue with concurrency in Power Automate due to the architecture of Power Automate. Since you need to declare (or initialise) the variables outside of a scope, you are essentially reusing the same instance across threads. This means that if multiple threads are running at the same time, you would definitely stand the chance of suffering from a data leak as the data gets jumbled and variable values are overwritten between threads and used as is. This results in dramatically incorrect results. You won't realise that this is happening when you're processing small amounts of data to test the concept. You only really realise that this is an issue when you test with larger amounts of data. This makes debugging the problem a lot more difficult.

![Concurrency Variable Issues](https://thejpanda.com/wp-content/uploads/2023/11/image-3.png)

As such, my advice is that if you are using a global variable in your 'Apply to each', rather decrease your concurrency count or turn it off completely. You'll be sacrificing the performance of your flow but at least your output will be accurate. I do believe that this would be solved by Microsoft allowing developers the ability to initialise a new instance of a variable in each thread. But since sharing is caring, we are stuck.

So use concurrency as far as possible, until you need to use variables in your apply to each. Or until you are facing some licensing limits. Make sure your design and placement of actions allows for asynchronous processing else concurrency won't help you much (ie. nested 'apply to each' actions).