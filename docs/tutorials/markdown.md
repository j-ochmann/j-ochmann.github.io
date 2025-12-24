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
- [daringfireball.net/projects/markdown](https://daringfireball.net/projects/markdown/)

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
- Odrážkový: __*__, __+__, nebo __-__ následované mezerou
- Číslovaný: číslice s tečkou (např. 1. )
```markdown
1. první položka
  1.1 první podpoložka
  1.2 druhá podpoložka
2. druhá položka
  - jedna „minus“ odrážka
  - další „minus“ odrážka
  + plus
  * hvězda
3. třetí položka
```
  1. první položka
    1.1 první podpoložka
    1.2 druhá podpoložka
  2. druhá položka
    - jedna „minus“ odrážka
    - další „minus“ odrážka
    + plus
    * hvězda
  3. třetí položka
     
## Odkazy a obrázky
- Odkaz: **\[**Text odkazu**](**URL adresa**)**
  + např. \[Google](https://www.google.com)
  + [Google](https://www.google.com)
- Obrázek: **\!\[**Popis obrázku**](**URL adresa obrázku**)**
  + např. \!\[Jindřich](../assets/img/jindrich_16px.jpg)
  + např. ![Jindřich](../assets/img/jindrich_16px.jpg)
    
## Kód a citace
- Blokový kód:
```text
\```
Text obalte trojitými zpětnými apostrofy na samostatných řádcích.
\```
```
- Inline kód: Text v řádku ``obalte jedním zpětným apostrofem``.
- Citace: Na začátek řádku vložte znak větší než >.

## Tabulky
- se tvoří pomocí svislic | pro sloupce a pomlček - pro oddělení hlavičky:
```text
| Záhlaví 1 | Záhlaví 2 |
| --------- | --------- |
| Text      | Data      |
```
| Záhlaví 1 | Záhlaví 2 |
| --------- | --------- |
| Text      | Data      |

>Podrobný přehled syntaxe naleznete v [dokumentaci Markdown Guide](www.markdownguide.org).
>Pro pohodlné psaní můžete využít online editor [StackEdit](stackedit.io).
>GitHub specifická 'příchuť' Markdown: [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

## Unicode Ikony
- kniha:
   * 📕 červená (U+1F4D5)
   * 📗 zelená (U+1F4D7)
   * 📘 modrá (U+1F4D8)
   * 📙 oranžová (U+1F4D9)
   * 📖 otevřená (U+1F4D6)
   * 🕮 dekorativní (U+1F56E)
   * 📚 stoh (U+1F4DA)
   * 📓 zápisník (U+1F4D3)
   * 📒 kroužkový blok (U+1F4D2)
   * 🔖 záložka (U+1F516)
      
- Technické a ASCII varianty
   * [i] – informace
   * ?> – nápověda/dotaz  
