'use strict';

const { Permission } = require('actions-on-google');
const repository = require('../repositories/repository-channel');

const welcome = (conv) => {
    const name = conv.user.storage.userName;
    if (!name) {
        const options = {
            context: 'Oie você! Para te conhecer melhor :)',
            permissions: 'NAME'
        };
        conv.ask(new Permission(options));
    } else {
        conv.ask(`Oi de novo ${name.givenName}! Em que posso te ajudar?`);
    }
};

const handlePermission = (conv, _params, permissionGranted) => {
    if (!permissionGranted) {
        conv.ask('Sem problemas. Em que posso te ajudar?');
    } else {
        const { requestedPermission } = conv.data;
        if (requestedPermission === 'NAME') {
            conv.user.storage.userName = conv.user.name.givenName;
            conv.ask(`Valeu, ${conv.user.storage.userName}. Em que posso te ajudar?`);
        }
    }
};

const changeChannel = async (conv, { channel }) => {
    let channelDoc = await repository.findChannel(channel);
    if (!channelDoc.exists) {
        conv.close('Eu nao conheco esse ai nao..');
    } else {
        conv.close(`Mudando para ${channel}`)
    }
};

module.exports = {
    'welcome': welcome,
    'handlePermission': handlePermission,
    'changeChannel': changeChannel
};