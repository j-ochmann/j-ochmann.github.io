---
title: Verhaltensmuster
sidebar:
  label: Overview
  order: 0
category: design_patterns
content_hash: 89363f9073676de8ff7d8475ca85846a
translation_status: translated
source_hash: 89363f9073676de8ff7d8475ca85846a
translated_from: cs
---
Verhaltensmuster befassen sich mit Algorithmen und der Zuweisung von Verantwortlichkeiten zwischen Objekten. Verhaltensmuster beschreiben nicht nur Muster von Objekten oder Klassen, sondern auch die Kommunikationsmuster zwischen ihnen. Diese Muster kennzeichnen einen komplexen Kontrollfluss, der zur Laufzeit schwer zu verfolgen ist. Sie verlagern Ihren Fokus weg vom Kontrollfluss und ermöglichen Ihnen, sich nur auf die Art und Weise zu konzentrieren, wie Objekte miteinander verbunden sind.

Verhaltensklassenmuster nutzen Vererbung, um das Verhalten zwischen Klassen zu verteilen. Dieses Kapitel enthält zwei solcher Muster. Die Vorlagenmethode (325) ist die einfachere und gebräuchlichere der beiden. Eine Template-Methode ist eine abstrakte Definition eines Algorithmus. Es definiert den Algorithmus Schritt für Schritt. Jeder Schritt ruft entweder eine abstrakte Operation oder eine primitive Operation auf. Eine Unterklasse konkretisiert den Algorithmus, indem sie die abstrakten Operationen definiert. Das andere Verhaltensklassenmuster ist Interpreter (243), das eine Grammatik als Klassenhierarchie darstellt und einen Interpreter als Operation auf Instanzen dieser Klassen implementiert.

Verhaltensobjektmuster nutzen die Objektzusammensetzung statt der Vererbung. Einige beschreiben, wie eine Gruppe von Peer-Objekten zusammenarbeitet, um eine Aufgabe auszuführen, die kein einzelnes Objekt alleine ausführen kann. Eine wichtige Frage hierbei ist, wie Peer-Objekte voneinander wissen. Gleichaltrige könnten explizite Bezüge zueinander beibehalten, aber das würde ihre Kopplung verstärken. Im Extremfall würde jedes Objekt über jedes andere Bescheid wissen. Das Mediator-Muster (273) vermeidet dies, indem es ein Mediator-Objekt zwischen Peers einführt. Der Mediator stellt die für die lose Kopplung erforderliche Indirektion bereit.

Die Verantwortungskette (223) sorgt für eine noch lockerere Kopplung. Damit können Sie Anfragen implizit über eine Kette von Kandidatenobjekten an ein Objekt senden. Abhängig von den Laufzeitbedingungen kann jeder Kandidat die Anfrage erfüllen. Die Anzahl der Kandidaten ist unbegrenzt und Sie können zur Laufzeit auswählen, welche Kandidaten an der Kette teilnehmen.

Das Observer-Muster (293) definiert und verwaltet eine Abhängigkeit zwischen Objekten. Das klassische Beispiel für Observer ist Smalltalk Model/View/Controller, wo alle Ansichten des Modells benachrichtigt werden, wenn sich der Zustand des Modells ändert.

Bei anderen Verhaltensmustern von Objekten geht es darum, Verhalten in einem Objekt einzukapseln und Anforderungen an dieses zu delegieren. Das Strategiemuster (315) kapselt einen Algorithmus in einem Objekt. Mithilfe einer Strategie lässt sich der von einem Objekt verwendete Algorithmus einfach festlegen und ändern. Das Befehlsmuster (233) kapselt eine Anforderung in ein Objekt, sodass sie als Parameter übergeben, in einer Verlaufsliste gespeichert oder auf andere Weise manipuliert werden kann. Das Zustandsmuster (305) kapselt die Zustände eines Objekts, sodass das Objekt sein Verhalten ändern kann, wenn sich sein Zustandsobjekt ändert. Visitor (331) kapselt Verhalten, das andernfalls über Klassen verteilt wäre, und Iterator (257) abstrahiert die Art und Weise, wie Sie auf Objekte in einem Aggregat zugreifen und diese durchlaufen.
