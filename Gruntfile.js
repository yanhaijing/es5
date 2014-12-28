module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		manifest: {
			index: {
                options: {
                    basePath: './',
                    cache: [],
                    network: ['*'],
                    fallback: [],
                    exclude: ['js/baidu.js'],
                    preferOnline: false,
                    verbose: true,
                    timestamp: true
                },
                src: [
                    'js/*.js',
                    'css/*.css',
                    'img/*'
                ],
                dest: 'index.manifest'
			}
		}
	});

	// 加载包含 'uglify' 任务的插件。
	grunt.loadNpmTasks('grunt-manifest');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['manifest']);
};