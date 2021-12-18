import {
	src
} from 'gulp';
import {
	htmlValidator
} from 'gulp-w3c-html-validator';
import config from '../config';

export const validHtml = () => (
	src(`${config.dest.html}/*.html`)
	.pipe(htmlValidator.analyzer())
	.pipe(htmlValidator.reporter())
)