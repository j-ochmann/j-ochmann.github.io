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
