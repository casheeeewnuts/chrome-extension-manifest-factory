import * as fs from "fs"
import * as ManifestFactory from "./index"

const {argv} = process
const manifestJson = ManifestFactory.toString(ManifestFactory.transpile(argv[2]))
fs.writeFileSync(argv[3], manifestJson)