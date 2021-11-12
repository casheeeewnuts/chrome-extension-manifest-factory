import * as ManifestFactory from "../src"

describe("ManifestFactory", () => {
    describe("read()", () => {
        it("should return object as Manifest.Json", () => {
            const manifest = ManifestFactory.read(`${__dirname}/manifest.json.ts`)

            expect(manifest.manifest_version).toBeDefined()
            expect(manifest.name).toBeDefined()
            expect(manifest.version).toBeDefined()
            expect(manifest).toMatchSnapshot(`${__dirname}/manifest.json.snapshot`)
        })

        it('must throw Error for invalid manifest file', () => {
            expect(() => {
                ManifestFactory.read(`${__dirname}/invalid.manifest.json.ts`)
            }).toThrow()
        });
    })
})