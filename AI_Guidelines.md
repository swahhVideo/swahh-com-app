# AI Coding Guidelines für swahh.com

## 1. Architektur & Struktur
- **Modularität zuerst:** Der Code muss strikt modular aufgebaut sein. Keine monolithischen Strukturen. Teile das Projekt in unabhängige Module/Crates/Komponenten.
- **Unix-Philosophie:** Jede Code-Datei darf nur EINE spezifische Aufgabe erfüllen (Single Responsibility Principle). Keine "God Objects".
- **Längenbegrenzung:** Eine Datei darf maximal 800 Zeilen Code umfassen. Sobald diese Grenze erreicht oder absehbar ist, musst du den Code refaktorieren, aufteilen und in eine saubere Ordnerstruktur auslagern.
- **Zustandslosigkeit:** Der Salad.com Worker-Layer und der Compute-Layer müssen absolut zustandslos (stateless) sein. Daten werden ausschließlich aus IDrive e2 gelesen und dorthin zurückgeschrieben.

## 2. Code-Qualität & Sicherheit
- Schreibe sauberen, lesbaren und gut dokumentierten Code.
- Verwende sichere Programmierpraktiken. Vermeide unsichere Abkürzungen (wie 'unsafe' in Rust oder unvalidierte Any-Typen in TypeScript), es sei denn, es ist explizit abgesprochen.
- Erstelle für jede neue Kernfunktion automatische Unit-Tests.

## 3. Workflow-Anweisungen für die KI
- Bevor du Code änderst oder hinzufügst, lies immer diese Datei (`AI_Guidelines.md`) und die `Memory_Bank.md`.
- Nach JEDER erfolgreichen Implementierung oder Fehlerbehebung musst du die `Memory_Bank.md` aktualisieren und dort zusammenfassen, was geändert wurde, warum es geändert wurde und wie der aktuelle Zustand ist.
