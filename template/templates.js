const index = (name) => {
    return [`import ${name} from './${name}';`, `export default ${name};`].join('\n');
};

const component = (name, logic, format) => {
    if (logic === 'l' && format === 'tsx') {
        return [`import React, { memo } from 'react';`, `import ${name}_Logic from './logic';`, `import { Container } from './style';`, '', `const ${name}: React.FC = memo(() => {`, `    const [] = ${name}_Logic();`, `    return <Container></Container>;`, `});`, `export default ${name};`].join('\n');
    } else if (logic === 'l' && format === '') {
        return [`import React, { memo } from 'react';`, `import ${name}_Logic from './logic';`, `import { Container } from './style';`, '', `const ${name} = memo(() => {`, `    const [] = ${name}_Logic();`, `    return <Container></Container>;`, `});`, `export default ${name};`].join('\n');
    } else if (logic === '' && format === 'tsx') {
        return [`import React, { memo } from 'react';`, `import { Container } from './style';`, '', `const ${name}: React.FC = memo(() => {`, `    return <Container></Container>;`, `});`, `export default ${name};`].join('\n');
    }

    return [`import React, { memo } from 'react';`, `import { Container } from './style';`, '', `const ${name} = memo(() => {`, `    return <Container></Container>;`, `});`, `export default ${name};`].join('\n');
};

const style = (name) => {
    return [`import styled from 'styled-components';`, '', 'export const Container = styled.div.attrs({ className: "' + name + '__container" })' + '``;'].join('\n');
};

const logic = (name) => {
    return [`import { useCallback } from 'react';`, '', `const ${name}_Logic = () => {`, '   ', '   // Logic ${name} START', '', '    // Logic ${name} END', '', '    return [];', '};', '', `export default ${name}_Logic;`].join('\n');
};

module.exports = { index, component, style, logic };
