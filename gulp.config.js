module.exports = function() {
	var config = {

		defaultPort: 8080,

		build: './serve/',
		buildFonts: './serve/assets/fonts/',
		fonts: './src/assets/fonts/*.css',
		images: './src/assets/images/*.jpg',
		buildImages: './serve/assets/images/',

		/****
		* html
		*****/
		htmlBuild: './serve/**/*.html',

		/****
		* Style
		*****/
		styleCompiler: 'Sass', // todo sass or less
		style: './src/assets/style/main.scss',
		buildStyle: './serve/assets/style/',

		/****
		* js
		*****/
		everyjs: './src/assets/js/**/*.js',
		cleanjs: './serve/assets/js/**/*.js',

		/****
		* bower and npm
		*****/
		index: './serve/index.html',
		bower: {
			json: require('./bower.json'),
			components: './bower_components/',
			ignorePath: '../..'
		}

	};

	///////////////////////

	config.wiredepOptions = function() {
		var options = {
			bowerJson: config.bower.json,
			componentSrc: config.bower.components,
			ignorePath: config.bower.ignorePath
		};
		return options;
	};

	return config;
};