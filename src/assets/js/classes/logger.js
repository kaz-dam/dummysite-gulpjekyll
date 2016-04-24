var myobject = require('./Myobject');

myobject.prototype.logger = function() {
	console.log('Log from the logger.js');
};

module.exports = myobject;