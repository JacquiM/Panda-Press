---
title: "Integrating with the MusicMaker Bot on Discord Using UiPath"
date: "2023-01-11"
author: "Jacqui Muller"
excerpt: "Learn how to automate Discord MusicMaker Bot interactions using UiPath, including playlist creation, YouTube integration, and automated music management for community servers."
image: "https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png"
category: "Automation"
tags: ["UiPath", "Discord", "Automation", "Music Bot", "RPA"]
difficulty: "Beginner – Senior"
---

# Integrating with the MusicMaker Bot on Discord Using UiPath

Discord is a great place to get a community of like-minded people together to partake in a whole range of activities, from gaming and home automation to Q&A community forums right across to using educational forums and everything in between. The more informal options often have text or voice channels that have Bots connected to provide some entertainment, in the form of music.

Many Bots have been written for exactly this purpose. My favourite one, so far (mostly because it was the easiest for me to get to work) is [MusicMaker](https://top.gg/bot/774043716797071371). Although there are many music bots, very few actually support YouTube, which is quite peculiar.

![Discord Automation with UiPath](https://thejpanda.com/wp-content/uploads/2020/08/automation-1.png)

## The Challenge

The problem though, is that MusicMaker doesn't play an existing YouTube playlist, it requires you to create your own. So to use MusicMaker, I actually had to create a playlist and add the songs from my YouTube playlist, one-by-one. This was very VERY tedious and so, I decided to automate as much of it as possible.

I started off by automating the [YouTube Playlist Extraction](https://www.nuget.org/packages/YouTube.Playlists) and popped it into a reusable library. Then I created a UiPath solution that allows me to execute a few different MusicMaker functions through Discord.

## The Solution

"MusicMaker on Discord" is an attended automation solution that allows for the following functionality:

- Add MusicMaker to a Discord Server
- Create a playlist
- Add music to a playlist from a YouTube playlist
- Play a playlist

Each .xaml file can be run individually and the process prompts the user for inputs and provides instructions through message boxes to ensure that everything works the way it should.

![UiPath Discord Integration Process](https://thejpanda.com/wp-content/uploads/2023/01/image-8.png)

## Add MusicMaker Bot to Server

First thing's first… Before we can use MusicMaker on Discord, we need to ensure that a few things have already been setup:

- A Discord server has been created
- The appropriate channels and help text have been added to the server to welcome users

Once the server has been set up, the MusicMaker Bot needs to be added to the server. To use the MusicMaker Bot, **the bot should be referenced in a voice channel** using the designated list of commands recognised by [MusicMaker](https://discordbotlist.com/bots/musicmaker).

### Available Commands

```
/back | /statistic | /clear | /dj | /filter | /help | /loop | /nowplaying | /pause | /ping | /play | /playlist | /queue | /resume | /save | /search | /skip | /stop | /time | /volume
```

As such, the UiPath process prompts you to connect to a voice channel on the Discord server and open the chat. **If the chat is not open, the UiPath process will not work as it is intended to work.** Once you are ready, with an open chat on the connected voice channel, you can click OK on the prompt raised by the UiPath process after which it will continue executing the commands to add MusicMaker to the server.

## Create Playlist

Once the MusicMaker bot has been added to the server, you can start interacting with the bot. You can either play music on a song-by-song basis or you can play a playlist, which is ideal if the music will be playing in the background with little interaction needed.

The problem though, is that playing a playlist does not mean that you will be playing an existing playlist from an existing music provider. The playlist command refers specifically to a MusicMaker playlist, which means that you need to create a new playlist on MusicMaker if you don't already have one.

### Required Inputs

The command requires two pieces of input:

- **Playlist Name**: The name of the playlist you'd like to create
- **Public**: A boolean (true or false) value that indicates whether or not the playlist should be made available publicly

> **Note**: If you elect to make this value false, only you will be able to play the playlist from the server (which everyone else on the channel will still be able to hear). Only the creator of a private playlist can command MusicMaker to play the playlist. If it is public, anyone on the channel can start the playlist.

Once again, for the UiPath process to work, the prompts need to be followed and the instructions need to be executed as per the instructions before hitting 'OK'. The prompts are set to instruct you to open the Discord app, connect to a voice channel and open the chat so that the UiPath process can work.

## Add Music from YouTube Playlist

This may take some work before getting up and running. In order for this to work in UiPath, Python would need to be installed and the Python interpreter path would need to be provided, along with the Google API key to access YouTube.

Here's a [guide on how to get the API key](https://thejpanda.com/2021/01/21/automation-youtube-playlist-monitoring-using-python/). The "add music to a MusicMaker playlist from a YouTube playlist" workflow makes use of a custom built [YouTube Playlists package](https://www.nuget.org/packages/YouTube.Playlists/), available through NuGet.

### Configuration Requirements

You'll be prompted for the following values:

- **Developer Key**: Google Developer Key associated to the YouTube API V3
- **Playlist Name**: The name of the playlist you'd like to add songs to

You'll need to assign values to the following variables which are not prompted for:

- **File Path**: The path that the Excel file should be written to and read from
- **Playlist ID**: The ID of the YouTube playlist to be scraped

In essence, all that is really needed here is an Excel file listing the songs, so if you'd rather write a UI automation component to get the list from YouTube, that'd work too.

Once the Excel spreadsheet has been generated, the song title is extracted from each row and added to the playlist.

## Play Playlist

Last thing left on the list, is to actually play the playlist. The process prompts you for input and instructs you to open the Discord server, connect to a voice channel and open the chat before proceeding. You'll only be prompted to input the **Playlist Name.**

The bot will then add the command into the chat and the playlist will start playing.

![MusicMaker Bot Vote Request](https://thejpanda.com/wp-content/uploads/2023/01/image-9.png)

If, at any point, the above message pop into the chat, click on the link, vote for MusicMaker and go about your business, everything will keep working.

## Technical Implementation

The solution leverages several key technologies:

1. **UiPath Studio** - For process automation and UI interaction
2. **YouTube API V3** - For playlist data extraction
3. **Python Integration** - For YouTube data processing
4. **Custom NuGet Package** - For reusable YouTube functionality
5. **Discord Bot Commands** - For MusicMaker interaction

## Best Practices

When implementing this automation:

- Ensure proper error handling for network connectivity issues
- Implement retry logic for Discord API interactions
- Validate YouTube playlist accessibility before processing
- Use proper authentication for all external services
- Test with different playlist sizes and formats

## Source Code

The solution is open for contribution through [this GitHub repo](https://github.com/JacquiM/MusicMaker-on-Discord).

This automation solution demonstrates how UiPath can be used to integrate with modern communication platforms like Discord, showcasing the versatility of RPA tools in creative applications beyond traditional business processes.