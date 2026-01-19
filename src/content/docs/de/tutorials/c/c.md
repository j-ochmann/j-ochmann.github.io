---
title: C-Abzieher
content_hash: 8dae22faf08ddbd9b155931bf4aeebbd
translation_status: translated
source_hash: 8dae22faf08ddbd9b155931bf4aeebbd
translated_from: cs
---
## 1️⃣ Installieren Sie den C-Compiler (gcc)

Öffnen Sie ein Terminal und geben Sie Folgendes ein:

„Bash
Sudo apt-Update
Sudo apt install build-essential
„

Das Build-Essential-Paket beinhaltet:

- gcc (C-Compiler)
- Make-up
- Basisbibliotheken und Header
  
Überprüfen Sie:

„Bash
gcc --version
„

## 2️⃣ Erstellen Sie die Quelldatei

Zum Beispiel die Datei hello_world.c:

„Bash
nano hello_world.c
„

Schreiben Sie darin:
<!-- Datei: hello_world.c -->
„c
#include <stdio.h>

int main(void) {
    printf("Hallo Welt!\n");
    0 zurückgeben;
}
„

Speichern:

- Strg + O
- Treten Sie ein
- Strg + X
  
## 3️⃣ Übersetzen Sie das Programm

Führen Sie im selben Verzeichnis Folgendes aus:

„Bash
gcc hello_world.c -o hello_world
„

Was ist passiert:

- hello_world.c → Quellbuch
- -o hello_world → die resultierende ausführbare hello_world-Datei

Überprüfen Sie:

„Bash
ls
„

Es sollte eine Datei hello_world geben

## 4️⃣ Starten Sie das Programm

„Bash
./hello_world
„

Ausgabe:

„Bash
Hallo Welt!
„

## 5️⃣ (Optional) Übersetzung mit Warnungen – empfohlen

Für die richtigen Gewohnheiten:

„Bash
gcc -Wall -Wextra -Werror hello_world.c -o hello_world
„

Dies zwingt Sie dazu, sauberen und sicheren C-Code zu schreiben.

## 6️⃣ Was es von Anfang an gut zu wissen gibt

- main gibt immer einen int zurück
- `return 0;` = Programm beendet OK
- „stdio.h“ ist die Standard-I/O-Bibliothek
- `./` weist die Shell an, „Datei aus dem aktuellen Verzeichnis auszuführen“

„Bash
nano read_number.c
„

<!-- Datei: read_number.c -->
„c
#include <stdio.h>
int main(void)
{
    int Zahl;
    printf("Ganzzahl eingeben: ");
    scanf("%d",&number);
    printf("Sie haben Folgendes eingegeben: %d\n", Zahl);
    0 zurückgeben;
}
„

## Empfohlene Projektstruktur

Wenn Sie Ihr Projekt professionell organisieren möchten, sieht das Standardlayout wie folgt aus:

„Text
Projekt/
├── docs/ # Hauptprojektdokumentation
│ ├── Tutorials/ # Tutorials in Form von .md-Dateien
│ └── examples_src/ # .md-Dateien, aus denen Sie Code generieren
├── Beispiele/ # Resultierende generierte .c-Dateien (Beispiele)
├── scripts/ # Skripte (Python/Bash), die die Generierung durchführen
├── extern/ # MD4C und andere Bibliotheken
├── src/ # Ihr Quellcode (.c, .cpp)
├── include/ # Ihre Header-Dateien (.h)
├── external/ # Externe Bibliotheken (z. B. md4c)
│ └── md4c/
│ ├── md4c.h
│ └── md4c.c
├── build/ # Ausgaben kompilieren (in Git ignorieren)
└── CMakeLists.txt # Build-Konfiguration
„

__*Hinweis:*__
>Verwenden Sie für Ordnernamen immer Kleinbuchstaben und Unterstriche oder Bindestriche anstelle von Leerzeichen.
>um Kompatibilitätsprobleme auf verschiedenen Betriebssystemen zu vermeiden.
