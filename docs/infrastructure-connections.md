# swahh.com Infrastruktur-Verbindungen

## Dienste
- **GitHub:** `swahhVideo/swahh-com-app` ist das Quellcode-Repository.
- **Spaceship:** `swahh.com` verwaltet DNS und Domain-Konfiguration.
- **IDrive e2:** S3-kompatibler Speicher fuer Medien, Artefakte, Backups und Logs.
- **Salad:** Zustandsloser Compute-Layer fuer Transcoding, Thumbnails, Indexierung und Worker-Jobs.

## Aktueller externer Stand
- **IDrive e2 Region:** `us-west-2`, Endpoint `s3.us-west-2.idrivee2.com`.
- **IDrive e2 Buckets:** `swahh-media` und `swahh-private`.
- **IDrive e2 Access Key:** `swahh-runtime-20260701` wurde erstellt. Der Secret Key wird nicht in diesem Repository gespeichert.
- **Spaceship DNS:** `cdn.swahh.com` und `uploads.swahh.com` sind CNAMEs auf `s3.us-west-2.idrivee2.com`.
- **Salad:** Organisation `swahhvideo`, Projekt `default`. Container-Gruppe `swahh-transcoder` ist als Zielname vorbereitet, braucht aber noch ein konkretes Container-Image.

## Geplante DNS-Zonen
- `swahh.com` zeigt auf die Web-App.
- `api.swahh.com` zeigt auf den kleinen Control Server.
- `cdn.swahh.com` zeigt auf den IDrive-e2-Auslieferungspunkt.
- `uploads.swahh.com` kapselt direkte Uploads in IDrive e2.
- `workers.swahh.com` kann spaeter Status- oder Callback-Endpunkte fuer Salad kapseln.

## Runtime-Konfiguration
Der Control Server prueft seine Integrationskonfiguration ueber:

```text
GET /infrastructure/status
```

Der Endpunkt gibt nur zurueck, ob Variablen gesetzt sind. Werte fuer API-Keys oder Secret Keys werden nicht ausgegeben.

## Setup-Reihenfolge
1. GitHub-Repository mit dem lokalen Projektstand befuellen.
2. IDrive-e2-Buckets `swahh-media` und `swahh-private` anlegen. Erledigt am 2026-07-01.
3. Spaceship-DNS fuer `cdn` und `uploads` auf IDrive e2 setzen. Erledigt am 2026-07-01.
4. Salad-Organisation `swahhvideo` nutzen und Container-Gruppe `swahh-transcoder` anlegen, sobald das Worker-Image feststeht.
5. Produktionsumgebung mit den Variablen aus `.env.example` konfigurieren.
