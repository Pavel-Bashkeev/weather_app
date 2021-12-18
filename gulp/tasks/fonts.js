import {
	dest,
	src,
	watch,
} from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../config';

export const fontsBuild = () => {
	src(`${config.src.fonts}/**/*.ttf`)
	.pipe(dest(`${config.dest.fonts}`))
	.pipe(ttf2woff())
	.pipe(dest(`${config.dest.fonts}`));
	return src(`${config.src.fonts}/**/*.ttf`)
	.pipe(ttf2woff2())
	.pipe(dest(`${config.dest.fonts}`));
};

export const fontsWatch = () => watch(`${config.src.fonts}`, fontsBuild);