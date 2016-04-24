module.exports = function() {
	var serve = './serve/',
		src = './src/',
		tmp = './tmp/',
		buildStyle = serve + 'assets/style/',

		config = {

		defaultPort: 8080,

		build: serve,
		buildFonts: serve + 'assets/fonts/',
		fonts: src + 'assets/fonts/*.css',
		images: src + 'assets/images/*.jpg',
		buildImages: serve + 'assets/images/',
		templates: src + 'assets/templates/*.hbs',
		allFiles: [
			src + '**/*.md',
			src + '**/*.txt',
			src + '**/*.xml'
		],

		/****
		* html
		*****/
		htmlBuild: serve + '**/*.html',
		htmlSrc: src + '**/*.html',
		htmlHead: src + '_includes/',
		htmlDefault: src + '_layouts/',
		htmlForInject: [
			src + '_includes/head.html',
			src + '_layouts/default.html'
		],

		/****
		* Style
		*****/
		styleCompiler: 'Sass', // todo sass or less
		style: src + 'assets/style/main.scss',
		buildStyle: buildStyle,
		buildCss: buildStyle + '*.css',

		/****
		* js
		*****/
		everyjs: src + 'assets/js/**/*.js',
		cleanjs: serve + 'assets/js/**/*.js',
		jsClasses: src + 'assets/js/classes/',

		/****
		* bower and npm
		*****/
		index: serve + '**/index.html',
		bower: {
			json: require('./bower.json'),
			components: './bower_components/',
			ignorePath: '../..'
		},
		tmp: tmp,
		tmpIndex: tmp + 'index.html',
		tmpStyle: tmp + '**/main.css',
		tmpFiles: tmp + '**/*.*',
		srcTemp: src + 'temp/',
		srcTempFiles: src + 'temp/*.html'

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