const { Permission } = require('actions-on-google');

const ssmlRate = "100%"

const askNamePermission = () => {
    const options = {
        context: 'Oie você! Para te conhecer melhor :)',
        permissions: 'NAME'
    };
    return new Permission(options);
}

const permissionDenied = () => {
    const greetings = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                <p>
                    <s>Não tem problema nenhum também!</s>
                    <s>Como posso te ajudar</s>
                </p>
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

const permissionGranted = (name) => {
    const greetings = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                <p>
                    <s>Valeu, ${name}</s>
                    <s>Como posso te ajudar?</s>
                </p>
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
               <p>
                    <s>Obrigada pela confiança ${name}</s>
                    <s> Em que posso te ajudar agora?</s>
                </p>
            </prosody>
        </speak>`
    ];
    return getSingleRandom(greetings);
}

const greetByName = (name) => {
    const greetings = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                <p>
                    <s>Oi de novo ${name}!</s>
                    <s>Em que posso te ajudar?</s>
                </p>
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

const askFindAnotherChannel = () => {
    const questions = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Existe algum outro canal que posso achar pra você?
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Que outro canal eu posso trazer para você?
            </prosody>
        </speak>`
    ];
    return getSingleRandom(questions);
}

const channelNotFound = () => {
    const notFound = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Eu nao conheço esse ai nao..
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Hm, eu não lembro de conhecer esse canal
            </prosody>
        </speak>`
    ];
    return getSingleRandom(notFound);
}

const defaultError = () => {
    const notFound = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Rolou um erro aqui :/ Tenta novamente depois
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Hm poxa, aconteceu algum erro. Tenta depois de novo..
            </prosody>
        </speak>`
    ];
    return getSingleRandom(notFound);
}

const knownChannel = () => {
    const notFound = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Esse canal eu conheço!
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Boa, eu gosto muito desse canal
            </prosody>
        </speak>`
    ];
    return getSingleRandom(notFound);
}

const changingToChannel = (channel) => {
    const changing = [
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Mudando para ${channel}
            </prosody>
        </speak>`,
        `<speak>
            <prosody rate="${ssmlRate}" pitch="medium">
                Colocando no canal: ${channel}
            </prosody>
        </speak>`
    ];
    return getSingleRandom(changing);
}

getSingleRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// -------------------- Module Exports -------------------------//
module.exports = {
    'askNamePermission': askNamePermission,
    'greetByName': greetByName,
    'permissionDenied': permissionDenied,
    'permissionGranted': permissionGranted,
    'askFindAnotherChannel': askFindAnotherChannel,
    'channelNotFound': channelNotFound,
    'defaultError': defaultError,
    'knownChannel': knownChannel,
    'changingToChannel': changingToChannel
};