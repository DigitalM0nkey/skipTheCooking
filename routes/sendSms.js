require('dotenv').config();

const accountSid = process.env.DEV_TWILIO_ACCOUNT_SID;
const authToken = process.env.DEV_TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const orderReceivedMessage = `SkipTheCooking thanks you from you order from 🥧s & 🍟s. Your order will be ready in ⏱️25 minutes.`;





const sendMessage = function(message) {
  client.messages
    .create({
      body: orderReceivedMessage,
      from: process.env.DEV_OUTGOING_PHONE_NUMBER,
      to: process.env.TEST_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log('ERROR', err));
};

//sendMessage();

module.exports = { sendMessage };
