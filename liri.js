//==============================================================
//====================== Node.js Application ===================
//==============================================================

//====================== Constants ======================

// User inputs
const input1 = process.argv[2];
const input2 = process.argv.slice(3);

// Requires
const keys = require('./keys')
const spotify = require('spotify');
const Twit = require('twit');
const request = require('request')
const fs = require('fs')


//====================== Twitter  ======================

// Twitter API keys
const T = new Twit({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token: keys.twitterKeys.access_token,
    access_token_secret: keys.twitterKeys.access_token_secret
});

// Parameters to use when getting tweets
const tParams = {
    screen_name: 'go4nando',
    count: 20
};



// If user inputs 'my-tweets' run the following code
if (input1 === 'my-tweets') {

    T.get('statuses/user_timeline', tParams, gotData);

    // Function to cycle through tweets after data is received
    function gotData(error, data, response) {
        var tweets = data;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            console.log("----------------------")
        }
    }
    // If user inputs 'spotify-this-song' run the following code    
} else if (input1 === 'spotify-this-song') {
    console.log("spotify")
    spotify.search({ type: 'track', query: 'we are the world' }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Do something with 'data'
        console.log(data)
        console.log(input2)
    });
    // If user inputs 'movie-this' run the following code
} else if (input1 === 'movie-this') {
    // Link to OMDB API
    const queryUrl = "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=40e9cece";
    // Requesting data from OMDB
    request(queryUrl, function(error, response, body) {
            // If error occurs during request, console log the error
            if (error) {
                return console.error(error)
            }// end of error if

            // Using JSON.parse to parse a JSON string
            const responseJson = JSON.parse(body)
            // What data will be loged
            console.log(responseJson.Title)
            console.log(responseJson.Year)
            console.log(responseJson.imdbRating)
            console.log(responseJson.Country)
            console.log(responseJson.Language)
            console.log(responseJson.Plot)
            console.log(responseJson.Actors)
        })//end of request
} // end of if else
// If user inputs 'do-what-it-says' run the following code
else if (input1 === "do-what-it-says") {

    console.log("spotify sucks for changing the terms of their API")

    // Reading a the file 'random.txt'
    fs.readFile('random.txt', 'utf8', function(error, fileContents) {
        if (error) {
            console.error(error)
        }
        console.log(fileContents)

    })



} //end of else if "do-what-it-says"
