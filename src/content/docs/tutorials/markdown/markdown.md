---
layout: default
title: Markdown How-to
---
# [Markdown](https://cs.wikipedia.org/wiki/Markdown)
- je odlehčený značkovací jazyk, který vytvořil 
[John Gruber](https://en.wikipedia.org/wiki/John_Gruber)
s pomocí
[Aarona Swartze](https://cs.wikipedia.org/wiki/Aaron_Swartz)
- slouží pro úpravu textu a převod na HTML
- [daringfireball.net](https://daringfireball.net/projects/markdown/)

## Formátování
- **tučné** obalte **\*\*hvězdičkami\*\*** nebo __\_\_podtržítky\_\___ 
- *kurzívu* obalte *\*hvězdičkou\** nebo _\_podtržítkem\__
- ~~přeškrtnutí~~ obalte \~\~vlnovkami\~\~
- úroveň nadpisu určuje 1-6 **#** mřížek na začátku řádku
```markdown
# Nadpis 1 (největší)
## Nadpis 2
### Nadpis 3
#### Nadpis 4
##### Nadpis 5
###### Nadpis 6  (nejmenší)
```
# Nadpis 1 (největší)
## Nadpis 2
### Nadpis 3
#### Nadpis 4
##### Nadpis 5
###### Nadpis 6  (nejmenší)

## Seznamy
- Odrážkový: __-__, __+__, nebo __*__ následované mezerou
- Číslovaný: číslice s tečkou (např. 1. )
- Kontrolovaný:
  - [x] zaškrtnutý
  - [ ] prázdný

```markdown
1. první položka
    1. první
    2. druhá
    3. [x] zaškrtnutá
    4. [ ] prázdná
2. druhá položka
    - první „minus“ odrážka
    - další „minus“ odrážka
    - [ ] prázdná
    - [x] zaškrtnutá
    + plus
    * hvězda
3. třetí položka
```

1. první položka
    1. první
    2. druhá
    3. [x] zaškrtnutá
    4. [ ] prázdná
2. druhá položka
    - první „minus“ odrážka
    - další „minus“ odrážka
    - [ ] prázdná
    - [x] zaškrtnutá
    + plus
    * hvězda
3. třetí položka
     
## Odkazy a obrázky
- Odkaz: **\[**_Text odkazu_**](**_URL adresa_**)**
  + [Google](https://www.google.com) např. \[Google](https://www.google.com)
- Obrázek: **\!\[**_Popis obrázku_**](**_URL adresa obrázku_**)**
  + ![Jindřich](../../assets/img/jindrich_16px.jpg) např. \!\[Jindřich](../../assets/img/jindrich_16px.jpg)
    
## Kód a citace
- Blokový kód:
````markdown
```
Text obalte trojitými zpětnými apostrofy na samostatných řádcích.
```
````
- Inline kód: Text v řádku __\`__`obalte jedním zpětným apostrofem`__\`__.
- Citace: Na začátek řádku vložte znak větší než `>`.

## Tabulky
- se tvoří pomocí svislic __|__ pro sloupce a pomlček __-__ pro oddělení hlavičky:
```text
| Záhlaví 1 | Záhlaví 2 |
| --------- | --------- |
| Text      | Data      |
```

| Záhlaví 1 | Záhlaví 2 |
| --------- | --------- |
| Text      | Data      |

## Dokumentace
- podrobný přehled syntaxe [MarkdownGuide.org](https://www.markdownguide.org/).
- specifická „příchuť“ [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

__*Tip:*__
>Pro pohodlné psaní můžete využít online editor [StackEdit](https://stackedit.io).