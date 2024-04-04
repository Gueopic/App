const fs = require('fs');
const path = require('path');

const sourceProjectDir = path.join(__dirname, '..', 'src');
const sourceIconsDir = path.join(
  __dirname,
  '..',
  'node_modules',
  'ionicons',
  'dist',
  // 'ionicons',
  'svg',
);
const destinationIconsDir = path.join(__dirname, '..', 'www', 'svg');

function findAndExtractNames(directory) {
  const htmlFiles = findHTMLFiles(directory);
  const names = new Set();

  htmlFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(/<ion-icon[^>]*name *= *"[^"]*"/g);

    if (matches) {
      matches.forEach((match) => {
        const nameMatch = match.match(/name *= *"([^"]*)"/);
        if (nameMatch && nameMatch[1]) {
          names.add(nameMatch[1]);
        }
      });
    }
  });

  return Array.from(names);
}

function findHTMLFiles(directory) {
  const files = [];

  function traverse(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (file.endsWith('.html')) {
        files.push(fullPath);
      }
    });
  }

  traverse(directory);
  return files;
}

function copyIconsToAssetsSync(iconNames) {
  try {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destinationIconsDir)) {
      fs.mkdirSync(destinationIconsDir, { recursive: true });
    }

    // Read files in the source directory
    const files = fs.readdirSync(sourceIconsDir);

    // Filter files based on iconNames
    const filesToCopy = files.filter((file) =>
      iconNames.includes(path.parse(file).name),
    );

    // Copy files to destination directory
    filesToCopy.forEach((file) => {
      const sourceFile = path.join(sourceIconsDir, file);
      const destinationFile = path.join(destinationIconsDir, file);
      fs.copyFileSync(sourceFile, destinationFile);
      console.log(
        `Copied ${file} from ${sourceFile} to ${destinationIconsDir}`,
      );
    });

    console.log('Icons copied successfully!');
  } catch (err) {
    console.error('Error copying icons:', err);
  }
}

const names = findAndExtractNames(sourceProjectDir);
console.log('Icon names found:', names);

copyIconsToAssetsSync(names);
