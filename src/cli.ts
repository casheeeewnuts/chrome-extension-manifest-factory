import * as ManifestFactory from "./index"

const {argv} = process
ManifestFactory.write(argv[3], ManifestFactory.read(argv[2]))