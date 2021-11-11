import * as fs from "fs"
import * as vm from "vm"
import * as ts from "typescript"
import {Manifest} from "./manifest";


const VM = vm.createContext({
    exports: module.exports
})

export function read(path: string): Manifest.Json {
    const sourceFileContent = fs.readFileSync(path).toString()
    const transpiledSourceFile = ts.transpileModule(sourceFileContent, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS
        }
    })

    const manifestObjectOrUnknown = vm.runInContext(transpiledSourceFile.outputText, VM) as unknown

    if (!isManifestObject(manifestObjectOrUnknown)) {
        throw new Error("read file could not transpile manifest.json")
    }

    return manifestObjectOrUnknown
}

export function write(output: string, manifest: Manifest.Json): void {
    fs.writeFileSync(output, JSON.stringify(manifest, null, 2))
}

function isManifestObject(obj: any): obj is Manifest.Json {
    return obj.manifest_version != null && obj.name != null && obj.version != null
}