---
title: "AI - Artificial Intelligence"
sidebar:
  label: AI
  order: 0
category: ai
---
Computer Science
- Artificial Intelligence
  - Machine Learning
    - Deep Learning
```d2
Computer Science: {
  Artificial Intelligence: {
    Machine Learning: {
      Deep Learning
    }
  }
}
Data Science: {
  Machine Learning
}
```

```mermaid
graph TD
    subgraph CS [Informatika]
        A[Algoritmy]
        B[Struktury]
    end

    subgraph DS [Datová věda]
        C[Statistika]
        D[Analýza]
    end

    AI((Umělá inteligence))

    %% Vazby definující průnik
    AI --- CS
    AI --- DS

    style AI fill:#f96,stroke:#333,stroke-width:4px
```
   
informatika
- umělá inteligence
  - strojové učení
    - hluboké učení

```mermaid
graph TD
    subgraph Množina A
    A1(Prvek 1)
    A2(Prvek 2)
    end
    subgraph Množina B
    B1(Prvek 3)
    end
    A2 --- B1
```
