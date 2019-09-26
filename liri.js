require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var nspot = require("node-spotify-api");

// var spotify = new Spotify(keys.spotify);

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
                console.log(movieInfo);
                //   * Year the movie came out.
                //   * IMDB Rating of the movie.
                //   * Rotten Tomatoes Rating of the movie.
                //   * Country where the movie was produced.
                //   * Language of the movie.
                //   * Plot of the movie.
                //   * Actors in the movie.
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

movieThis("titanic");