module.exports = function(RED) {
	function RandomGenerator(config) {
		RED.nodes.createNode(this, config);
		const count = RED.nodes.getNode(config.count)?.count ?? 5;
		const interval = setInterval(() => {
			const payload = Array.from({length: count}, () => Math.round(Math.random() * 100));
			this.send({payload});
		}, 5000);

		this.on('close', function() {
			clearInterval(interval);
		});
	}
	RED.nodes.registerType('random-generator', RandomGenerator);
};
