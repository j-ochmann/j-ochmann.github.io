---
title: Patrones de comportamiento
sidebar:
  label: Overview
  order: 0
category: design_patterns
content_hash: 89363f9073676de8ff7d8475ca85846a
translation_status: translated
source_hash: 89363f9073676de8ff7d8475ca85846a
translated_from: cs
---
Los patrones de comportamiento tienen que ver con algoritmos y la asignación de responsabilidades entre objetos. Los patrones de comportamiento describen no sólo patrones de objetos o clases sino también patrones de comunicación entre ellos. Estos patrones caracterizan un flujo de control complejo que es difícil de seguir en tiempo de ejecución. Desvían su atención del flujo de control para permitirle concentrarse únicamente en la forma en que los objetos están interconectados.

Los patrones de clases de comportamiento utilizan la herencia para distribuir el comportamiento entre clases. Este capítulo incluye dos de estos patrones. El método de plantilla (325) es el más simple y común de los dos. Un método de plantilla es una definición abstracta de un algoritmo. Define el algoritmo paso a paso. Cada paso invoca una operación abstracta o una operación primitiva. Una subclase desarrolla el algoritmo definiendo las operaciones abstractas. El otro patrón de clase de comportamiento es Intérprete (243), que representa una gramática como una jerarquía de clases e implementa un intérprete como una operación en instancias de estas clases.

Los patrones de comportamiento de objetos utilizan la composición de objetos en lugar de la herencia. Algunos describen cómo un grupo de objetos pares cooperan para realizar una tarea que ningún objeto puede realizar por sí solo. Una cuestión importante aquí es cómo los objetos pares se conocen entre sí. Los pares podrían mantener referencias explícitas entre sí, pero eso aumentaría su acoplamiento. En el extremo, cada objeto conocería a los demás. El patrón Mediador (273) evita esto introduciendo un objeto mediador entre pares. El mediador proporciona la dirección indirecta necesaria para un acoplamiento flojo.

La Cadena de Responsabilidad (223) proporciona un acoplamiento aún más flexible. Le permite enviar solicitudes a un objeto implícitamente a través de una cadena de objetos candidatos. Cualquier candidato puede cumplir con la solicitud dependiendo de las condiciones de tiempo de ejecución. El número de candidatos es abierto y usted puede seleccionar qué candidatos participan en la cadena en tiempo de ejecución.

El patrón Observer (293) define y mantiene una dependencia entre objetos. El ejemplo clásico de Observer está en Smalltalk Model/View/Controller, donde todas las vistas del modelo reciben notificaciones cada vez que cambia el estado del modelo.

Otros patrones de comportamiento de objetos se ocupan de encapsular el comportamiento en un objeto y delegarle solicitudes. El patrón Estrategia (315) encapsula un algoritmo en un objeto. La estrategia facilita especificar y cambiar el algoritmo que utiliza un objeto. El patrón Comando (233) encapsula una solicitud en un objeto para que pueda pasarse como parámetro, almacenarse en una lista histórica o manipularse de otras maneras. El patrón Estado (305) encapsula los estados de un objeto para que el objeto pueda cambiar su comportamiento cuando cambia su estado. El visitante (331) encapsula el comportamiento que de otro modo se distribuiría entre clases, y el iterador (257) abstrae la forma en que accede y recorre los objetos en conjunto.
