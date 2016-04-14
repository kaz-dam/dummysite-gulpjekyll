module.exports = function() {
	var config = {

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
		everyjs: './src/assets/js/**/*.js'
		cleanjs: './serve/assets/js/**/*.js'

	};

	return config;
};