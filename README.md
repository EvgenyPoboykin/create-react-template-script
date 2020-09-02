This project was React (with used styled-component and React Hooks)

## Available Scripts

1. Copy template folder in a root directory of your project.

2. Add path of "components" directory in package.json - .

```json
"create_components_path": "./your/components/path/directory/",
```

3. Add scripts in package.json.
   cc = create-component
   rc = remove-component

   nameComponent = name component, createLogicFile ( "l" ) - create logic file for component, formatFiles (default ".js") - if you using TS - "tsx"

```json
"cc": "node template/cc.js ${nameComponent} ${createLogicFile} ${formatFiles}",
"rc": "node template/rc.js ${nameComponent}"
```

4. Usage

Create Component

```bash
npm run cc AppComponent
```

Remove Component

```bash
npm run rc AppComponent
```

### Advanced Configuration

All template string save in template/templates.js
