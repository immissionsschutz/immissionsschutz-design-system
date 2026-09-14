# @immissionsschutz/design-system

Geteiltes Design-System fuer interne Tools der `immissionsschutz`-Org
(aktuell: rhapp-frontend; perspektivisch rhpm-frontend und weitere).

## Design-Prinzipien

- **Nuechtern/praktisch statt verspielt.** Referenz sind SAP-artige
  Business-Oberflaechen, nicht bunte Consumer-Apps. Zielgruppe sind
  Gutachter als Experten-Nutzer, nicht Gelegenheitsnutzer - Dichte und
  Informationsgehalt gehen vor grosszuegigem Weissraum.
- **Flach statt schattiert/rund.** Flaechen grenzen sich primaer ueber
  Rahmen (`--farbe-rand`) ab, nicht ueber Drop-Shadows oder starke
  Rundungen. Keine Farbverlauf-Hintergruende.
- **Gedaempfte Blaugruen-Palette.** Akzentfarbe `#2b6e76`, siehe
  `src/tokens.css` fuer alle Werte. Farbverlauf-freie, flache Flaechen.
- **Nur Light-Theme.** Kein Dark Mode - kein bestehender Code in den
  internen Tools unterstuetzt das, kein bestaetigter Bedarf.
- **IBM Plex Sans** fuer Fliesstext/UI, **IBM Plex Mono** fuer Zahlen und
  Kennungen (z. B. `BE1Q1`, Emissionswerte) - tabellarische Ziffern statt
  variabler Breite, damit Spalten nicht "wandern".

## Inhalt

- `tokens.css` - alle Design-Tokens als CSS Custom Properties (Farben,
  Typografie, Radien, Schatten). Deutsche Variablennamen (`--farbe-*`,
  `--radius-*`, `--schatten-*`) fuer Rueckwaertskompatibilitaet zu
  bestehendem rhapp-frontend-Code, zusaetzlich englische Aliase
  (`--accent`, `--ok`, `--warn`, `--crit`, ...) 1:1 aus dem
  mock-validierten Referenz-Mock, fuer neuen/migrierten Code.
- `Button` - React-Komponente, Varianten `primary` / `secondary` / `ghost`.
- `Badge` - React-Komponente fuer ok/warn/crit-artige Status-Pills.
- `table.css` (`.ids-table`) - dichter Tabellen-Grundstil, passend zur in
  rhapp-frontend etablierten "Spaltenuebersicht"-Optik. Reine CSS-Klasse,
  keine React-Komponente (Tabelleninhalte bleiben projektspezifisch).

## Einbindung (Git-Dependency, bewusst kein npm-Registry-Setup)

Fuer die aktuelle Teamgroesse ist ein eigenes npm-Registry-Setup (GitHub
Packages o. ae.) unnoetiger Infrastruktur-Aufwand. Stattdessen referenzieren
Repos einen Tag/Commit direkt:

```json
{
  "dependencies": {
    "@immissionsschutz/design-system": "github:immissionsschutz/immissionsschutz-design-system#v1.0.0"
  }
}
```

`npm install` fuehrt beim Installieren automatisch `npm run build`
(`prepare`-Skript) aus und kompiliert TypeScript/CSS nach `dist/`.

Danach global einmal einbinden (z. B. in `main.tsx`):

```ts
import "@immissionsschutz/design-system/dist/tokens.css";
```

Komponenten und Tabellen-Grundstil bei Bedarf zusaetzlich:

```ts
import { Button, Badge } from "@immissionsschutz/design-system";
import "@immissionsschutz/design-system/dist/Button.css";
import "@immissionsschutz/design-system/dist/Badge.css";
import "@immissionsschutz/design-system/dist/table.css";
```

## Fonts

IBM Plex Sans/Mono werden von diesem Paket nicht automatisch geladen -
konsumierende Apps binden sie selbst ein (z. B. per Google-Fonts-Link in
`index.html`), damit jede App volle Kontrolle ueber Ladezeitpunkt/-strategie
behaelt.

## Neue Version veroeffentlichen

Da dies keine npm-Registry nutzt, ist "veroeffentlichen" gleichbedeutend mit
einem neuen Git-Tag:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

Konsumierende Repos aktualisieren dann den Tag in ihrer `package.json` und
fuehren `npm install` erneut aus.
