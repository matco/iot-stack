module.exports = function(RED) {
	function CountConfigNode(n) {
		RED.nodes.createNode(this, n);
		this.count = n.count;
	}
	RED.nodes.registerType('count-config', CountConfigNode);
};
