//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}))

/**
 * 
 *   REST -> Representational State Transfer.
 * 
 *   // HTTP GET https://myapi.com/people/1 
 *   {
 *      "id" : 1
 *      "first_name" : "jagya",
 *      "phone_number" : "+15555555"
 *   }
 * 
 *   HTTP RESOURCE
 * 
 *   GET, POST, PUT, PATCH, DELETE 
 *   
 *   GET /people/1 OR /people
 * 
 *   POST -> inserts a new entry.... HTTP POST { "name" : "Jagya", "phone_number" : "+1512341241" }
 *   
 *   PUT -> HTTP PUT { "..." : "Raymond", "phone_number" : "+124sfasdfgasdf" }
 * 
 *   PATCH -> HTTP PATCH /people/1?first_name=Euri
 * 
 */

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    // console.log(firstName, lastName, email);


    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/a1c6522bb0",
        method: "POST",
        headers: {
            "Authorization": "ohhnvs af5c6ced91c0bef5ba56f65fa39cb25f-us4"
        },
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                console.log(response.statusCode);
                res.sendFile(__dirname + "/success.html");
            } else { 
                console.log(response.statusCode);
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


//Heroku will choose port for you or listnening to local host
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});



//listenig to local host
// app.listen(3000, function () {
//     console.log("Server is running on port 3000.");
// });



//Mailchimp
//API Key
// af5c6ced91c0bef5ba56f65fa39cb25f-us4

//List Audience ID
//a1c6522bb0