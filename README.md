# swahh.com

Kostenoptimiertes Videoportal mit klarer Trennung zwischen Control Server, IDrive e2 Speicher und Salad.com Compute.

## Architektur

- **Control Server:** Kleiner Kontroll-Router fuer Auth, API, Zahlungen, Rechte, Routing und PostgreSQL-Metadaten.
- **IDrive e2:** Primaerer Speicher fuer Videos, App-Dateien, Modelle, RAG-Daten, Memory, Logs, Backups, Releases, Rollbacks, Screenshots, Benchmarks und Artefakte.
- **Salad.com:** Stateless Compute fuer echte Rechenarbeit wie Transcoding, KI-Inferenz, RAG, Tests, Browserpruefung, Indexierung und Worker-Jobs.

Der Control Server speichert keine Mediendateien und bleibt bewusst klein.

## Aktueller Stand

Der Control Server stellt einen Health-Check und einen sicheren Infrastruktur-Status bereit:

```http
GET /health
```

Antwort:

```json
{
  "status": "ok",
  "service": "control-server"
}
```

```http
GET /infrastructure/status
```

Der Infrastruktur-Status zeigt, ob GitHub, Spaceship DNS, IDrive e2 und Salad per Runtime-Konfiguration verbunden sind. Secret-Werte werden nicht ausgegeben.

## Lokales Testen

Voraussetzung: Node.js 20 oder neuer.

```bash
cd control-server
npm test
npm start
```

Dann den Health-Check aufrufen:

```bash
curl http://127.0.0.1:3000/health
```

## Konfiguration

Beispielwerte stehen in `.env.example`.

Aktuell genutzte Variablen:

- `CONTROL_SERVER_HOST`
- `CONTROL_SERVER_PORT`
- `NODE_ENV`

Die Variablen fuer GitHub, Spaceship, IDrive e2 und Salad.com sind in `.env.example` vorbereitet und ueber `/infrastructure/status` pruefbar.

Mehr Details stehen in `docs/infrastructure-connections.md`.
