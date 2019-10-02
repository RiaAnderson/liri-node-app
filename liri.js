// NPM
require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");


// Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var getArtist = function (artist) {
    return artist.name;
}

var getSpotify = function (songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            //console.log("Artist(s): " + songs[i].artist.getArtist[i]);
            console.log("Song name: " + songs[i].name);
            console.log("Preview: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("----------------------------");
        }
    });
}

// OMDB
function getMovie(yourSearch) {
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&t=${yourSearch}`)
        .then(function (movie) {
            console.log(movie.data.Title);
            console.log(movie.data.Year);
            console.log(movie.data.imdbRating);
            // console.log(movie.data.Ratings[1]);
            console.log(movie.data.Production);
            console.log(movie.data.Language);
            console.log(movie.data.Plot);
            console.log(movie.data.Actors);
        })
        .catch(function (error) {
            console.log('Error occurred: ' + error);
        })
        .finally(function () {});
}


// Concerts - Bands in Town
function getConcert(yourSearch) {
    axios.get(`https://rest.bandsintown.com/artists/${yourSearch}/events?app_id=codingbootcamp`)
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                console.log(moment(response.data[i].datetime).format('MMMM Do YYYY'));
                console.log("---------------------")
            }
        })
}

// Read file - random.txt
var doWhat = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) throw error;
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        if (dataArr.length == 2) {
            command(dataArr[0], dataArr[1])
        } else if (dataArr.length == 1) {
            command(dataArr[0])
        }
    });
}



// Commands 
var command = function (caseData, yourSearch) {
    switch (caseData) {
        case "spotify-this-song":
            getSpotify(yourSearch);
            break;
        case "movie-this":
            getMovie(yourSearch);
            break;
        case "concert-this":
            getConcert(yourSearch)
            break;
        case "do-what-it-says":
            doWhat();
            break;
        default:
            console.log("Command Not Found.");
    }
}

var runThis = function (argOne, ArgTwo) {
    command(argOne, ArgTwo);
};

runThis(process.argv[2], process.argv[3]);