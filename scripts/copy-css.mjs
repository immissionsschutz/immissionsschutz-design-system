// Kopiert die .css-Dateien aus src/ unveraendert nach dist/, da tsc nur
// .ts/.tsx kompiliert. Bewusst ohne zusaetzliche Build-Tool-Abhaengigkeit
// (kein Bundler/Copy-Plugin) - dieses Paket wird als Git-Dependency
// eingebunden, ein "prepare"-Skript baut es beim Installieren neu.
import { cpSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = fileURLToPath(new URL("../src", import.meta.url));
const distDir = fileURLToPath(new URL("../dist", import.meta.url));

for (const datei of readdirSync(srcDir)) {
  if (datei.endsWith(".css")) {
    cpSync(join(srcDir, datei), join(distDir, datei));
  }
}
