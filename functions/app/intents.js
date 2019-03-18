'use strict';

const { Permission } = require('actions-on-google');
const repository = require('../repositories/repository-channel');
const response = require('../app/responses');

const welcome = (conv) => {
    const name = conv.user.storage.userName;
    if (!name) {
        conv.ask(response.askNamePermission());
    } else {
        conv.ask(response.greetByName(name.givenName));
    }
};

const handlePermission = (conv, _params, permissionGranted) => {
    if (!permissionGranted) {
        conv.ask(response.permissionDenied());
    } else {
        const { requestedPermission } = conv.data;
        if (requestedPermission === 'NAME') {
            conv.user.storage.userName = conv.user.name.givenName;
            conv.ask(response.permissionGranted(conv.user.storage.userName));
        }
    }
};

const changeChannel = async (conv, { channel }) => {
    try {
        let channelDoc = await repository.findChannel(channel);
        repository.updateLive(channelDoc);
        conv.close(response.knownChannel());
        conv.ask(response.changingToChannel(channelDoc.data().name));
    } catch (error) {
        if (error.isNotFound) {
            conv.close(response.channelNotFound());
            return conv.ask(response.askFindAnotherChannel());
        }
        return conv.close(response.defaultError());

    }
};

// -------------------- Module Exports -------------------------//
module.exports = {
    'welcome': welcome,
    'handlePermission': handlePermission,
    'changeChannel': changeChannel
};