//====================== GLOBAL VARIABLES ======================
const input1 = process.argv[2];
const input2 = process.argv[3];

var spotify = require('spotify');
var Twit = require('twit');
// var omdb = require('omdb');
var request = require('request')


//====================== Twitter  ======================
var keys = require('./keys')


let T = new Twit({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token: keys.twitterKeys.access_token,
    access_token_secret: keys.twitterKeys.access_token_secret
});

// Parameters to use when getting tweets
var tParams = {
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
    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Do something with 'data'
        console.log(data)
        console.log(input2)
    });
} else if (input1 === 'movie-this') {
    const queryUrl = "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
            if (error) {
                return console.error(error)
            } // end of error if 
            const responseJson = JSON.parse(body)
            console.log(responseJson.Title)
            console.log(responseJson.Year)
            console.log(responseJson.imdbRating)
            console.log(responseJson.Country)
            console.log(responseJson.Language)
            console.log(responseJson.Plot)
            console.log(responseJson.Actors)
            // console.log(responseJson.)
        }) //end of request
} // end of if else
else if (input1 === "do-what-it-says"){

} //end of else if "do-what-it-says"






//     if (!error) {
//         var results = JSON.parse(response.body)

//         console.log('body:', results.Title,
//             results.Year,
//             results.Ratings[0].Value,
//             results.Country,
//             results.Language,
//             results.Plot,
//             results.Actors,
//             results.Ratings[1].Value
//         );

//     }
//     console.log('statusCode:', response.statusCode);


// });
