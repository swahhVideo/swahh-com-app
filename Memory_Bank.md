# Memory Bank - swahh.com

## Aktueller Projektstatus
- **Phase:** Control-Server-Fundament, lokale Projektstruktur und Infrastruktur-Verbindungsrahmen.
- **Letzte Änderung:** IDrive e2 Region/Buckets/Access-Key angelegt, Spaceship-DNS fuer `cdn` und `uploads` gesetzt, Salad-Organisation erstellt, GitHub-Repository befuellt und lokale Infrastruktur-Konfiguration aktualisiert.
- **Nächster Schritt:** Worker-Container-Image fuer Salad definieren, `swahh-transcoder` als Container-Gruppe anlegen und echte Runtime-Secrets in der Deployment-Umgebung setzen.

## Bekannte Probleme / Offene Aufgaben
- [x] Minimaler Control-Server-Health-Check (`/health`) als erster Baustein.
- [x] Basis-Projektdokumentation, lokale Konfigurationsvorlage und Runtime-Config-Modul erstellt.
- [x] Gemeinsamer Infrastruktur-Status fuer GitHub, Spaceship, IDrive e2 und Salad.
- [x] IDrive e2 Region `us-west-2`, Buckets `swahh-media`/`swahh-private` und Access Key `swahh-runtime-20260701` erstellt.
- [x] Spaceship DNS fuer `cdn.swahh.com` und `uploads.swahh.com` auf `s3.us-west-2.idrivee2.com` gesetzt.
- [x] Salad-Organisation `swahhvideo` erstellt; Projekt `default` vorhanden.
- [x] GitHub-Repository `swahhVideo/swahh-com-app` mit Projektdateien befuellt.
- [ ] Ausbau des Control Servers für Auth und Metadaten.
- [ ] Integration der IDrive e2 API für direkten Client-Upload.
- [ ] Definition der Salad.com Worker-Inferenz für das Video-Transcoding.

## Architektur-Logbuch
- *2026-07-01:* GitHub-Repository `swahhVideo/swahh-com-app` ueber die bestehende Browser-Session mit README, Doku, Control-Server-Code, Config und Tests befuellt.
- *2026-07-01:* Externe Infrastruktur verbunden: IDrive e2 Region Los Angeles (`us-west-2`) aktiviert, Buckets `swahh-media` und `swahh-private` erstellt, Access Key `swahh-runtime-20260701` ohne Bucket-Loeschrecht angelegt. Spaceship DNS fuer `cdn.swahh.com` und `uploads.swahh.com` als CNAME auf `s3.us-west-2.idrivee2.com` gesetzt. Salad-Organisation `swahhvideo` erstellt und Credits/Zahlung uebersprungen; Projekt `default` ist verfuegbar.
- *2026-07-01:* Infrastruktur-Konfigurationsrahmen ergaenzt: `GET /infrastructure/status` prueft, ob die benoetigten Runtime-Variablen fuer App, GitHub, Spaceship, IDrive e2 und Salad gesetzt sind. Secrets werden nur als gesetzt/nicht gesetzt markiert und nie ausgegeben. `.env.example` und `docs/infrastructure-connections.md` dokumentieren die geplanten Verbindungen und DNS-Zonen.
- *2026-07-01:* Control-Server-Fundament ergaenzt: `README.md`, `.env.example`, `.gitignore` und `control-server/src/config/runtime-config.js`. Host/Port-Konfiguration ist jetzt ein eigenes Modul mit Unit-Tests. Lokale Artefakte, Logs, Screenshots und Benchmarks werden nicht versioniert; dauerhaft geplante Ablage bleibt IDrive e2.
- *2026-07-01:* Infrastruktur-Zielbild konkretisiert: IDrive e2 ist primaerer Speicher fuer Projektdateien, App-Dateien, Modell-Dateien, RAG-Daten, Memory, Logs, Backups, Releases, Rollbacks, Screenshots, Benchmarks und Artefakte. Salad.com wird nur fuer echte Rechenarbeit genutzt, z. B. KI-Inferenz, Coding-Agent-Aufgaben, Tests, Browserpruefung, Indexierung und Worker-Jobs. Der klassische Server bleibt so klein wie moeglich und dient nur als Kontroll-Router.
- *2026-07-01:* Health-Check-Baustein lokal verifiziert. Der Server bindet standardmäßig an `127.0.0.1`, damit lokale Tests kontrolliert und entwicklungsfreundlich laufen.
- *2026-07-01:* Erster Control-Server-Baustein umgesetzt: modularer Node.js HTTP-Server mit separater App-, Server- und Health-Route-Struktur. Der Baustein speichert keine Medien und dient nur zur Laufzeitprüfung des kleinen Control Servers.
- *2026-07-01:* Projekt mit strikten modularen Guidelines und Drei-Server-Architektur gestartet.
