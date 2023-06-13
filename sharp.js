const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros/');
console.log(target);
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const imageName = image.split('.').slice(0, -1).join('.');

  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(
      path.resolve(__dirname, `${destination}/${imageName}-large.webp`),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );

  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(
      path.resolve(__dirname, `${destination}/${imageName}-large.png`),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );

  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(__dirname, `${destination}/${imageName}-small.webp`),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );

  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(__dirname, `${destination}/${imageName}-small.png`),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
});
