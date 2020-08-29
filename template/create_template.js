const fs = require('fs');
const packageJson = require('../package.json');
const { index, component, style } = require('./templates');

const CreateTemplate = (name) => {
    // folder components path from package.json
    let folder = `${packageJson.create_components_path}${name}`;
    let indexJS = `${packageJson.create_components_path}${name}/index.js`;
    let componentJS = `${packageJson.create_components_path}${name}/${name}.js`;
    let styleJS = `${packageJson.create_components_path}${name}/style.js`;
    let lib = `${packageJson.create_components_path}index.js`;

    // make a dir and name
    fs.mkdirSync(folder);

    // create index.js from template index
    fs.writeFile(indexJS, index(name), (err) => {});

    // create component Name.js from template component
    fs.writeFile(componentJS, component(name), (err) => {});

    // create styles style.js from template style
    fs.writeFile(styleJS, style(name), (err) => {});

    // add component to components/index.js
    fs.readFile(`${packageJson.create_components_path}index.js`, 'utf8', (err, content) => {
        let inputContent = content.replace(/\s/g, '');

        // if inputContent not ''
        if (inputContent !== '') {
            // find all imports
            let imp = content.split('export {')[0];
            // find all exports
            let exp = content.split('export {')[1].split('}')[0];
            // clean export string , replace ''
            let cleanExp = exp.replace(/\s/g, '').split(',');
            // join cleanExp and name
            let newExp = [cleanExp.join(', '), name].join(', ');
            // new import
            let contentImp = `${imp}import ${name} from './${name}';`;
            // new export
            let contentExp = `export { ${newExp} };`;
            // new content components/index.js
            let newContent = [contentImp, contentExp].join('\n');
            // write content components/index.js
            fs.writeFile(lib, newContent, (err) => {});
        } else {
            let newContent = [`import ${name} from './${name}';`, `export { ${name} };`].join('\n');
            fs.writeFile(lib, newContent, (err) => {});
        }
    });

    console.log('\x1b[32m', `New Component ${name} Created!`);
};

module.exports = CreateTemplate;
