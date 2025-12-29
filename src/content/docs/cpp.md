---
id: cpp_quick_reference
title: "C++ QUICK REFERENCE"
sidebar:
  label: C++ Quick Reference
  order: 1
category: programming
tags: [cpp, programming]
---
## PREPROCESSOR

```cpp
                    // Comment to end of line
                    /* Multi-line comment */
#include <stdio.h>  // Insert standard header file
#include "myfile.h" // Insert file in current directory
#define X some text // Replace X with some text
#define F(a,b) a+b  // Replace F(1,2) with 1+2
#define X \
  some text         // Line continuation
#undef X            // Remove definition
#if defined(X)      // Condional compilation (#ifdef X)
#else               // Optional (#ifndef X or #if !defined(X))
#endif              // Required after #if, #ifdef
```

## LITERALS

```cpp
255, 0377, 0xff             // Integers (decimal, octal, hex)
2147483647L, 0x7fffffffl    // Long (32-bit) integers
123.0, 1.23e2               // double (real) numbers
'a', '\141', '\x61'         // Character (literal, octal, hex)
'\n', '\\', '\'', '\"'      // Newline, backslash, single quote, double
quote
"string\n"                  // Array of characters ending with newline and
\0
"hello" "world"             // Concatenated strings
true, false                 // bool constants 1 and 0
```

## DECLARATIONS

```cpp
int x;                  // Declare x to be an integer (value undefined)
int x=255;              // Declare and initialize x to 255
short s; long l;        // Usually 16 or 32 bit integer (int may be either)
char c='a';             // Usually 8 bit character
unsigned char u=255; signed char s=-1; // char might be either
unsigned long x=0xffffffffL;           // short, int, long are signed
float f; double d;      // Single or double precision real (never unsigned)
bool b=true;            // true or false, may also use int (1 or 0)
int a, b, c;            // Multiple declarations
int a[10];              // Array of 10 ints (a[0] through a[9])
int a[]={0,1,2};        // Initialized array (or a[3]={0,1,2}; )
int a[2][3]={{1,2,3},{4,5,6}}; // Array of array of ints
char s[]="hello";       // String (6 elements including '\0')
int* p;                 // p is a pointer to (address of) int
char* s="hello";        // s points to unnamed array containing "hello"
void* p=NULL;           // Address of untyped memory (NULL is 0)
int& r=x;               // r is a reference to (alias of) int x
enum weekend {SAT,SUN}; // weekend is a type with values SAT and SUN
enum weekend day;       // day is a variable of type weekend
enum weekend {SAT=0,SUN=1}; // Explicit representation as int
enum {SAT,SUN} day;     // Anonymous enum
typedef String char*;   // String s; means char* s;
const int c=3;          // Constants must be initialized, cannot assign to
const int* p=a;         // Contents of p (elements of a) are constant
int* const p=a;         // p (but not contents) are constant
const int* const p=a;   // Both p and its contents are constant
const int& cr=x;        // cr cannot be assigned to change x
```

## STORAGE CLASSES

```cpp

```

## STATEMENTS

```cpp

```

## FUNCTIONS

```cpp

```

## EXPRESSIONS

```cpp

```

## CLASSES

```cpp

```

## TEMPLATES

```cpp

```

## NAMESPACES

```cpp

```

## C/C++ STANDARD LIBRARY

```cpp

```

## STDIO.H, CSTDIO (Input/output)

```cpp

```

## STDLIB.H, CSTDLIB (Misc. functions)

```cpp

```

## STRING.H, CSTRING (Character array handling functions)

```cpp

```

## CTYPE.H, CCTYPE (Character types)

```cpp

```

## MATH.H, CMATH (Floating point math)

```cpp

```

## TIME.H, CTIME (Clock)

```cpp

```

## ASSERT.H, CASSERT (Debugging aid)

```cpp

```

## NEW.H, NEW (Out of memory handler)

```cpp

```

## IOSTREAM.H, IOSTREAM (Replaces stdio.h)

```cpp

```

## FSTREAM.H, FSTREAM (File I/O works like cin, cout as above)

```cpp

```

## IOMANIP.H, IOMANIP (Output formatting)

```cpp

```

## STRING (Variable sized character array)

```cpp

```

## VECTOR (Variable sized array/stack with built in memory allocation)

```cpp

```

## DEQUE (array/stack/queue)

```cpp

```

## UTILITY (Pair)

```cpp

```

## MAP (associative array)

```cpp

```

## ALGORITHM (A collection of 60 algorithms on sequences with iterators)

```cpp

```
