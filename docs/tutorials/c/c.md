---
layout: default
title: C Tahák
---
# C Tahák

## 0️⃣ Zkratka
```bash
clear &&
gcc -Wall -Wextra -Werror hello_world.c -o hello_world &&
./hello_world
```
## 1️⃣ Nainstaluj C kompilátor (gcc)

Otevři terminál a zadej:
```bash
sudo apt update
sudo apt install build-essential
```
Balík build-essential obsahuje:
- gcc (C kompilátor)
- make
- základní knihovny a hlavičky
Ověření:
```bash
gcc --version
```
## 2️⃣ Vytvoř zdrojový soubor
Např. soubor hello_world.c:
```bash
nano hello_world.c
```
Do něj napiš:
```c  {file=hello_world.c}
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```
Ulož:
- Ctrl + O
- Enter
- Ctrl + X
## 3️⃣ Přelož program
V tom samém adresáři spusť:
```bash
gcc hello_world.c -o hello_world
```
Co se stalo:
- hello_world.c → zdroják
- -o hello_world → výsledný spustitelný soubor hello_world
Zkontroluj:
```bash
ls
```
Měl by tam být soubor hello_world

## 4️⃣ Spusť program
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
To tě donutí psát čistý a bezpečný C kód.

## 6️⃣ Co je dobré vědět hned od začátku
- main vždy vrací int
- return 0; = program skončil OK
- stdio.h je standardní knihovna pro vstup/výstup
- ./ říká shellu „spusť soubor z aktuálního adresáře“
```bash
nano read_number.c
```
```c {file=read_number.c}
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
`Tip:`
>Pro názvy složek používejte vždy malá písmena a místo mezer podtržítka nebo pomlčky,
>abyste se vyhnuli problémům s kompatibilitou na různých operačních systémech.

## Implementace 'tangle' v C (tangle_fgets.c)
Otevře Markdown soubor, najde bloky {file=...} a jejich obsah uloží do příslušných souborů.
```c {file=tangle_fgets.c}
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void extract_code(const char *filename) {
    FILE *in = fopen(filename, "r");
    if (!in) { perror("Chyba při otevírání"); return; }

    char line[1024];
    FILE *out = NULL;

    while (fgets(line, sizeof(line), in)) {
        char *file_attr = strstr(line, "{file=");
        if (strncmp(line, "```", 3) == 0 && file_attr) {
            // Extrakce názvu souboru: {file=hello.c} -> hello.c
            char out_name[256];
            sscanf(file_attr, "{file=%255[^}]}", out_name);
            
            out = fopen(out_name, "w");
            printf("Generuji soubor: %s\n", out_name);
            continue;
        }

        if (out) {
            if (strncmp(line, "```", 3) == 0) {
                fclose(out);
                out = NULL;
            } else {
                fputs(line, out);
            }
        }
    }
    fclose(in);
}

int main(int argc, char *argv[]) {
    if (argc < 2) { printf("Použití: %s <soubor.md>\n", argv[0]); return 1; }
    extract_code(argv[1]);
    return 0;
}
```
### Jak to použít?
```bash
gcc tangle.c -o tangle # kompilace
./tangle dokument.md   # spuštění
```
### Proč je to užitečné?
- Single Source of Truth: Kód máte na jednom místě (v dokumentaci).
- Automatizace: Můžete vytvořit Makefile, který spustí "tangler" a zkompiluje vygenerované .c soubory.
- Kompatibilita: Použitím formátu {file=...} zůstáváte kompatibilní s pokročilými nástroji jako je Entangled,
pokud byste na ně chtěli v budoucnu přejít.

Pokud chcete profesionálnější řešení v C bez psaní vlastního parseru,
doporučuji knihovnu MD4C, což je velmi rychlý Markdown parser v C,
který umí procházet bloky kódu pomocí callback funkcí.

Použití knihovny MD4C je pro tento účel vynikající volbou,
protože jde o jeden z nejrychlejších a nejkompaktnějších parserů napsaných v čistém C (skládá se v podstatě jen z md4c.c a md4c.h).
Níže je implementace "tangleru", který využívá MD4C k detekci bloků kódu a extrakci atributu {file=...} z jejich "info stringu" (text za trojitými apostrofy).
## Implementace s MD4C (tangle_md4c.c)
```c {file=tangle_md4c.c}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "md4c.h"

typedef struct {
    FILE *out_file;
    int is_target_block;
} Context;

// Pomocná funkce pro vyhledání {file=název} v info stringu
char* get_filename(const MD_ATTRIBUTE* info) {
    if (!info || info->size == 0) return NULL;
    
    // MD4C vrací info string jako pole segmentů, pro zjednodušení spojíme/prohledáme
    // Hledáme vzor {file=...}
    char buf[256];
    size_t len = info->size < 255 ? info->size : 255;
    memcpy(buf, info->text, len);
    buf[len] = '\0';

    char *start = strstr(buf, "{file=");
    if (start) {
        start += 6;
        char *end = strchr(start, '}');
        if (end) {
            *end = '\0';
            return strdup(start);
        }
    }
    return NULL;
}

int enter_block_callback(MD_BLOCKTYPE type, void* detail, void* userdata) {
    Context* ctx = (Context*)userdata;
    if (type == MD_BLOCK_CODE) {
        MD_BLOCK_CODE_DETAIL* d = (MD_BLOCK_CODE_DETAIL*)detail;
        char* filename = get_filename(&d->info);
        
        if (filename) {
            ctx->out_file = fopen(filename, "w");
            ctx->is_target_block = 1;
            printf("Extrahuje se do: %s\n", filename);
            free(filename);
        }
    }
    return 0;
}

int leave_block_callback(MD_BLOCKTYPE type, void* detail, void* userdata) {
    Context* ctx = (Context*)userdata;
    if (type == MD_BLOCK_CODE && ctx->out_file) {
        fclose(ctx->out_file);
        ctx->out_file = NULL;
        ctx->is_target_block = 0;
    }
    return 0;
}

int text_callback(MD_TEXTTYPE type, const MD_CHAR* text, MD_SIZE size, void* userdata) {
    Context* ctx = (Context*)userdata;
    // Zapisujeme pouze pokud jsme uvnitř bloku kódu, který měl definovaný soubor
    if (ctx->is_target_block && ctx->out_file && type == MD_TEXT_CODE) {
        fwrite(text, 1, size, ctx->out_file);
    }
    return 0;
}

int main(int argc, char** argv) {
    if (argc < 2) { printf("Použití: %s <soubor.md>\n", argv[0]); return 1; }

    // Načtení Markdown souboru do paměti (MD4C pracuje s bufferem)
    FILE* f = fopen(argv[1], "rb");
    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    fseek(f, 0, SEEK_SET);
    char* data = malloc(size);
    fread(data, 1, size, f);
    fclose(f);

    Context ctx = { NULL, 0 };
    MD_PARSER parser = {
        0, MD_DIALECT_COMMONMARK,
        enter_block_callback, leave_block_callback,
        NULL, NULL, // enter/leave span
        text_callback, NULL, NULL // text, debug, syntax_error
    };

    md_parse(data, size, &parser, &ctx);

    free(data);
    return 0;
}
```
### Jak to zprovoznit?
Do složky programu stáhněte soubory md4c.c a md4c.h z oficiálního repozitáře.
```bash
gcc tangle_md4c.c md4c.c -o tangle_md4c # kompilace
/tangle_md4c dokument.md                # spuštění
```
#### Výhody
- robustnost: MD4C správně rozpozná bloky kódu i v seznamech nebo citacích, což jednoduchý parser s fgets může minout.
- rychlost: Jeden z nejrychlejších způsobů, jak parsovat Markdown.
- atributy: Správně pracuje s "info stringem" za trojitými apostrofy, což je standardní místo pro metadata v moderním Markdownu.

### Vytvoření Makefile pro tento proces vyžaduje řetězení dvou kroků
1. extrakci kódů z Markdownu (tangle)
2. kompilaci výsledných *.c souboru.
#### Příklad Makefile, který počítá s programem tangle
(vytvořeným pomocí MD4C nebo **fgets**)
```makefile {file=MakefileOld}
# Nastavení kompilátoru a jmen souborů
CC = gcc
CFLAGS = -Wall -Wextra
TANGLER = ./tangle
SOURCE_MD = ../../c.md
# Název vygenerovaného souboru (musí odpovídat tomu v {file=...})
GENERATED_C = hello_world.c
TARGET = hello_world

# Výchozí pravidlo: sestavit výslednou binárku
all: $(TARGET)

# 1. Pravidlo pro vytvoření binárky z vygenerovaného .c souboru
$(TARGET): $(GENERATED_C)
	$(CC) $(CFLAGS) -o $@ $<

# 2. Pravidlo pro "tangle" (extrakci) .c souboru z Markdownu
# Toto pravidlo se spustí, pokud dokument.md byl změněn a je novější než .c soubor
$(GENERATED_C): $(SOURCE_MD) $(TANGLER)
	$(TANGLER) $(SOURCE_MD)

# 3. Pomocné pravidlo pro sestavení samotného tangleru (pokud ho nemáte)
$(TANGLER): tangle_fgets.c
//$(TANGLER): tangle_md4c.c md4c.c
	$(CC) $(CFLAGS) -o $@ $^

# Úklid vygenerovaných souborů
clean:
	rm -f $(TARGET) $(GENERATED_C)

.PHONY: all clean
```

```makefile {file=Makefile}
SOURCE_MD = ../../c.md
TANGLER = ./tangle_fgets

# Najde všechny {file=...}
GENERATED_C := $(shell grep -oP '(?<={file=)[^}]+' $(SOURCE_MD))

# Z názvů .c souborů vytvoří názvy výsledných binárek (bez přípony .c)
TARGETS = $(GENERATED_C:.c=)

all: $(TARGETS)

# Pravidlo pro kompilaci každé binárky z jejího .c souboru
%: %.c
	gcc -Wall -O2 -o $@ $<

# Pravidlo, které spustí tangler, pokud se změnil Markdown.
# Vytvoří VŠECHNY .c soubory najednou.
$(GENERATED_C): $(SOURCE_MD)
	$(TANGLER) $(SOURCE_MD)

clean:
	rm -f $(TARGETS) $(GENERATED_C)

.PHONY: all clean
```
bla
