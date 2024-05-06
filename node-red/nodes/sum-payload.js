module.exports = function(RED) {
	function SumPayloadNode(config) {
		RED.nodes.createNode(this, config);
		this.on('input', msg => {
			const sum = msg.payload.reduce((a, b) => a + b, 0);
			console.log(`SumPayloadNode: ${msg.payload} => ${sum}`);
			msg.payload = sum;
			this.send(msg);
		});
	}
	RED.nodes.registerType('sum-payload', SumPayloadNode);
};
