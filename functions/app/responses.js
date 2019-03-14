const { Permission } = require('actions-on-google');

const askNamePermission = () => {
    const options = {
        context: 'Oie você! Para te conhecer melhor :)',
        permissions: 'NAME'
    };
    return new Permission(options);
}

const greetByName = (name) => {
    const greetings = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Oi de novo ${name}! Em que posso te ajudar?
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Eae, como posso te ajudar ${name}?
            </prosody>
        </speak>`
    ];
    return getSingleRandom(greetings);
}

getSingleRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// -------------------- Module Exports -------------------------//
module.exports = {
    'askNamePermission': askNamePermission,
    'greetByName': greetByName
};