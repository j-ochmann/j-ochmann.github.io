---
title: C Tahák
---

## 1️⃣ Nainstalujte C kompilátor (gcc)

Otevřete terminál a zadejte:

```bash
sudo apt update
sudo apt install build-essential
```

Balík build-essential obsahuje:

- gcc (C kompilátor)
- make
- základní knihovny a hlavičky
  
Ověřte:

```bash
gcc --version
```

## 2️⃣ Vytvořte zdrojový soubor

Např. soubor hello_world.c:

```bash
nano hello_world.c
```

Do něj napište:
<!-- file: hello_world.c -->
```c
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

Uložte:

- Ctrl + O
- Enter
- Ctrl + X
  
## 3️⃣ Přeložte program

V tom samém adresáři spusť:

```bash
gcc hello_world.c -o hello_world
```

Co se stalo:

- hello_world.c → zdroják
- -o hello_world → výsledný spustitelný soubor hello_world

Zkontrolujte:

```bash
ls
```

Měl by tam být soubor hello_world

## 4️⃣ Spusťte program

```bash
./hello_world
```

Výstup:

```bash
Hello, world!
```

## 5️⃣ (Volitelné) Překlad s varováními – doporučeno

Pro správné návyky:

```bash
gcc -Wall -Wextra -Werror hello_world.c -o hello_world
```

To Vás donutí psát čistý a bezpečný C kód.

## 6️⃣ Co je dobré vědět hned od začátku

- main vždy vrací int
- `return 0;` = program skončil OK
- `stdio.h` je standardní knihovna pro vstup/výstup
- `./` říká shellu „spusť soubor z aktuálního adresáře“

```bash
nano read_number.c
```

<!-- file: read_number.c -->
```c
#include <stdio.h>
int main (void)
{
    int cislo;
    printf("Zadejte cele cislo: ");
    scanf("%d",&cislo);
    printf("Zadal jste: %d\n", cislo);
    return 0;
}
```

## Doporučená struktura projektu

Pokud chcete mít projekt profesionálně organizovaný, standardní rozložení vypadá takto:

```text
projekt/
├── docs/                # Hlavní dokumentace projektu
│   ├── tutorials/       # Návody ve formě .md souborů
│   └── examples_src/    # .md soubory, ze kterých generujete kód
├── examples/            # Výsledné vygenerované .c soubory (ukázky)
├── scripts/             # Skripty (Python/Bash), které provádějí generování
├── external/            # MD4C a další knihovny
├── src/             # Váš zdrojový kód (.c, .cpp)
├── include/         # Vaše hlavičkové soubory (.h)
├── external/        # Cizí knihovny (např. md4c)
│   └── md4c/
│       ├── md4c.h
│       └── md4c.c
├── build/           # Výstupy kompilace (ignore v gitu)
└── CMakeLists.txt   # Konfigurace sestavení
```

__*Tip:*__
>Pro názvy složek používejte vždy malá písmena a místo mezer podtržítka nebo pomlčky,
>abyste se vyhnuli problémům s kompatibilitou na různých operačních systémech.
