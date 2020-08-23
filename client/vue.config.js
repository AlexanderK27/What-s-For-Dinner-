const path = require('path')

module.exports = {
	devServer: {
		proxy: {
			'api/': { target: 'http://localhost:3000' }
		}
	},
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type =>
			addStyleResource(config.module.rule('less').oneOf(type))
		)
	}
}

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [path.resolve(__dirname, './src/styles/imports.less')]
		})
}
