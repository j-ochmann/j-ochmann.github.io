---
title: C Puller
content_hash: 8dae22faf08ddbd9b155931bf4aeebbd
translation_status: translated
source_hash: 8dae22faf08ddbd9b155931bf4aeebbd
translated_from: cs
---
## 1️⃣ Install the C compiler (gcc)

Open a terminal and type:

```bash
sudo apt update
sudo apt install build-essential
```

The build-essential package includes:

- gcc (C compiler)
- makeup
- basic libraries and headers
  
Verify:

```bash
gcc --version
```

## 2️⃣ Create the source file

For example file hello_world.c:

```bash
nano hello_world.c
```

Write in it:
<!-- file: hello_world.c -->
```c
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

Save:

- Ctrl + O
- Enter
- Ctrl + X
  
## 3️⃣ Translate the program

In the same directory, run:

```bash
gcc hello_world.c -o hello_world
```

What happened:

- hello_world.c → sourcebook
- -o hello_world → the resulting hello_world executable

Check:

```bash
ls
```

There should be a file hello_world

## 4️⃣ Start the program

```bash
./hello_world
```

Output:

```bash
Hello world!
```

## 5️⃣ (Optional) Translation with warnings - recommended

For the right habits:

```bash
gcc -Wall -Wextra -Werror hello_world.c -o hello_world
```

This forces you to write clean and safe C code.

## 6️⃣ What is good to know right from the start

- main always returns an int
- `return 0;` = program ended OK
- `stdio.h` is the standard I/O library
- `./` tells shell to "run file from current directory"

```bash
nano read_number.c
```

<!-- file: read_number.c -->
```c
#include <stdio.h>
int main(void)
{
    int number;
    printf("Enter integer: ");
    scanf("%d",&number);
    printf("You entered: %d\n", number);
    return 0;
}
```

## Recommended project structure

If you want to keep your project professionally organized, the standard layout looks like this:

```text
project/
├── docs/ # Main project documentation
│ ├── tutorials/ # Tutorials in the form of .md files
│ └── examples_src/ # .md files from which you generate code
├── examples/ # Resulting generated .c files (examples)
├── scripts/ # Scripts (Python/Bash) that do the generation
├── external/ # MD4C and other libraries
├── src/ # Your source code (.c, .cpp)
├── include/ # Your header files (.h)
├── external/ # External libraries (e.g. md4c)
│ └── md4c/
│ ├── md4c.h
│ └── md4c.c
├── build/ # Compile outputs (ignore in git)
└── CMakeLists.txt # Build configuration
```

__*Hint:*__
>For folder names, always use lowercase letters and underscores or dashes instead of spaces,
>to avoid compatibility issues on different operating systems.
