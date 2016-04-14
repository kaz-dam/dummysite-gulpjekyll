module.exports = function() {
	var config = {
		styleCompiler: 'Sass', // todo sass or less
		style: './src/assets/style/main.scss',
		buildStyle: './serve/assets/style/'
	};

	return config;
};