---
title: "Getting Data from the 'New' GitHub Projects - Automation and Web Scraping"
date: "2025-03-13"
category: "Custom Development"
excerpt: "Learn how to extract data from GitHub's new Projects using Python web scraping when traditional APIs fall short. Essential automation techniques for project management."
author: "JPanda Solutions"
readTime: "12 min read"
image: "https://thejpanda.com/wp-content/uploads/2022/09/image.png"
---

# Getting Data from the 'New' GitHub Projects - Automation and Web Scraping

**Level of Difficulty: Beginner – Senior**

![GitHub Projects Automation](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

GitHub Projects is nothing new – it has been around for a while now with a really cool API that allows you to pull data from it. For those who have made use of that functionality, it has been a breeze trying to automate and integrate different tasks across different platforms. But… GitHub have launched an 'all-new' project element to their platform that now allows you to do cool new things that was previously limited in the Classic Projects.

![GitHub New Projects](https://thejpanda.com/wp-content/uploads/2022/09/image.png)

Now from an automation and integration perspective, this addition is exciting but getting the data is notoriously tough. The addition to the platform is still relatively new and hasn't been out of preview for all that long so it is understandable that the API (which is based on Graph QL) is not quite 'there' yet. It's not as easy as lifting and shifting from Classic Projects to new Projects. So what now? How do we use this cool new (free) tech and still be able to grab the data we need if not even front-end Robotic Process Automation (RPA) can work?

The answer didn't seem as 'simple' at the time, when I had exhausted nearly every possible solution I could think of, but web-scraping definitely does the trick.

Due to the way that GitHub (and GitHub Projects – more specifically) has been created, a lot of the data that is being rendered on the front-end is actually quite easily accessible from the front-end elements of the web page which is why the web-scraping option works so well. The only caveat is that you need to have access to the Project to scrape it.

Here are a few examples of the data you can pull:

- Project Views
- Project View Columns
- Project View Data
- Project Charts

You can pull individual elements and associated data out as well (like list of values for a specific column, etc.). Let's see how that works using Python.

## Install Beautiful Soup

If you haven't yet installed [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/), do so using the following command:

```bash
pip install beautifulsoup4
```

## Import Libraries

Import all of the following libraries/packages which are essential to the successful scraping of the data:

```python
import requests
import json
import pandas as pd
from bs4 import BeautifulSoup as bs 
```

## Use Beautiful Soup to Scrape the Project

Beautiful Soup is the packaged used to scrape a web page which, in this case, works quite well when scraping a GitHub project. The soup is the content scraped from the webpage and will be used further for more manipulation to get the required data.

```python
def GetProjectSoup(project_url):
    # load the projectpro webpage content 
    r = requests.get(project_url) 
    # convert to beautiful soup 
    soup = bs(r.content) 
    return soup
```

## Get Project Views

All the required data already lives in the 'soup' – all you need to do is grab the data living in the 'memex-views' element:

```python
def GetViews(soup):
    view_data_text = str(soup.find_all(id='memex-views')).replace('[<script id="memex-views" type="application/json">','').replace('</script>]','')
    json_object = json.loads(view_data_text)
    return pd.DataFrame.from_dict(json_object)
```

## Get Project View Columns

All the required data already lives in the 'soup' – all you need to do is grab the data living in the 'memex-columns-data' element:

```python
def GetColumns(soup):
  
    column_data_text = str(soup.find_all(id='memex-columns-data')).replace('[<script id="memex-columns-data" type="application/json">','').replace('</script>]','')
    json_object = json.loads(column_data_text)
    json_object
    return pd.DataFrame.from_dict(json_object)
```

## Get View Data

All the required data already lives in the 'soup' – all you need to do is grab the data living in the 'memex-items-data' element:

```python
def GetData(soup):
  
    data_text = str(soup.find_all(id='memex-items-data')).replace('[<script id="memex-items-data" type="application/json">','').replace('</script>]','')
    json_object = json.loads(data_text)
    json_object
    df_tempdata = pd.DataFrame.from_dict(json_object)
    return df_tempdata
```

## Get Project Charts

All the required data already lives in the 'soup' – all you need to do is grab the data living in the 'memex-charts-data' element:

```python
def GetCharts(project_url):
    # load the projectpro webpage content 
    r = requests.get(project_url) 
    # convert to beautiful soup 
    soup = bs(r.content) 
    #print(soup)
    column_data_text = str(soup.find_all(id='memex-charts-data')).replace('[<script id="memex-charts-data" type="application/json">','').replace('</script>]','')
    json_object = json.loads(column_data_text)
    json_object
    charts_list = [ element['name'] for element in json_object]
    return charts_list
```

## Bringing it all Together

It is totally possible to scrape more data from the site, all you would need to do is rescrape the new URL which you can put together based on some of the info you've already scraped, like appending '/views/<index>' to the project URL to get specific view data.

```python
project_url = 'https://github.com/users/JacquiM/projects/23/views/1'
# Get Soup from Website Scrape
soup = GetProjectSoup(project_url)
# Get Views and assign to new Dataframe
df_views = GetViews(soup)
# Get Columns and assign to new Dataframe
df_columns = GetColumns(soup)
# Get View Data and assign to new Dataframe
df_data = GetData(soup)
# Get Project Charts and return as List
charts_list = GetCharts(project_url)
```

All the code that you would need can be found in this [GitHub Repo](https://github.com/JacquiM/GitHub-Project-Scrape). This approach provides a practical workaround for accessing GitHub's new Projects data when traditional API methods aren't sufficient.

## Key Benefits

- **No API limitations**: Bypass GraphQL complexity
- **Real-time data**: Access current project state
- **Comprehensive extraction**: Get views, columns, data, and charts
- **Flexible implementation**: Customise based on specific needs

## Considerations

- **Access requirements**: Must have project access permissions
- **Rate limiting**: Implement appropriate delays between requests
- **Structure changes**: Monitor for GitHub UI updates that might affect scraping
- **Authentication**: Handle private repositories appropriately

This web scraping approach fills the gap while GitHub's new Projects API matures, providing developers with the automation capabilities needed for modern project management workflows.