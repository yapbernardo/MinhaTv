'use strict';

const { Permission } = require('actions-on-google');

const welcome = (conv) => {
    const name = conv.user.storage.userName;
    if (!name) {
        const options = {
            context: 'Oie você! Para te conhecer melhor :)',
            permissions: 'NAME'
        };
        conv.ask(new Permission(options));
    } else {
        conv.ask(`Oi de novo ${name.display}! Em que posso te ajudar?`);
    }
};

const handlePermission = (conv, params, permissionGranted) => {
    if (!permissionGranted) {
        conv.ask('Sem problemas. Em que posso te ajudar?');
    } else {
        const { requestedPermission } = conv.data;
        if (requestedPermission === 'NAME') {
            conv.user.storage.userName = conv.user.name.display;
            conv.ask(`Valeu, ${conv.user.storage.userName}. Em que posso te ajudar?`);
        }
    }
}

module.exports = {
    'welcome': welcome,
    'handlePermission': handlePermission
};