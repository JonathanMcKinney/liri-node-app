# liri-node-app

## About

LIRI is  a command line node app that takes in parameters and returns data back to the console.  There are .gif files included to show how LIRI works.  Currently LIRI takes in four methods:
1. 'concert-this'
    * This reaches out to the BandsInTown API and searches by artist for upcoming concerts.
    * If there are upcoming shows, a list of results is returned in the following format:
        * Name of the Venue
        * Venue Location (City, State or City, Country if international)
        * Date of the Event (MM/DD/YYYY)
2. 'spotify-this-song'
    * This reaches out to the Spotify-node-API and searches a specified song.
    * A list of results is returned in the following format:
        * Artist/s
        * Song Name
        * URL to a 30 second preview
        * Album name
3. 'movie-this'
    * This reaches out to the OMDB API and searches for a movie.
    * If a match is found, the following data will be returned:
        * Title
        * Release Year
        * IMDB rating
        * Production Country
        * Language
        * Plot
        * Actors
4. 'do-what-it-says'

## Syntax

The command line syntax for a search is as follows:

node  liri.js  'method'  inquiry

for example:  node liri.js 'spotify-this-song' walking on sunshine