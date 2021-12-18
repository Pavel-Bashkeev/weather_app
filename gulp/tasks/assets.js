import { dest, src, watch } from 'gulp';
import config from '../config';

export const assetsBuild = () => (
	src(`${config.src.assets}/**/*`)
	.pipe(dest(`${config.dest.assets}`))
);

export const assetsWatch = () => watch(`${config.src.assets}/**/*`, assetsBuild);