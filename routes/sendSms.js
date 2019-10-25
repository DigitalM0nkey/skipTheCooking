require('dotenv').config();

const server = require('../server.js');
const { Client } = require('pg');
const dbParams = require('../lib/db');
const db = new Client(dbParams);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const orderReceivedMessageStore = (orderId) => {
  return `Order #${orderId} Received.🍽️ GET COOKING 🍳`;
};

const orderReceivedMessageClient = (cookTime) => {
  return `SkipTheCooking thanks you for your order from 🥧s & 🍟s.Your order will be ready in ⏱ ${cookTime} minutes.`;
};

const sendMessage = function(message, phoneNumber) {

  client.messages
    .create({
      body: message,
      from: process.env.DEV_OUTGOING_PHONE_NUMBER,
      to: phoneNumber ? phoneNumber : process.env.TEST_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log('ERROR', err));
};

module.exports = { sendMessage, orderReceivedMessageStore, orderReceivedMessageClient };
