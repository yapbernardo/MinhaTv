// Database table for channels
const channelsTable = db.collection('channels');
const liveTable = db.collection('live-channel');

// const findChannel = function (channel) {
//     return new Promise((resolve, reject) =>
//         channelsTable.doc(channel).get()
//             .then((doc) => {
//                 resolve(doc);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 reject(`Error ${err}`)
//             })
//     );
// }

// const updateLive = function (doc) {
//     const data = { path: db.doc(`channel/${doc}`) }
//     return new Promise((resolve, reject) =>
//         liveTable.doc('live-channel').set(data)
//             .then(ref => {
//                 console.log('Added doc with ID: ', ref.id)
//                 resolve(ref)
//             })
//             .catch((err) => {
//                 console.error('Could\'t add doc')
//                 reject(`${err}`)
//             })
//     );
// }

// // -------------------- Module Exports -------------------------//
// module.exports = {
//     'findChannel': findChannel,
//     'updateLive': updateLive
// };