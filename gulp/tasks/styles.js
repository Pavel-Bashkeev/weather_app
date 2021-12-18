import {
	dest,
	src,
	watch,
} from 'gulp';
import sassGulp from 'gulp-sass';
import sassCompiler from 'sass';
import autoPrefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import gcmq from 'gulp-group-css-media-queries';
import gulpRename from 'gulp-rename';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import config from '../config';

const scss = sassGulp(sassCompiler);

export const stylesBuild = () => (
	src(`${config.src.scss}/main.scss`, { sourcemaps: config.isDev })
	.pipe(scss({
		includePaths: ['./node_modules'],
	}))
	.pipe(gulpif(config.isProd, gcmq()))
	.pipe(gulpif(config.isProd, autoPrefixer({
		overrideBrowserslist: ['last 10 versions'],
		grid: true,
	})))
	.pipe(gulpif(config.isProd, cleanCss({
		level: {
			1: {
				specialComments: 0,
			},
		},
	})))
	.pipe(gulpRename({
    suffix: '.min',
  }))
	.pipe(dest(`${config.dest.css}`, { sourcemaps: config.isDev }))
	.pipe(browserSync.stream())
);

export const stylesWatch = () => watch(`${config.src.scss}/**/*.scss`, stylesBuild);