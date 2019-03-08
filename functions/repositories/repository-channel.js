'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');

//Inicialize Firebase
admin.initializeApp(functions.config().firebase);

//Variable for Firebase firestore, that we will be using as or database
const db = admin.firestore();

// Database table for channels
const channelsTable = db.collection('channels');
const liveTable = db.collection('live-channel');

const findChannel = (channel) => {
    return new Promise((resolve, reject) => {
        channelsTable.doc(channel).get()
            .then((doc) => {
                console.log('Finded channel ', doc)
                resolve(doc);
            })
            .catch((err) => {
                console.log(err);
                reject(`Error ${err}`)
            });
    });
}

const updateLive = (doc) => {
    const data = { path: db.doc(`channel/${doc}`) }
    return new Promise((resolve, reject) => {
        liveTable.doc('live-channel').set(data)
            .then(ref => {
                console.log('Added doc with ID: ', ref.id)
                resolve(ref)
            })
            .catch((err) => {
                console.error('Could\'t add doc')
                reject(`${err}`)
            });
    });
}

// -------------------- Module Exports -------------------------//
module.exports = {
    'findChannel': findChannel,
    'updateLive': updateLive
};