---
title: Discusión sobre patrones creacionales
sidebar:
  label: Discussion
  order: 6
category: Creational
content_hash: 492bfe125ea0c7fb657895c1893df018
translation_status: translated
source_hash: 492bfe125ea0c7fb657895c1893df018
translated_from: cs
---
Hay dos formas comunes de parametrizar un sistema según las clases de objetos que crea. Una forma es subclasificar la clase que crea los objetos; esto corresponde al uso del patrón Método de fábrica (107). El principal inconveniente de este enfoque es que puede requerir la creación de una nueva subclase sólo para cambiar la clase del producto. Estos cambios pueden producirse en cascada. Por ejemplo, cuando el creador del producto se crea mediante un método de fábrica, también debe anular su creador.

La otra forma de parametrizar un sistema se basa más en la composición de objetos: definir un objeto que sea responsable de conocer la clase de los objetos del producto y convertirlo en un parámetro del sistema. Este es un aspecto clave de los patrones Abstract Factory (87), Builder (97) y Prototype (117). Los tres implican la creación de un nuevo "objeto de fábrica" ​​cuya responsabilidad es crear objetos de producto. Abstract Factory tiene el objeto de fábrica que produce objetos de varias clases. Builder hace que el objeto de fábrica construya un producto complejo de forma incremental utilizando un protocolo correspondientemente complejo. Prototype hace que el objeto de fábrica construya un producto copiando un objeto prototipo. En este caso, el objeto de fábrica y el prototipo son el mismo objeto, porque el prototipo es el responsable de devolver el producto.

Considere el marco del editor de dibujos descrito en el patrón Prototipo. Hay varias formas de parametrizar una GraphicTool por clase de producto:

+ Al aplicar el patrón Factory Method, se creará una subclase de GraphicTool para cada subclase de Graphic en la paleta. GraphicTool tendrá una operación NewGraphic que cada subclase de GraphicTool redefinirá.

+ Al aplicar el patrón Abstract Factory, habrá una jerarquía de clases de GraphicsFactories, una para cada subclase de Graphic. En este caso, cada fábrica crea solo un producto: CircleFactory creará círculos, LineFactory creará líneas, etc. Se parametrizará una GraphicTool con una fábrica para crear el tipo de gráficos apropiado.

+ Al aplicar el patrón Prototipo, cada subclase de Gráficos implementará la operación Clonar, y una GraphicTool se parametrizará con un prototipo del Gráfico que crea.

Qué patrón es mejor depende de muchos factores. En nuestro marco de edición de dibujos, el patrón Factory Method es más fácil de usar al principio. Es fácil definir una nueva subclase de GraphicTool y las instancias de GraphicTool se crean solo cuando se define la paleta. La principal desventaja aquí es que las subclases de GraphicTool proliferan y ninguna de ellas hace mucho.

Abstract Factory no ofrece muchas mejoras, porque requiere una jerarquía de clases GraphicsFactory igualmente grande. Abstract Factory sería preferible a Factory Method sólo si ya existiera una jerarquía de clases GraphicsFactory, ya sea porque el compilador la proporciona automáticamente (como en Smalltalk u Objective C) o porque es necesaria en otra parte del sistema.

En general, el patrón Prototipo es probablemente el mejor para el marco del editor de dibujos, porque solo requiere implementar una operación Clonar en cada clase de Gráficos. Eso reduce el número de clases, y Clonar se puede utilizar para fines distintos a la creación de instancias pura (por ejemplo, una operación de menú Duplicar).

Factory Method hace que un diseño sea más personalizable y un poco más complicado. Otros patrones de diseño requieren nuevas clases, mientras que el método Factory solo requiere una nueva operación. La gente suele utilizar el método Factory como forma estándar de crear objetos, pero no es necesario cuando la clase de la que se crea una instancia nunca cambia o cuando la creación de instancias tiene lugar en una operación que las subclases pueden anular fácilmente, como una operación de inicialización.

Los diseños que utilizan Abstract Factory, Prototype o Builder son incluso más flexibles que aquellos que utilizan Factory Method, pero también son más complejos. A menudo, los diseños comienzan utilizando el método Factory y evolucionan hacia otros patrones creativos a medida que el diseñador descubre dónde se necesita más flexibilidad. Conocer muchos patrones de diseño le brinda más opciones a la hora de comparar un criterio de diseño con otro.
