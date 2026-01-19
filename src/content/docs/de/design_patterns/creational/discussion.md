---
title: Diskussion über Schöpfungsmuster
sidebar:
  label: Discussion
  order: 6
category: Creational
content_hash: 492bfe125ea0c7fb657895c1893df018
translation_status: translated
source_hash: 492bfe125ea0c7fb657895c1893df018
translated_from: cs
---
Es gibt zwei gängige Möglichkeiten, ein System anhand der von ihm erstellten Objektklassen zu parametrisieren. Eine Möglichkeit besteht darin, die Klasse, die die Objekte erstellt, in Unterklassen zu unterteilen. Dies entspricht der Verwendung des Factory-Methode-Musters (107). Der Hauptnachteil dieses Ansatzes besteht darin, dass möglicherweise die Erstellung einer neuen Unterklasse erforderlich ist, nur um die Klasse des Produkts zu ändern. Solche Veränderungen können kaskadenartig auftreten. Wenn beispielsweise der Produktersteller selbst durch eine Factory-Methode erstellt wird, müssen Sie auch seinen Ersteller überschreiben.

Die andere Möglichkeit, ein System zu parametrisieren, basiert mehr auf der Objektzusammensetzung: Definieren Sie ein Objekt, das für die Kenntnis der Klasse der Produktobjekte verantwortlich ist, und machen Sie es zu einem Parameter des Systems. Dies ist ein Schlüsselaspekt der Muster Abstract Factory (87), Builder (97) und Prototype (117). Bei allen dreien geht es darum, ein neues „Fabrikobjekt“ zu erstellen, dessen Aufgabe es ist, Produktobjekte zu erstellen. Abstract Factory verfügt über ein Factory-Objekt, das Objekte mehrerer Klassen produziert. Builder lässt das Factory-Objekt mithilfe eines entsprechend komplexen Protokolls inkrementell ein komplexes Produkt erstellen. Beim Prototyp erstellt das Fabrikobjekt ein Produkt, indem es ein Prototypobjekt kopiert. In diesem Fall sind das Fabrikobjekt und der Prototyp dasselbe Objekt, da der Prototyp für die Rücksendung des Produkts verantwortlich ist.

Betrachten Sie das im Prototype-Muster beschriebene Zeichnungseditor-Framework. Es gibt mehrere Möglichkeiten, ein GraphicTool anhand der Produktklasse zu parametrisieren:

+ Durch Anwenden des Factory-Methodenmusters wird für jede Unterklasse von Graphic in der Palette eine Unterklasse von GraphicTool erstellt. GraphicTool verfügt über eine NewGraphic-Operation, die jede GraphicTool-Unterklasse neu definiert.

+ Durch die Anwendung des Abstract Factory-Musters entsteht eine Klassenhierarchie von GraphicsFactories, eine für jede Graphic-Unterklasse. In diesem Fall erstellt jede Fabrik nur ein Produkt: CircleFactory erstellt Kreise, LineFactory erstellt Linien und so weiter. Ein GraphicTool wird mit einer Factory zum Erstellen der entsprechenden Art von Grafiken parametrisiert.

+ Durch die Anwendung des Prototype-Musters implementiert jede Unterklasse von Graphics die Clone-Operation und ein GraphicTool wird mit einem Prototyp der von ihm erstellten Grafik parametrisiert.

Welches Muster am besten ist, hängt von vielen Faktoren ab. In unserem Zeichnungseditor-Framework ist das Factory-Methode-Muster zunächst am einfachsten zu verwenden. Es ist einfach, eine neue Unterklasse von GraphicTool zu definieren, und die Instanzen von GraphicTool werden nur erstellt, wenn die Palette definiert ist. Der Hauptnachteil besteht darin, dass sich die Unterklassen von GraphicTool stark vermehren und keine von ihnen viel bewirkt.

Abstract Factory bietet keine große Verbesserung, da es eine ebenso große GraphicsFactory-Klassenhierarchie erfordert. Abstract Factory wäre der Factory-Methode nur dann vorzuziehen, wenn es bereits eine GraphicsFactory-Klassenhierarchie gäbe – entweder weil der Compiler sie automatisch bereitstellt (wie in Smalltalk oder Objective C) oder weil sie in einem anderen Teil des Systems benötigt wird.

Insgesamt ist das Prototype-Muster wahrscheinlich das beste für das Zeichnungseditor-Framework, da es lediglich die Implementierung einer Klonoperation für jede Grafikklasse erfordert. Dadurch wird die Anzahl der Klassen reduziert und Clone kann für andere Zwecke als die reine Instanziierung verwendet werden (z. B. eine Operation im Menü „Duplizieren“).

Die Factory-Methode macht ein Design anpassbarer und nur ein wenig komplizierter. Andere Entwurfsmuster erfordern neue Klassen, während die Factory-Methode nur eine neue Operation erfordert. Die Factory-Methode wird häufig als Standardmethode zum Erstellen von Objekten verwendet. Dies ist jedoch nicht erforderlich, wenn sich die instanziierte Klasse nie ändert oder wenn die Instanziierung in einer Operation erfolgt, die von Unterklassen leicht überschrieben werden kann, beispielsweise einer Initialisierungsoperation.

Designs, die Abstract Factory, Prototype oder Builder verwenden, sind noch flexibler als solche, die die Factory-Methode verwenden, aber auch komplexer. Häufig beginnen Entwürfe mit der Factory-Methode und entwickeln sich zu anderen kreativen Mustern, wenn der Designer erkennt, wo mehr Flexibilität erforderlich ist. Wenn Sie viele Designmuster kennen, haben Sie mehr Möglichkeiten, ein Designkriterium gegen ein anderes abzuwägen.
