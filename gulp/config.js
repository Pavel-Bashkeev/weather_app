const srcPath = 'src';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
		scss: `${srcPath}/scss`,
    js: `${srcPath}/js`,
		fonts: `${srcPath}/fonts`,
		assets: `${srcPath}/assets`,
		imgSrc: `${srcPath}/images`,
		imgIcons: `${srcPath}/images/icons`,
		pug: `${srcPath}/pug`,
	},
	dest: {
		root: destPath,
		html: destPath,
		css: `${destPath}/css`,
    js: `${destPath}/js`,
		fonts: `${destPath}/fonts`,
		assets: `${destPath}/assets`,
		imgDest: `${destPath}/images`,
		imgIcons: `${destPath}/images/icons`,
	},
	setEnv() {
		this.isProd = process.argv.includes('--prod');
		this.isDev = !this.isProd;
	},
};

export default config;