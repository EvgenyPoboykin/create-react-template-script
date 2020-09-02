const fs = require('fs');
const packageJson = require('../package.json');
const { index, component, style, logic } = require('./templates');

const CreateLogic = (logicString, logicJS, name) => {
    // create component logic.js from template component
    if (logicString === 'l') {
        fs.writeFileSync(logicJS, logic(name), (err) => {});
    }
};

const Created = (logic, folder, indexJS, componentJS, logicJS, styleJS, lib, name, format) => {
    //make a dir and name
    fs.mkdirSync(folder);

    // create index.js from template index
    fs.writeFile(indexJS, index(name), (err) => {});

    // create component logic.js from template component
    CreateLogic(logic, logicJS, name);

    // create component Name.js from template component
    fs.writeFile(componentJS, component(name, logic, format), (err) => {});

    // create styles style.js from template style
    fs.writeFile(styleJS, style(name), (err) => {});

    // add component to components/index.js
    fs.readFile(lib, 'utf8', (err, content) => {
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
};

const MakeDir = (lib) => {
    fs.writeFile(lib, '', (err) => {});
};

const CheckIndexJS = (components, logic, folder, indexJS, componentJS, logicJS, styleJS, lib, name, format) => {
    fs.readFile(lib, 'utf-8', (err, content) => {
        if (content !== undefined) {
            Created(logic, folder, indexJS, componentJS, logicJS, styleJS, lib, name, format);
        } else {
            MakeDir(lib);
            Created(logic, folder, indexJS, componentJS, logicJS, styleJS, lib, name, format);
        }
    });
};

const CreateTemplate = (args) => {
    const name = args[0];
    const logic = args[1] !== undefined && args[1] === 'tsx' ? '' : args[1];
    const format = (args[2] === undefined && args[1] === 'tsx') || (args[2] !== undefined && args[2] === 'tsx') ? 'tsx' : 'js';

    // folder components path from package.json
    const components = packageJson.create_components_path;
    const folder = `${packageJson.create_components_path}${name}`;
    const indexJS = `${packageJson.create_components_path}${name}/index.${format}`;
    const componentJS = `${packageJson.create_components_path}${name}/${name}.${format}`;
    const logicJS = `${packageJson.create_components_path}${name}/logic.${format}`;
    const styleJS = `${packageJson.create_components_path}${name}/style.${format}`;
    const lib = `${packageJson.create_components_path}index.${format}`;

    if (!fs.existsSync(components)) {
        fs.mkdirSync(components);
        CheckIndexJS(components, logic, folder, indexJS, componentJS, logicJS, styleJS, lib, name, format);
    } else {
        CheckIndexJS(components, logic, folder, indexJS, componentJS, logicJS, styleJS, lib, name, format);
    }

    console.log('\x1b[32m', `New Component ${args[0]} Created!`);
};

module.exports = CreateTemplate;
