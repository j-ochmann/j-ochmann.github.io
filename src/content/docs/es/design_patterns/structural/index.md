---
title: Patrones estructurales
sidebar:
  label: Overview
  order: 2
category: design_patterns
content_hash: f78dcbaf116416c19c2f7c8e1f08fe9d
translation_status: translated
source_hash: f78dcbaf116416c19c2f7c8e1f08fe9d
translated_from: cs
---
Los patrones estructurales se ocupan de cómo se componen las clases y los objetos para formar estructuras más grandes. Los patrones de clases estructurales utilizan la herencia para componer interfaces o implementaciones. Como ejemplo sencillo, considere cómo la herencia múltiple mezcla dos o más clases en una. El resultado es una clase que combina las propiedades de sus clases principales. Este patrón es particularmente útil para hacer que las bibliotecas de clases desarrolladas de forma independiente funcionen juntas. Otro ejemplo es la forma de clase del patrón Adaptador (139). En general, un adaptador hace que una interfaz (la del adaptado) se ajuste a otra, proporcionando así una abstracción uniforme de diferentes interfaces. Un adaptador de clase logra esto heredando de forma privada de una clase adaptada. El adaptador entonces expresa su interfaz en términos de la del adaptado.

En lugar de componer interfaces o implementaciones, los patrones de objetos estructurales describen formas de componer objetos para realizar nuevas funciones. La flexibilidad adicional de la composición de objetos proviene de la capacidad de cambiar la composición en tiempo de ejecución, lo cual es imposible con la composición de clases estática.

Compuesto (163) es un ejemplo de un patrón de objeto estructural. Describe cómo construir una jerarquía de clases compuesta de clases para dos tipos de objetos: primitivos y compuestos. Los objetos compuestos le permiten componer objetos primitivos y otros objetos compuestos en estructuras arbitrariamente complejas. En el patrón Proxy (207), un proxy actúa como un sustituto conveniente o marcador de posición para otro objeto. Un proxy se puede utilizar de muchas maneras. Puede actuar como representante local de un objeto en un espacio de direcciones remoto. Puede representar un objeto grande que debe cargarse según demanda. Podría proteger el acceso a un objeto sensible. Los proxies proporcionan un nivel de direccionamiento indirecto a propiedades específicas de los objetos. Por tanto, pueden restringir, mejorar o alterar estas propiedades.

El patrón Flyweight (195) define una estructura para compartir objetos. Los objetos se comparten por al menos dos razones: eficiencia y coherencia. Flyweight se centra en compartir para lograr eficiencia espacial. Las aplicaciones que utilizan muchos objetos deben prestar especial atención al coste de cada objeto. Se pueden obtener ahorros sustanciales compartiendo objetos en lugar de replicarlos. Pero los objetos sólo se pueden compartir si no definen un estado dependiente del contexto. Los objetos de peso mosca no tienen ese estado. Cualquier información adicional que necesiten para realizar su tarea se les pasa cuando es necesario. Sin un estado dependiente del contexto, los objetos Flyweight se pueden compartir libremente.

Mientras que Flyweight muestra cómo hacer muchos objetos pequeños, Facade (185) muestra cómo hacer que un solo objeto represente un subsistema completo. Una fachada es representativa de un conjunto de objetos. La fachada cumple sus responsabilidades enviando mensajes a los objetos que representa. El patrón Puente (151) separa la abstracción de un objeto de su implementación para que puedas variarlas de forma independiente.

Decorator (175) describe cómo agregar responsabilidades a los objetos de forma dinámica. Decorador es un patrón estructural que compone objetos de forma recursiva para permitir un número abierto de responsabilidades adicionales. Por ejemplo, un objeto Decorador que contiene un componente de interfaz de usuario puede agregar una decoración como un borde o una sombra al componente, o puede agregar funciones como desplazamiento y zoom. Podemos agregar dos decoraciones simplemente anidando un objeto Decorador dentro de otro, y así sucesivamente para decoraciones adicionales. Para lograr esto, cada objeto Decorador debe ajustarse a la interfaz de su componente y debe reenviarle mensajes. El Decorador puede hacer su trabajo (como dibujar un borde alrededor del componente) antes o después de reenviar un mensaje.

Muchos patrones estructurales están relacionados hasta cierto punto. Discutiremos estas relaciones al final del capítulo.
