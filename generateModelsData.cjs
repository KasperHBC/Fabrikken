// generateModelsData.cjs
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'assets', 'models');
const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const outputFile = path.join(__dirname, 'src', 'modelsData.js');

// Læs alle .glb filer i modelsDir
const modelFiles = fs.readdirSync(modelsDir).filter(file => /\.(glb|gltf)$/i.test(file));

let imports = '';
let modelsArrayStr = '[';

modelFiles.forEach((modelFile, index) => {
  const name = modelFile.replace(/\.(glb|gltf)$/i, '');
  const modelVariable = `model${index}`;
  const thumbnailVariable = `thumbnail${index}`;

  const modelSrc = `./assets/models/${modelFile}`;

  // Find tilhørende thumbnail
  const thumbnailName = `${name}-thumbnail`;
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  let thumbnailFile = '';

  for (let ext of imageExtensions) {
    const possibleThumbnail = `${thumbnailName}.${ext}`;
    if (fs.existsSync(path.join(imagesDir, possibleThumbnail))) {
      thumbnailFile = possibleThumbnail;
      break;
    }
  }

  if (!thumbnailFile) {
    console.warn(`Thumbnail for ${modelFile} ikke fundet.`);
  }

  const thumbnailSrc = thumbnailFile ? `./assets/images/${thumbnailFile}` : '';

  // Tilføj import statements
  imports += `import ${modelVariable} from '${modelSrc}';\n`;
  if (thumbnailSrc) {
    imports += `import ${thumbnailVariable} from '${thumbnailSrc}';\n`;
  } else {
    imports += `const ${thumbnailVariable} = '';\n`;
  }

  // Byg models array som en streng
  modelsArrayStr += `
  {
    name: '${name}',
    src: ${modelVariable},
    thumbnail: ${thumbnailVariable}
  },`;
});

modelsArrayStr += '\n]';

// Generer indhold til modelsData.js
const fileContent = `
// Denne fil er automatisk genereret af generateModelsData.cjs
${imports}

const models = ${modelsArrayStr};

export default models;
`;

// Skriv til modelsData.js
fs.writeFileSync(outputFile, fileContent, 'utf8');

console.log('modelsData.js er blevet opdateret.');
