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
                if (doc && doc.exists) {
                    console.log('Finded channel ', doc.data().name)
                    return resolve(doc);
                }
                console.log(`Can\'t find channel : ${channel}`);
                return reject({ isNotFound: true });

            })
            .catch((err) => {
                console.log('Error when trying to find the channel ', err);
                reject(err);
            });
    });
}

const updateLive = (doc) => {
    const data = doc.data();
    return new Promise((resolve, reject) => {
        liveTable.doc('channel').update('url', data.url)
            .then(ref => {
                console.log('Updated the url: ', data.url)
                resolve(ref)
            })
            .catch((err) => {
                console.error('Could\'t update url')
                reject(`${err}`)
            });
    });
}

// -------------------- Module Exports -------------------------//
module.exports = {
    'findChannel': findChannel,
    'updateLive': updateLive
};