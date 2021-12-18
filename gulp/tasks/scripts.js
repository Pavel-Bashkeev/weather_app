import { dest, watch } from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import gulpRename from 'gulp-rename';
import config from '../config';

export const scriptsBuild = () => (
	browserify(`${config.src.js}/main.js`, { debug: true })
	.transform('babelify', {
		presets: ['@babel/preset-env'],
	})
	.bundle()
	.on('error', function browerifyError(error) {
		console.log(error.stack);
		this.emit('end');
	})
	.pipe(source('main.js'))
	.pipe(buffer())
	.pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
	.pipe(gulpif(config.isProd, uglify()))
	.pipe(gulpif(config.isDev, sourcemaps.write()))
	.pipe(gulpRename({
    suffix: '.min',
  }))
	.pipe(dest(config.dest.js))
	.pipe(browserSync.stream())
);

export const scriptsWatch = () => watch(`${config.src.js}/**/*.js`, scriptsBuild);