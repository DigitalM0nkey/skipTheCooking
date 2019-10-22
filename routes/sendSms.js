require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const orderReceivedMessage = `SkipTheCooking thanks you from you order from 🥧s & 🍟s. Your order will be ready in ⏱️25 minutes.`;


const sendMessage = function() {
  return client.messages
    .create({
      body: orderReceivedMessage,
      from: process.env.OUTGOING_PHONE_NUMBER,
      to: process.env.TEST_PHONE_NUMBER
    })
    .then((message) => console.log(message.sid))
    .catch(err => console.log('ERROR', err));
};

//sendMessage();

module.exports = { sendMessage };
