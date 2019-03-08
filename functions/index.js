'use strict';

const functions = require('firebase-functions');
const app = require('./app/app');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);