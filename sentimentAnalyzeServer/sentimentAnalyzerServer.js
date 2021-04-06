const express = require('express');
require("dotenv").config();

const getNLUInstance = () => {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    })
    return naturalLanguageUnderstanding;
}


// initializing NLU instance
const NLU = getNLUInstance();

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

// @GET /
app.get("/", (req, res) => {
    return res.render('index.html');
});

// @GET /url/emotions
app.get("/url/emotion", (req, res) => {
    const text = req.url;
    
    const params = {
        'text': text,
        'features': {
            "emotion": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

// @GET /url/sentiments
app.get("/url/sentiment", (req, res) => {
     const text = req.url;
    
    const params = {
        'text': text,
        'features': {
            "sentiment": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

// @GET /text/emotion
app.get("/text/emotion", (req, res) => {
     const text = req.url;
     
    const params = {
        'text': text,
        'features': {
            "emotion": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

// @GET text/sentiment
app.get("/text/sentiment", (req, res) => {
    const text = req.url;
    
    const params = {
        'text': text,
        'features': {
            "sentiment": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

