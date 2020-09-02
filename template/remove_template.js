const fs = require('fs');
const packageJson = require('../package.json');

const RemoveTemplate = (name) => {
    let format = 'tsx';
    let removeComponent = `${packageJson.create_components_path}${name}`;
    let lib = `${packageJson.create_components_path}index.${format}`;

    fs.rmdirSync(removeComponent, { recursive: true });

    fs.readFile(lib, 'utf8', (err, content) => {
        // find all exports
        let exp = content.split('export {')[1].split('}')[0];

        let prebuildExp = exp.split(name).join('\n').replace(/\s/g, '');

        if (prebuildExp !== '') {
            // find all imports
            let imp = content.split('export {')[0];

            let cleanExp = prebuildExp.replace(/\s/g, '').split(',');

            let withoutName = imp.split(`import ${name} from './${name}';`);

            let cleanImp = withoutName.join().split('\n');

            let newImp = [];
            let newExp = [];

            for (let i = 0; i < cleanExp.length; i++) {
                if (cleanExp[i] !== '' && cleanExp[i] !== ',') {
                    newExp.push(cleanExp[i]);
                }
            }

            for (let i = 0; i < cleanImp.length; i++) {
                if (cleanImp[i] !== '' && cleanImp[i] !== ',') {
                    newImp.push(cleanImp[i]);
                }
            }

            let ImportData = newImp.join('\n');

            let ExportData = newExp.join(', ');
            // new content components/index.js
            let newContent = [ImportData, `export { ${ExportData} };`].join('\n');
            // write content components/index.js
            fs.writeFile(lib, newContent, (err) => {});
        } else {
            fs.writeFile(lib, '', (err) => {});
        }
    });

    console.log('\x1b[32m', `Component ${name} Removed!`);
};

module.exports = RemoveTemplate;
