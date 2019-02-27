'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('./app/app');

//Inicialize Firebase
admin.initializeApp(functions.config().firebase);

//Variable for Firebase firestore, that we will be using as or database
global.db = admin.firestore();

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);