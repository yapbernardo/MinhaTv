const { Permission } = require('actions-on-google');

module.exports = {
    'ask_for_permission': (conv) => {
        const options = {
            context: 'Para te conhecer melhor :)',
            permissions: 'NAME'
        };
        conv.ask(new Permission(options))
    },

    'ask_for_permission_confirmation': (conv, _params, confirmationGranted) => {
        const { name } = conv.user;
        if (confirmationGranted) {
            if (name) {
                conv.ask(`Eu vou te ajudar ${name.display}!`);
            }
        } else {
            conv.ask(`Bom, mesmo assim vou te ajudar`);
        }
    }
};