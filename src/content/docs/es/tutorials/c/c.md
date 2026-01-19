---
title: Extractor C
content_hash: 8dae22faf08ddbd9b155931bf4aeebbd
translation_status: translated
source_hash: 8dae22faf08ddbd9b155931bf4aeebbd
translated_from: cs
---
## 1️⃣ Instale el compilador de C (gcc)

Abra una terminal y escriba:

```golpecito
actualización sudo apta
sudo apt install compilación esencial
```

El paquete esencial para la construcción incluye:

-gcc (compilador de C)
- maquillaje
- bibliotecas y encabezados básicos
  
Verificar:

```golpecito
gcc --versión
```

## 2️⃣ Crea el archivo fuente

Por ejemplo el archivo hola_mundo.c:

```golpecito
nano hola_mundo.c
```

Escribe en él:
<!-- archivo: hola_mundo.c -->
```c
#incluir <stdio.h>

int principal (vacío) {
    printf("¡Hola mundo!\n");
    devolver 0;
}
```

Guardar:

-Ctrl + O
- Entrar
-Ctrl + X
  
## 3️⃣ Traducir el programa

En el mismo directorio, ejecute:

```golpecito
gcc hola_mundo.c -o hola_mundo
```

Qué pasó:

- hello_world.c → libro de consulta
- -o hello_world → el ejecutable hello_world resultante

Comprobar:

```golpecito
es
```

Debería haber un archivo hola_mundo

## 4️⃣ Inicia el programa

```golpecito
./hola_mundo
```

Salida:

```golpecito
¡Hola mundo!
```

## 5️⃣ (Opcional) Traducción con advertencias - recomendada

Para los hábitos correctos:

```golpecito
gcc -Wall -Wextra -Werror hello_world.c -o hola_world
```

Esto te obliga a escribir código C limpio y seguro.

## 6️⃣ Lo que es bueno saber desde el principio

- main siempre devuelve un int
- `return 0;` = el programa finalizó correctamente
- `stdio.h` es la biblioteca de E/S estándar
- `./` le dice al shell que "ejecute el archivo desde el directorio actual"

```golpecito
nano número_lectura.c
```

<!-- archivo: read_number.c -->
```c
#incluir <stdio.h>
int principal (vacío)
{
    número entero;
    printf("Ingrese un número entero: ");
    scanf("%d",&número);
    printf("Ingresaste: %d\n", número);
    devolver 0;
}
```

## Estructura de proyecto recomendada

Si desea mantener su proyecto organizado profesionalmente, el diseño estándar se ve así:

```texto
proyecto/
├── docs/ # Documentación principal del proyecto
│ ├── tutoriales/ # Tutoriales en forma de archivos .md
│ └── ejemplos_src/ # archivos .md a partir de los cuales generas código
├── ejemplos/ # Archivos .c generados resultantes (ejemplos)
├── scripts/ # Scripts (Python/Bash) que hacen la generación
├── externo/ #MD4C y otras bibliotecas
├── src/ # Tu código fuente (.c, .cpp)
├── incluir/ # Tus archivos de encabezado (.h)
├── externo/ # Bibliotecas externas (por ejemplo, md4c)
│ └──md4c/
│ ├── md4c.h
│ └── md4c.c
├── build/ # Compilar resultados (ignorar en git)
└── CMakeLists.txt # Configuración de compilación
```

__*Pista:*__
>Para los nombres de carpetas, utilice siempre letras minúsculas y guiones bajos o guiones en lugar de espacios.
>para evitar problemas de compatibilidad en diferentes sistemas operativos.
