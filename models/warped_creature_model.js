/**
 * WarpedCreature model
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.1
 * @version  0.1.1
 */
var Warped = Function.inherits('Develry.Creatures.Model', function WarpedCreatureModel(acom) {
	return WarpedCreatureModel.super.call(this, acom, 'WarpedCreature');
});

/**
 * Set the model name
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.1
 * @version  0.1.1
 */
Warped.constitute(function addFields() {

	// The name of the creature
	this.addField('name');

	// The moniker of the creature
	this.addField('moniker');

	// The filename of the creature
	this.addField('filename');

	// The sender of the creature
	this.addField('sender');

	// The message the sender added
	this.addField('message');
});

/**
 * Load this record's file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.1
 * @version  0.1.1
 */
Warped.RecordClass.setMethod(function load(callback) {

	'use strict';

	if (this._loaded_file) {
		return callback();
	}

	let that = this;

	this._loaded_file = true;

	let filepath = libpath.resolve(acom.paths.warp_exports, this.filename);

	fs.readFile(filepath, function gotFile(err, buffer) {

		if (err) {
			return callback(err);
		}

		let exported = new Creatures.Export(capp);
		exported.processBuffer(buffer);

		that.export_instance = exported;
		callback(null);
	});
});

/**
 * Get the sender's name
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.1
 * @version  0.1.1
 */
Warped.RecordClass.setMethod(function getSenderName() {

	var transaction,
	    result;

	transaction = acom.babel.peerpin.findClaimTransaction('username', this.sender);

	if (transaction) {
		result = transaction.data.value;
	} else {
		result = this.sender;
	}

	if (result.length > 20) {
		result = result.slice(0, 20);
	}

	return result;
});