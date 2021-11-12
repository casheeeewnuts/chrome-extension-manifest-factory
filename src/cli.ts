import * as fs from "fs"
import * as ManifestFactory from "./index"

const {argv} = process
const source = fs.readFileSync(argv[2])
const manifestJson = ManifestFactory.toString(ManifestFactory.transpile(source))
fs.writeFileSync(argv[3], manifestJson)