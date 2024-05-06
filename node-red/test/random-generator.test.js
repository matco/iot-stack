const assert = require('assert');
const helper = require('node-red-node-test-helper');
const randomGenerator = require('../nodes/random-generator.js');

describe('random-generator node', function() {
	this.timeout(10000); //increase timeout to let the random-generator node generate a payload

	beforeEach(function(done) {
		helper.startServer(done);
	});

	afterEach(function(done) {
		helper.unload();
		helper.stopServer(done);
	});

	it('should be loaded', function(done) {
		const flow = [{id: 'n1', type: 'random-generator', name: 'Random generator'}];
		helper.load(randomGenerator, flow, function() {
			const n1 = helper.getNode('n1');
			n1.should.have.property('name', 'Random generator');
			done();
		});
	});

	it('should generate a payload containing random numbers', function(done) {
		const flow = [
			{id: 'n1', type: 'random-generator', name: 'Random generator', wires: [['n2']]},
			{id: 'n2', type: 'helper'}
		];
		helper.load(randomGenerator, flow, function() {
			const n1 = helper.getNode('n1');
			const n2 = helper.getNode('n2');
			n2.on('input', function(msg) {
				assert.ok(Array.isArray(msg.payload));
				assert.equal(msg.payload.length, 5);
				done();
			});
			n1.receive({payload: ''}); //trigger the 'n1' node to generate output
		});
	});
});
