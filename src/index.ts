import * as fs from "fs/promises"

export async function _export(input: string, output: string) {
    const json = await import(input)
    console.log(json)
    await fs.writeFile(output, JSON.stringify(json, null, 2))
}

_export(`${__dirname}/json.ts`, "./manifest.json")