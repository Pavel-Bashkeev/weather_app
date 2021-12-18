import {
	dest,
	src,
	watch,
} from 'gulp';
import imagemin from 'gulp-imagemin';
import webpConv from 'gulp-webp';
import changed from 'gulp-changed';

import config from '../config';

const copyImages = () => (
	src(`${config.src.imgSrc}/**/*.+(png|jpg|jpeg)`)
	.pipe(changed(`${config.dest.imgDest}`))
	.pipe(imagemin([
		imagemin.mozjpeg({
			quality: 95,
			progressive: true,
		}),
		imagemin.optipng({
			optimizationLevel: 2,
		}),
	]))
	.pipe(webpConv())
	.pipe(dest(`${config.dest.imgDest}`))
);

export const imagesBuild = copyImages;

export const imagesWatch = () => watch(`${config.src.imgSrc}/**/*`, {
	ignoreInitial: false,
}, imagesBuild);