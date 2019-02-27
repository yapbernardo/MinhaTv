'use strict';

const { dialogflow } = require('actions-on-google');
const responses = require('./responses')

const app = dialogflow({ debug: true });

app.intent('Default Welcome Intent', responses.welcome);
app.intent('handle.permission', responses.handlePermission);

module.exports = app;