# Projektziele - swahh.com

## Vision
Ein modernes Videoportal ähnlich Netflix, jedoch mit minimalen Infrastrukturkosten durch die Trennung von Steuerung, Speicher und Rechenleistung.

## Kern-Architektur Konzept
1. **Kleiner Control Server (2-4 CPU, 4-8 GB RAM):** Zuständig NUR für Benutzeranmeldung, API-Gateway, Routing, Zahlungen, Rechte und Metadaten (PostgreSQL). Speichert keine Mediendateien.
2. **IDrive e2 (Hauptspeicher):** Das Speicherzentrum (99% aller Speicheraufgaben). Speichert Videos (Originale, HLS, MP4), Projektdateien, App-Dateien, Modell-Dateien, RAG-Daten, Memory, Logs, Backups, Releases, Rollbacks, Screenshots, Benchmarks und Artefakte.
3. **Salad.com (Compute Layer):** Ein minimales, zustandsloses Rechenzentrum nur fuer echte Rechenarbeit: KI-Inferenz, Coding-Agent-Aufgaben, Tests, Browserpruefung, Indexierung, Worker-Jobs und Videoverarbeitung (Transcoding zu HLS, Thumbnails). Holt Daten aus IDrive e2, verarbeitet sie und speichert Ergebnisse sofort wieder dort ab.

## Kern-Workflows
- **Video-Upload:** Benutzer lädt direkt nach IDrive e2 hoch (Control Server wird umgangen).
- **Video-Verarbeitung:** Salad Worker erkennt Upload -> verarbeitet Video zu HLS/Thumbnails -> speichert zurück in IDrive e2.
- **Streaming:** Benutzer <- CDN <- IDrive e2 (Kein Videostreaming über den Hauptserver).

## Infrastruktur-Prinzip
- **IDrive e2 zuerst:** Neue persistente Datenklassen werden standardmaessig in IDrive e2 geplant, nicht auf dem Control Server oder Salad.
- **Salad nur fuer Compute:** Salad darf keine dauerhafte Quelle der Wahrheit werden. Worker sind kurzlebig, zustandslos und schreiben Resultate nach IDrive e2 zurueck.
- **Control Server minimal halten:** Der klassische Server bleibt ein kleiner Kontroll-Router fuer Auth, API-Gateway, Routing, Zahlungen, Rechte und Metadaten. Er speichert keine grossen Dateien, Artefakte oder Logs dauerhaft.
