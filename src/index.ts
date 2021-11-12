import * as vm from "vm"
import * as ts from "typescript"
import {Manifest} from "./manifest";
export * from "./manifest"


const VM = vm.createContext({
    exports: module.exports
})

export function transpile(source: string | Buffer): Manifest.Json {
    const sourceFileContent = isString(source)
        ? source
        : source.toString()

    const transpiledSourceFile = ts.transpileModule(sourceFileContent, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS
        }
    })

    const manifestObjectOrUnknown = vm.runInContext(transpiledSourceFile.outputText, VM) as unknown

    if (!isManifestObject(manifestObjectOrUnknown)) {
        throw new Error("read file could not transpile to manifest.json")
    }

    return manifestObjectOrUnknown
}

export function toString(manifest: Manifest.Json, format: boolean = true): string {
    const indentSpaceSize = format ? 2 : 0
    return JSON.stringify(manifest, null, indentSpaceSize)
}

function isManifestObject(obj: any): obj is Manifest.Json {
    return obj.manifest_version != null && obj.name != null && obj.version != null
}

function isString(str: any): str is string {
    return typeof str === "string"
}