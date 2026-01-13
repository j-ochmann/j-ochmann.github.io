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

```mermaid
graph BT
    %% Definice hlavních oblastí
    subgraph DS [Datová věda]
        direction TB
        subgraph AI_Core [Umělá inteligence]
            subgraph ML [Strojové učení]
                DL[Hluboké učení]
            end
        end
    end

    subgraph CS [Počítačové vědy]
        direction TB
        SoftEng[Softwarové inženýrství]
        DB[Databázové systémy]
    end

    %% Propojení oblastí (znázornění průniku)
    AI_Core --- CS

    %% Stylizace
    style DS fill:#f0f4ff,stroke:#2b579a,stroke-width:3px
    style CS fill:#fff4e6,stroke:#d4a017,stroke-width:3px
    style AI_Core fill:#e1f5fe,stroke:#0288d1
    style ML fill:#81d4fa,stroke:#039be5
    style DL fill:#4fc3f7,stroke:#0277bd,color:#fff
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
