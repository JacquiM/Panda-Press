---
title: "YouTube Playlist Monitoring Using Python"
date: "2021-01-21"
author: "Jacqui Muller"
excerpt: "Learn how to monitor YouTube playlists for new items using Python and the YouTube Data API, enabling automated workflow triggers for playlist updates."
image: "https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png"
category: "Automation"
tags: ["Python", "YouTube API", "Automation", "Monitoring", "API Integration"]
difficulty: "Beginner – Senior"
---

# YouTube Playlist Monitoring Using Python

There are many different workflow and automation suites/platforms available out there (some of which include IFTTT, Power Automate and Tonkean) that allow users to interact with their YouTube connector. Most of these workflows classify the functions within the connectors as either a **Trigger** or an **Action**.

A trigger would be seen as an event that "kicks off" the workflow/process, whereas an action would be an event (or a set of events) that should be executed once the workflow/process has been triggered.

![YouTube Automation with Python](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

## The Problem

Many of these workflows make use of APIs to get their triggers and actions functioning. There is one small problem though… They don't always have the predefined triggers or actions that we might be looking to use.

Platforms like IFTTT and Power Automate do not yet have a **"When an item is added to a Playlist"** trigger. Not a train smash though… In this post, we work through how to monitor a YouTube playlist for the addition of new items using Python and the YouTube Data API.

## Implementation Steps

The steps that we will be following are:

1. **Get a Developer Key**
   - Create Project
   - Create Credentials  
   - Get API Key
2. **Create the Python Script**
   - Import Python Libraries
   - Obtain Playlist ID
   - Query Playlist Items
   - Process New Items

## Deep Dive

Let's dive deeper into the steps listed above.

**Please note:** This will require a YouTube Playlist to be created if it doesn't already exist.

### Get a Developer Key

In order to use the [YouTube Data API](https://developers.google.com/youtube/v3), a developer key needs to be obtained through [this portal](https://console.developers.google.com/apis/credentials).

#### Create Project

You'll first need to create a project by either clicking on **"Create Project"** if you have the option, or by clicking on **"Select a Project"** proceeded by **"New Project"**:

![Create Google Cloud Project](https://thejpanda.com/wp-content/uploads/2021/01/image-1.png)

#### Create Credentials

Once you've selected an option to create a new project, you'll be prompted to enter a name. Thereafter, you may click **"Create"**:

![Project Configuration](https://thejpanda.com/wp-content/uploads/2021/01/image-2.png)

After the redirect, you should be focused on **"Credentials"** where you can add a new API key by selecting the **"Create Credentials"** option:

![Create API Credentials](https://thejpanda.com/wp-content/uploads/2021/01/image-4.png)

#### Get API Key

Next, copy the API key as we will need it to get the Python script working properly:

![Copy API Key](https://thejpanda.com/wp-content/uploads/2021/01/image-5.png)

### Create Python Script

#### Install Required Libraries

Now, let's switch to Python and install the correct libraries before we can import them:

```bash
!pip install google-api-python-client
!pip install google_auth_oauthlib
```

#### Import Libraries and Instantiate Variables

The following libraries should be imported:

```python
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser
import pandas as pd
import numpy as np
import requests
import json
```

Next, let's instantiate our first three variables needed to work with the YouTube Data API:

```python
DEVELOPER_KEY = '<insert your API key here>'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'
```

#### Obtain Playlist ID

To get familiar with how the Google documentation works, let's explore how to get a list of playlists, [here](https://developers.google.com/youtube/v3/docs/playlists/list), using the **"Try it"** function:

![YouTube API Documentation](https://thejpanda.com/wp-content/uploads/2021/01/image-6.png)

The documentation explains what parameters are required and which are optional. For the sake of getting a list of my own playlists, I added the following values before selecting **"Execute"**:

![API Parameters Configuration](https://thejpanda.com/wp-content/uploads/2021/01/image-7.png)

You should receive a 200 response with information regarding your playlists:

![API Response](https://thejpanda.com/wp-content/uploads/2021/01/image-8.png)

By selecting **"Show Code"** shown above, you should be able to select **"Python"** to see the Python Code if you wanted to add it to the automation script:

![Python Code Generation](https://thejpanda.com/wp-content/uploads/2021/01/image-9.png)

Once you have the ID of the playlist that you'd like to monitor, assign it to a variable:

```python
playlist_id = '<insert playlist ID here>'
```

#### Query Playlist Items

There is a max result limit of 50 results per call to the API which means that the results will need to be paged if there are more than 50 items in a playlist (multiple calls will need to be made to get all the results, 50 at a time). The response will contain a page token if there is a next page.

Now, let's create a method that allows for paging through results:

```python
# Get all items in specified playlist
def get_playlist_items(page_token):
    # Auth with YouTube service
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
                   developerKey=DEVELOPER_KEY)
    
    # Call the playlistItems.list method to retrieve results
    request = youtube.playlistItems().list(
        part="snippet,contentDetails",
        pageToken=page_token,
        maxResults=50,
        playlistId=playlist_id
    )
    response = request.execute()
    
    return response
```

#### Process New Items

In the true spirit of automation workflows/processes, if the trigger is "new items found in a playlist", then we need actions to execute once that is found to be true. We can encapsulate these actions into a **"Process New"** method:

```python
# Process any items that were not found in the previous set of results
def process_new(df_old, df_new):
    
    df_diff = df_new.set_index('title').drop(df_old['title'], errors='ignore').reset_index(drop=False)
    
    print(len(df_diff))
    
    for index, element in df_diff.iterrows():
        print("New Item Added: " + str(element['title']).encode('utf-8'))
```

### Main Execution Logic

Let's tie the top two methods together through a **"main"** method code snippet. Make sure you have an **"items.xlsx"** file that records all of the items that are in the playlist:

```python
isEnd = False
page_token = None
df = pd.DataFrame()  # instantiate blank dataframe

# Read history before querying new results so that new records may be identified
df_history = pd.read_excel('items.xlsx', headers=False)

while not isEnd:
    playlist_items = get_playlist_items(page_token)
    
    current_count = playlist_items['pageInfo']['totalResults']
    
    # if there is a page token, use it for the next call or assign it back to None
    if 'nextPageToken' in playlist_items.keys():
        page_token = playlist_items['nextPageToken']
    else:
        isEnd = True
        page_token = None
    
    # write playlist item information to the dataframe
    for item in playlist_items['items']:
        temp_df = pd.DataFrame.from_dict(item)
        temp_df = temp_df[['snippet']].transpose()
        df = df.append(temp_df)
            
df.to_excel('items.xlsx')  # write the dataframe to excel
process_new(df_history, df)  # process the new items
```

## Advanced Implementation Features

### Error Handling

Add robust error handling to manage API limits and network issues:

```python
import time
from googleapiclient.errors import HttpError

def get_playlist_items_with_retry(page_token, max_retries=3):
    for attempt in range(max_retries):
        try:
            return get_playlist_items(page_token)
        except HttpError as e:
            if e.resp.status == 403:  # Quota exceeded
                print(f"Quota exceeded. Waiting before retry...")
                time.sleep(60)  # Wait 1 minute
            elif e.resp.status == 404:  # Playlist not found
                print("Playlist not found.")
                return None
            else:
                print(f"HTTP Error: {e}")
                if attempt < max_retries - 1:
                    time.sleep(10)  # Wait 10 seconds before retry
                else:
                    raise
        except Exception as e:
            print(f"Unexpected error: {e}")
            if attempt < max_retries - 1:
                time.sleep(10)
            else:
                raise
```

### Enhanced Data Processing

Expand the data extraction to include more metadata:

```python
def extract_video_details(item):
    snippet = item['snippet']
    content_details = item['contentDetails']
    
    return {
        'title': snippet.get('title', 'N/A'),
        'description': snippet.get('description', 'N/A')[:100],  # First 100 chars
        'published_at': snippet.get('publishedAt', 'N/A'),
        'video_id': content_details.get('videoId', 'N/A'),
        'channel_title': snippet.get('videoOwnerChannelTitle', 'N/A'),
        'thumbnail_url': snippet.get('thumbnails', {}).get('default', {}).get('url', 'N/A')
    }
```

### Notification Integration

Add email or webhook notifications for new items:

```python
import smtplib
from email.mime.text import MIMEText

def send_notification(new_items):
    if not new_items:
        return
    
    # Email notification
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "your-email@gmail.com"
    sender_password = "your-app-password"
    recipient_email = "recipient@gmail.com"
    
    subject = f"New YouTube Playlist Items ({len(new_items)})"
    body = "New items added to playlist:\n\n"
    
    for item in new_items:
        body += f"- {item['title']}\n"
    
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = recipient_email
    
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print("Notification sent successfully!")
    except Exception as e:
        print(f"Failed to send notification: {e}")
```

### Scheduling and Automation

Create a scheduled monitoring system:

```python
import schedule
import time

def monitor_playlist():
    """Main monitoring function"""
    try:
        print(f"Checking playlist at {time.strftime('%Y-%m-%d %H:%M:%S')}")
        # Execute your main monitoring logic here
        # ... (previous code)
        print("Monitoring complete.")
    except Exception as e:
        print(f"Error during monitoring: {e}")

# Schedule monitoring every 30 minutes
schedule.every(30).minutes.do(monitor_playlist)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(60)  # Check every minute
```

## Use Cases and Applications

### Integration Scenarios

1. **Discord Music Bot Integration**: Automatically update music bot playlists
2. **Content Curation**: Monitor educational channels for new content
3. **Social Media Automation**: Auto-post about new playlist additions
4. **Analytics Tracking**: Monitor playlist growth and engagement patterns

### Business Applications

- **Marketing Teams**: Track competitor playlist updates
- **Content Creators**: Monitor collaborator playlist changes
- **Educational Institutions**: Track course material updates
- **Event Management**: Monitor event-related playlist updates

## Security Considerations

### API Key Protection
- Store API keys in environment variables
- Use encrypted configuration files
- Implement key rotation policies
- Monitor API usage patterns

### Rate Limiting
- Implement exponential backoff
- Respect YouTube API quotas
- Cache results when appropriate
- Use efficient pagination strategies

## Source Code Repository

The full Python script is available on Github [here](https://github.com/JacquiM/BasicPythonScripts/tree/master/Scripts/YouTube%20Playlist%20Sync).

This implementation provides a solid foundation for YouTube playlist monitoring that can be extended and integrated into larger automation workflows, enabling sophisticated content management and notification systems.