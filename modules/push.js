
const fs = require( 'fs' );

const urlsafeBase64 = require( 'urlsafe-base64' );
const vapid = require( '../vapid.json' );

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:rafaelmp@gmail.com',
    vapid.publicKey,
    vapid.privateKey
  );

const subscriptions = require( './subs-db.json' );


module.exports.getKey = () => {

    return urlsafeBase64.decode( vapid.publicKey );

};


module.exports.addSubscription = ( subscription ) => {

    subscriptions.push( subscription );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( subscriptions));

};


module.exports.sendPush = ( post ) => {

    subscriptions.forEach( (subscription, i) => {

        webpush.sendNotification( subscription, JSON.stringify( post ) );

    });

};