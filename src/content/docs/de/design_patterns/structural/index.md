---
title: Strukturelle Muster
sidebar:
  label: Overview
  order: 2
category: design_patterns
content_hash: f78dcbaf116416c19c2f7c8e1f08fe9d
translation_status: translated
source_hash: f78dcbaf116416c19c2f7c8e1f08fe9d
translated_from: cs
---
Bei Strukturmustern geht es darum, wie Klassen und Objekte zusammengesetzt werden, um größere Strukturen zu bilden. Strukturelle Klassenmuster nutzen Vererbung, um Schnittstellen oder Implementierungen zu erstellen. Betrachten Sie als einfaches Beispiel, wie durch Mehrfachvererbung zwei oder mehr Klassen zu einer gemischt werden. Das Ergebnis ist eine Klasse, die die Eigenschaften ihrer übergeordneten Klassen kombiniert. Dieses Muster ist besonders nützlich, um unabhängig entwickelte Klassenbibliotheken zusammenarbeiten zu lassen. Ein weiteres Beispiel ist die Klassenform des Adaptermusters (139). Im Allgemeinen sorgt ein Adapter dafür, dass eine Schnittstelle (die des Adaptees) einer anderen entspricht, wodurch eine einheitliche Abstraktion verschiedener Schnittstellen bereitgestellt wird. Ein Klassenadapter erreicht dies, indem er privat von einer adaptierten Klasse erbt. Der Adapter drückt dann seine Schnittstelle in Bezug auf die Schnittstelle des Adaptees aus.

Anstatt Schnittstellen oder Implementierungen zu erstellen, beschreiben strukturelle Objektmuster Möglichkeiten, Objekte zu erstellen, um neue Funktionen zu realisieren. Die zusätzliche Flexibilität der Objektzusammensetzung ergibt sich aus der Möglichkeit, die Zusammensetzung zur Laufzeit zu ändern, was mit der statischen Klassenzusammensetzung nicht möglich ist.

Composite (163) ist ein Beispiel für ein strukturelles Objektmuster. Es beschreibt, wie eine Klassenhierarchie aufgebaut wird, die aus Klassen für zwei Arten von Objekten besteht: primitive und zusammengesetzte. Mit den zusammengesetzten Objekten können Sie primitive und andere zusammengesetzte Objekte zu beliebig komplexen Strukturen zusammensetzen. Im Proxy-Muster (207) fungiert ein Proxy als praktischer Ersatz oder Platzhalter für ein anderes Objekt. Ein Proxy kann auf viele Arten verwendet werden. Es kann als lokaler Vertreter für ein Objekt in einem Remote-Adressraum fungieren. Es kann ein großes Objekt darstellen, das bei Bedarf geladen werden soll. Es könnte den Zugriff auf ein sensibles Objekt schützen. Proxys bieten eine gewisse Indirektionsebene für bestimmte Eigenschaften von Objekten. Daher können sie diese Eigenschaften einschränken, verbessern oder verändern.

Das Flyweight-Muster (195) definiert eine Struktur zum Teilen von Objekten. Objekte werden aus mindestens zwei Gründen gemeinsam genutzt: Effizienz und Konsistenz. Flyweight konzentriert sich auf das Teilen für Raumeffizienz. Anwendungen, die viele Objekte verwenden, müssen sorgfältig auf die Kosten jedes Objekts achten. Durch die gemeinsame Nutzung von Objekten statt deren Replikation können erhebliche Einsparungen erzielt werden. Objekte können jedoch nur geteilt werden, wenn sie keinen kontextabhängigen Zustand definieren. Fliegengewichtige Objekte haben keinen solchen Zustand. Alle zusätzlichen Informationen, die sie zur Erfüllung ihrer Aufgabe benötigen, werden ihnen bei Bedarf übermittelt. Ohne kontextabhängigen Status können Flyweight-Objekte frei geteilt werden.

Während Flyweight zeigt, wie man viele kleine Objekte herstellt, zeigt Facade (185), wie man ein einzelnes Objekt dazu bringt, ein ganzes Subsystem darzustellen. Eine Fassade ist ein Repräsentant für eine Reihe von Objekten. Die Fassade kommt ihrer Aufgabe nach, indem sie Botschaften an die Objekte weiterleitet, die sie repräsentiert. Das Bridge-Muster (151) trennt die Abstraktion eines Objekts von seiner Implementierung, sodass Sie sie unabhängig voneinander variieren können.

Decorator (175) beschreibt, wie man Objekten dynamisch Verantwortlichkeiten hinzufügt. Decorator ist ein Strukturmuster, das Objekte rekursiv zusammensetzt, um eine unbegrenzte Anzahl zusätzlicher Verantwortlichkeiten zu ermöglichen. Beispielsweise kann ein Decorator-Objekt, das eine Benutzeroberflächenkomponente enthält, der Komponente eine Dekoration wie einen Rahmen oder einen Schatten hinzufügen oder Funktionen wie Scrollen und Zoomen hinzufügen. Wir können zwei Dekorationen hinzufügen, indem wir einfach ein Decorator-Objekt in ein anderes verschachteln, und so weiter für zusätzliche Dekorationen. Um dies zu erreichen, muss jedes Decorator-Objekt der Schnittstelle seiner Komponente entsprechen und Nachrichten an diese weiterleiten. Der Dekorator kann seine Aufgabe (z. B. das Zeichnen eines Rahmens um die Komponente) entweder vor oder nach dem Weiterleiten einer Nachricht erledigen.

Viele Strukturmuster hängen bis zu einem gewissen Grad miteinander zusammen. Wir werden diese Beziehungen am Ende des Kapitels besprechen.
