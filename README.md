# Chrome Extension Manifest Factory
A tool for writing manifest.json of Chrome Extension with type completion

## Installation
```bash
npm i chrome-extension-manifest-factory
# or
yarn add chrome-extension-manifest-factory
```

## Examples
define your extension's manifest.json in .ts file,
```typescript
// manifest.json.ts
import {Manifest} from "chrome-extension-manifest-factory"

const json: Manifest.Json = {
  // required fields
  manifest_version: 3, // currently only v3 series are supported.
  name: "Your Chrome Extension Name",
  version: "1.0.0"
  
  // optional fields...
}

export default json
```

either in .js file,
```javascript
/**
 * @type {import("chrome-extension-manifest-factory").Manifest.Json}
 */
const json = {
    // required fields
    manifest_version: 3,
    name: "Your Chrome Extension Name",
    version: "1.0.0",
    
    // optional fields...
}

export default json
```

then, execute next command
```bash
npm run manifest-factory ./manifest.json.js manifest.json
# or
yarn run manifest-factory ./manifest.json.ts manifest.json
```


