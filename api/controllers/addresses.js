'use strict';

var bitcore = require('bitcore');
var _ = bitcore.deps._;
var $ = bitcore.util.preconditions;
var Address = bitcore.Address;

var BitcoreNode = require('../../');

var Addresses = {};

var node;
Addresses.setNode = function(aNode) {
  node = aNode;
};


/*
 *  params
 */

/*
 * Finds an address' info by it's string representation
 */
Addresses.addressParam = function(req, res, next, address) {
  if (!Address.isValid(address)) {
    res.status(422);
    res.send('/v1/addresses/ parameter must be a valid bitcoin address');
    return;
  }
  req.address = new Address(address);
  next();
};


/*
 * controllers
 */


/**
 * Gets an address information
 */
Addresses.get = function(req, res) {
  $.checkState(req.address instanceof Address);
  node.getAddressInfo(req.address)
    .then(function(info) {
      res.send(info);
    });
};

/**
 * Gets an address utxos
 */
Addresses.utxos = function(req, res) {
  $.checkState(req.address instanceof Address);
  node.getUTXOs(req.address)
    .then(function(utxos) {
      res.send(utxos);
    });
};

module.exports = Addresses;
