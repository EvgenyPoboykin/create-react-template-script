## create-react-component-script

This script for Create/Remove React Component.

### In templates use dependencies
styled-component

### Available Scripts

1. Copy template folder in a root directory of your project.

2. Add path of "components" directory in package.json.

```json
"create_components_path": "./your/components/path/directory/",
```

3. Add scripts in package.json.
   cc = create-component
   rc = remove-component

```json
"cc": "node template/cc.js ${nameComponent}",
"rc": "node template/rc.js ${nameComponent}"
```

### Use Script

Create Component

```bash
npm run cc AppComponent
```

Remove Component

```bash
npm run rc AppComponent
```

### Template

All template string save in template/templates.js

index.js
```javascript
import nameComponent from './nameComponent';
export default nameComponent;
```

nameComponent.js
```javascript
import React, { memo } from 'react';
import { Container } from './style';
    
const nameComponent = memo(() => {
    return <Container></Container>;
});
    
export default nameComponent;
```

style.js
```javascript
import styled from 'styled-components';

export const Container = styled.div.attrs({ className: 'nameComponent__container" })``;
```
