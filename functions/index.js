'use strict';

const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

//Inicialize Firebase
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

//Initialize DialogFlow as app
const app = dialogflow({ debug: true });

//Variable for Firebase firestore, that we will be using as or database
const db = admin.firestore();

//Table live-channel on firestore
const liveChannel = db.collection('live-channel');
//Table channels on firestore
const channelsTable = db.collection('channels');

app.intent('change.channel', (conv, { channel }) => {
    channelsTable.doc(channel).get()
        .then(doc => {
            if (!doc.exists) {
                return conv.close("Hm acho que ainda nào conheço esse canal");
            } else {
                const data = {
                    name: doc.name,
                    url: doc.url
                };

                liveChannel.doc('channel').set(data);
                return conv.close(`Mudando para ${channel}`);
            }
        })
        .catch((err) => {
            console.log(err)
            conv.close('Ixi, não consegui checar esse canal aqui :/')
        });
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);