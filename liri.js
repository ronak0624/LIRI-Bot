
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

function concertThis(){
    let artist = process.argv[2]
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(function(response){
        console.log(response)
    });
}

concertThis()