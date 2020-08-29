const index = (name) => {
    return [`import ${name} from './${name}';`, `export default ${name};`].join('\n');
};

const component = (name) => {
    return [`import React, { memo } from 'react';`, `import { Container } from './style';`, '', `const ${name} = memo(() => {`, `    return <Container></Container>;`, `});`, `export default ${name};`].join('\n');
};

const style = (name) => {
    return [`import styled from 'styled-components';`, '', 'export const Container = styled.div.attrs({ className: "' + name + '__container" })' + '``;'].join('\n');
};

module.exports = { index, component, style };
