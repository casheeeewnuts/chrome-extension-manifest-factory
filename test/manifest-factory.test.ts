import * as ManifestFactory from "../src"
import * as fs from "fs"

describe("ManifestFactory", () => {
    describe("read()", () => {
        it("should return object as Manifest.Json", () => {
            const manifest = ManifestFactory.transpile(fs.readFileSync(`${__dirname}/manifest.json.ts`))

            expect(manifest.manifest_version).toBeDefined()
            expect(manifest.name).toBeDefined()
            expect(manifest.version).toBeDefined()
            expect(manifest).toMatchSnapshot(`${__dirname}/manifest.json.snapshot`)

            console.log(ManifestFactory.toString(manifest))
        })

        it('must throw Error for invalid manifest file', () => {
            expect(() => {
                ManifestFactory.transpile(`${__dirname}/invalid.manifest.json.ts`)
            }).toThrow()
        });
    })
})