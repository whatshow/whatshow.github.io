import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

const PNGImages = 'src/img/*.png';
const JPEGImages = 'src/img/*.jpg';
const output = 'src/img-min';


(async () => {
	await imagemin([JPEGImages], {
		destination: output,
		plugins: [
			imageminMozjpeg({quality: 70})
		]
	});

	console.log('Images optimized');
})();
