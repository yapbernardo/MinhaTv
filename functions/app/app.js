'use strict';

const { dialogflow } = require('actions-on-google');
const intent = require('./intents')

const app = dialogflow({ debug: true });

app.intent('Default Welcome Intent', intent.welcome);
app.intent('handle.permission', intent.handlePermission);
app.intent('change.channel', intent.changeChannel);

module.exports = app;