import * as fs from "fs"
import * as ManifestFactory from "./index"

const {argv} = process
const manifestJson = ManifestFactory.toFormattedString(ManifestFactory.read(argv[2]))
fs.writeFileSync(argv[3], manifestJson)