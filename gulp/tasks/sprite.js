import { watch, src, dest } from "gulp";
import svgSprite from "gulp-svg-sprite";
import config from "../config";

export const spriteBuild = () => (
	src(`${config.src.imgIcons}/**/*.svg`)
	.pipe(svgSprite({
				 mode: {
								symbol: {
											 sprite: '../sprite.svg'
								}
				 },
				 shape: {
					 transform: [
						 {svgo: {
							 plugins:[
								{removeAttrs: ['fill', 'xmlns']}
							 ]
						 }}
					 ]
				 }
	}))
	.pipe(dest(`${config.dest.imgDest}`))
);

export const spriteWatch = () => watch(`${config.src.imgIcons}/**/*.svg`, spriteBuild);