require('dotenv').config();

const server = require('../server.js');
const { Client } = require('pg');
const dbParams = require('../lib/db');
const db = new Client(dbParams);

const accountSid = process.env.DEV_TWILIO_ACCOUNT_SID;
const authToken = process.env.DEV_TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const orderReceivedMessageStore = (orderId) => {
  return `Order #${orderId} Received.🍽️ GET COOKING 🍳`;
};

const orderReceivedMessageClient = (cookTime) => {
  console.log("COOKTIME:", cookTime);

  return `SkipTheCooking thanks you for your order from 🥧s & 🍟s.Your order will be ready in ⏱ ${cookTime} minutes.`;
};



const sendMessage = function(message) {
  console.log("SMS MESSAGE: ", message);

  client.messages
    .create({
      body: message,
      from: process.env.DEV_OUTGOING_PHONE_NUMBER,
      to: process.env.TEST_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log('ERROR', err));
};

//sendMessage();

module.exports = { sendMessage, orderReceivedMessageStore, orderReceivedMessageClient };
