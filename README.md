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

```json
"cc": "node template/cc.js ${nameComponent}",
"rc": "node template/rc.js ${nameComponent}"
```

## Use Script

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
