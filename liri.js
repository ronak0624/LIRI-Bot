require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var readline = require("readline")

var spotify = new Spotify(keys.spotify);

var terminalCommand = process.argv[2];
var terminalArgs = process.argv.slice(2).join(" ");

function concertThis(artist) {
    // let artist = process.argv.slice(2).join(" ")
    console.log(artist)
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function (response) {
        let selectedEvent = response.data[0]
        console.log("Event Name: ", selectedEvent.venue.name);
        console.log("Location: ", selectedEvent.venue.city, ",", selectedEvent.venue.region);
        console.log("Date: ", selectedEvent.datetime);

    }).catch(function (err) {
        throw err;
    });
}

function movieThis(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
            function (response) {
                var movieInfo = response.data
                //     Title of the movie.
                console.log("Title: ", movieInfo.Title);
                //   * Year the movie came out.
                console.log("Title: ", movieInfo.Year);
                //   * IMDB Rating of the movie.
                console.log("Rating: ", movieInfo.imdbRating);
                //   * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes: ", movieInfo.Ratings[1].Value);
                //   * Country where the movie was produced.
                console.log("Country: ", movieInfo.Country);
                //   * Language of the movie.
                console.log("Language: ", movieInfo.Language);
                //   * Plot of the movie.
                console.log("Plot: ", movieInfo.Plot);
                //   * Actors in the movie.
            })
        .catch(function (error) {
            throw error;
        });
}

function spotifyThisSong(songname) {
    spotify.search({
        type: 'track',
        query: songname
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let song = data.tracks.items[0];
        // Artist(s)
        console.log("Artist: ", song.artists[0].name)
        // The song's name
        console.log("Title: ", song.name);
        // A preview link of the song from Spotify
        console.log("Preview song: ", song.external_urls.spotify);
        // The album that the song is from
        console.log("Album: ", song.album.name);
    });
}

function runCommands(command, args) {
    if (command === "concert-this") {
        concertThis(args)
    }
    if (command === "spotify-this") {
        spotifyThisSong(args);
    }
    if (command === 'movie-this') {
        movieThis(args);
    }
}

function filter() {
    if (terminalCommand === 'do-what-it-says') {
        const rl = readline.createInterface({
            input: fs.createReadStream('random.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            splitLine = line.split(",");
            runCommands(splitLine[0], splitLine[1]);
        });
    }
}

filter();