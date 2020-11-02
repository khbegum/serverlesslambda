'use strict';
const connectToDatabase = require('./db');
require('dotenv').config({ path: './variables.env' });
const Cart = require('./models/Cart');
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        Cart.create(JSON.parse(event.body))
        .then(cart => callback(null, {
          statusCode: 200,
          body: JSON.stringify(cart)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        Cart.findById(event.pathParameters.id)
        .then(cart => callback(null, {
          statusCode: 200,
          body: JSON.stringify(cart)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the Cart.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        Cart.find()
        .then(carts => callback(null, {
          statusCode: 200,
          body: JSON.stringify(carts)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the Carts.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        Cart.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(cart => callback(null, {
          statusCode: 200,
          body: JSON.stringify(cart)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the Carts.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
        Cart.findByIdAndRemove(event.pathParameters.id)
        .then(cart => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed note with id: ' + cart._id, cart: cart })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the Carts.'
        }));
    });
};