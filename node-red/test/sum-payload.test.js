const helper = require('node-red-node-test-helper');
const sumPayloadNode = require('../nodes/sum-payload.js');

describe('sum-payload node', function() {
	beforeEach(function(done) {
		helper.startServer(done);
	});

	afterEach(function(done) {
		helper.unload();
		helper.stopServer(done);
	});

	it('should be loaded', function(done) {
		const flow = [{id: 'n1', type: 'sum-payload', name: 'Sum payload'}];
		helper.load(sumPayloadNode, flow, function() {
			const n1 = helper.getNode('n1');
			n1.should.have.property('name', 'Sum payload');
			done();
		});
	});

	it('should sum the array of integers in the payload', function(done) {
		const flow = [
			{id: 'n1', type: 'sum-payload', name: 'Sum payload', wires: [['n2']]},
			{id: 'n2', type: 'helper'}
		];
		helper.load(sumPayloadNode, flow, function() {
			const n1 = helper.getNode('n1');
			const n2 = helper.getNode('n2');
			n2.on('input', function(msg) {
				msg.payload.should.equal(5);
				done();
			});
			n1.receive({payload: [2, 3]});
		});
	});
});
