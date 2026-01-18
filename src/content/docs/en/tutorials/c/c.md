--- 
title: C Cheat Sheet
---
## 1️⃣ Install C compiler (gcc)

Open terminal and type:
```bash
sudo apt update
sudo apt install build-essential
```
The build-essential package includes:
- gcc (C compiler)
- make
- basic libraries and headers
  
Verify:
```bash
gcc --version
```
## 2️⃣ Create a source file
E.g., file hello_world.c:
```bash
nano hello_world.c
```

Write into it:
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
  
## 3️⃣ Compile the program
In the same directory, run:

```bash
gcc hello_world.c -o hello_world
```

What happened:
- hello_world.c → source file
- -o hello_world → resulting executable file hello_world

Check:

```bash
ls
```

There should be a file named hello_world

## 4️⃣ Run the program

```bash
./hello_world
```

Output:

```bash
Hello, world!
```

## 5️⃣ (Optional) Compile with warnings – recommended

For good habits:

```bash
gcc -Wall -Wextra -Werror hello_world.c -o hello_world
```

This will force you to write clean and safe C code.

## 6️⃣ What's good to know right from the start
- main always returns int
- `return 0;` = program finished OK
- `stdio.h` is the standard library for input/output
- `./` tells the shell "run the file from the current directory"

```bash
nano read_number.c
```

<!-- file: read_number.c -->
```c
#include <stdio.h>
int main (void)
{
    int cislo;
    printf("Enter an integer: ");
    scanf("%d",&cislo);
    printf("You entered: %d\n", cislo);
    return 0;
}
```

## Recommended project structure

If you want to organize your project professionally, a standard layout looks like this: 

```text
projekt/
├── docs/                # Main project documentation
│   ├── tutorials/       # Tutorials in .md files
│   └── examples_src/    # .md files from which you generate code
├── examples/            # Resulting generated .c files (examples)
├── scripts/             # Scripts (Python/Bash) that perform generation
├── external/            # MD4C and other libraries
├── src/             # Your source code (.c, .cpp)
├── include/         # Your header files (.h)
├── external/        # External libraries (e.g., md4c)
│   └── md4c/
│       ├── md4c.h
│       └── md4c.c
├── build/           # Compilation outputs (ignore in git)
└── CMakeLists.txt   # Build configuration
```

__*Tip:*
>Always use lowercase letters for folder names and underscores or hyphens instead of spaces,
to avoid compatibility issues on different operating systems.
