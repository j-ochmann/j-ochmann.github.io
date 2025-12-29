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
int x;          // Auto (memory exists only while in scope)
static int x;   // Global lifetime even if local scope
extern int x;   // Information only, declared elsewhere
```

## STATEMENTS

```cpp
x=y;
int x;
;// Every expression is a statement
// Declarations are statements
// Empty statement
{// A block is a single statement
// Scope of x is from declaration to end of
int x;
block
a;
}
if (x) a;
else if (y) b;
else c;// If x is true (not 0), evaluate a
// If not x and y (optional, may be repeated)
// If not x and not y (optional)
while (x) a;// Repeat 0 or more times while x is true
for (x; y; z) a;// Equivalent to: x; while(y) {a; z;}
do a; while (x);// Equivalent to: a; while(x) a;
switch (x) {
case X1: a;
case X2: b;
default: c;
}
break;
continue;
return x;
try { a; }
catch (T t) { b; }
catch (...) { c; }
// x must be int
// If x == X1 (must be a const), jump here
// Else if x == X2, jump here
// Else jump here (optional)
// Jump out of while, do, or for loop, or switch
// Jump to bottom of while, do, or for loop
// Return x from function to caller
// If a throws a T, then jump here
// If a throws something else, jump here
```

## FUNCTIONS

```cpp
int f(int x, int);
int
void f();
void f(int a=0);
f();
inline f();
f() { statements; }
T operator+(T x, T y);
T operator-(T x);
T operator++(int);
extern "C" {void f();}
// f is a function taking 2 ints and returning
// f is a procedure taking no arguments
// f() is equivalent to f(0)
// Default return type is int
// Optimize for speed
// Function definition (must be global)
// a+b (if type T) calls operator+(a, b)
// -a calls function operator-(a)
// postfix ++ or -- (parameter ignored)
// f() was compiled in C
```

Function parameters and return values may be of any type. A function must either be declared or defined before it is used. It may be declared first and defined later. Every program consists of a set of a set of global variable declarations and a set of function definitions (possibly in separate files), one of which must be:

```cpp
int main() { statements... }
or
int main(int argc, char* argv[]) { statements... }
```

argv is an array of argc strings from the command line. By convention, main returns status 0 if successful, 1 or higher for errors.

Functions with different parameters may have the same name (overloading). Operators except `:: . .* ?:` may be overloaded. Precedence order is not affected. New operators may not be created.

## EXPRESSIONS

Operators are grouped by precedence, highest first. Unary operators and assignment evaluate right to left. All others are left to right. Precedence does not affect order of evaluation, which is undefined. There are no run time checks for arrays out of bounds, invalid pointers, etc.

```cpp
T::X
// Name X defined in class T
N::X
// Name X defined in namespace N
::X
// Global name X
t.x
p->x
a[i]
f(x,y)
T(x,y)
x++
x--
typeid(x)
typeid(T)
dynamic_cast<T>(x)
static_cast<T>(x)
reinterpret_cast<T>(x)
const_cast<T>(x)// Member x of struct or class t
// Member x of struct or class pointed to by p
// i'th element of array a
// Call to function f with arguments x and y
// Object of class T initialized with x and y
// Add 1 to x, evaluates to original x (postfix)
// Subtract 1 from x, evaluates to original x
// Type of x
// Equals typeid(x) if x is a T
// Converts x to a T, checked at run time
// Converts x to a T, not checked
// Interpret bits of x as a T
// Converts x to same type T but not const
sizeof x
sizeof(T)
++x
--x
~x
!x
-x
+x
&x
*p
new T
new T(x, y)
new T[x]
delete p
delete[] p
(T) x// Number of bytes used to represent object x
// Number of bytes to represent type T
// Add 1 to x, evaluates to new value (prefix)
// Subtract 1 from x, evaluates to new value
// Bitwise complement of x
// true if x is 0, else false (1 or 0 in C)
// Unary minus
// Unary plus (default)
// Address of x
// Contents of address p (*&x equals x)
// Address of newly allocated T object
// Address of a T initialized with x, y
// Address of allocated n-element array of T
// Destroy and free object at address p
// Destroy and free array of objects at p
// Convert x to T (obsolete, use .._cast<T>(x))
x * y
x / y
x % y// Multiply
// Divide (integers round toward 0)
// Modulo (result has sign of x)
x + y
x - y// Add, or &x[y]
// Subtract, or number of elements from *x to *y
x << y
x >> y// x shifted y bits to left (x * pow(2, y))
// x shifted y bits to right (x / pow(2, y))
x < y
x <= y
x > y
x >= y// Less than
// Less than or equal to
// Greater than
// Greater than or equal to
x == y
x != y// Equals
// Not equals
x & y// Bitwise and (3 & 6 is 2)
x ^ y// Bitwise exclusive or (3 ^ 6 is 5)
x | y// Bitwise or (3 | 6 is 7)
x && y// x and then y (evaluates y only if x (not 0))
x || y
(0))// x or else y (evaluates y only if x is false
x = y
x += y// Assign y to x, returns new value of x
// x = x + y, also -= *= /= <<= >>= &= |= ^=
x ? y : z// y if x is true (nonzero), else z
throw x// Throw exception, aborts if not caught
x , y// evaluates x and y, returns y (seldom used)
```

## CLASSES

```cpp
class T {
// A new type
private:
// Section accessible only to T's member
functions
protected:
// Also accessable to classes derived from T
public:
// Accessable to all
int x;
// Member data
void f();
// Member function
void g() {return;}
// Inline member function
void h() const;
// Does not modify any data members
int operator+(int y);
// t+y means t.operator+(y)
int operator-();
// -t means t.operator-()
T(): x(1) {}
// Constructor with initialization list
T(const T& t): x(t.x) {} // Copy constructor
T& operator=(const T& t) {x=t.x; return *this; } // Assignment operator
~T();
// Destructor (automatic cleanup routine)
explicit T(int a);
// Allow t=T(3) but not t=3
operator int() const {return x;} // Allows int(t)
friend void i();
// Global function i() has private access
friend class U;
// Members of class U have private access
static int y;
// Data shared by all T objects
static void l();
// Shared code. May access y but not x
class Z {};
// Nested class T::Z
typedef int V;
// T::V means int
};
void T::f() {
// Code for member function f of class T
this->x = x;}
// this is address of self (means x=x;)
int T::y = 2;
// Initialization of static member (required)
T::l();
// Call to static member
```

## TEMPLATES

```cpp
template <class T> T f(T t);
// Overload f for all types
template <class T> class X {
// Class with type parameter T
X(T t); };
// A constructor
template <class T> X<T>::X(T t) {} // Definition of constructor
X<int> x(3);
// An object of type "X of int"
template <class T, class U=T, int n=0> // Template with default
```

## NAMESPACES

```cpp
namespace N {class T {};} // Hide name T
N::T t;
// Use name T in namespace N
using namespace N;
// Make T visible without N::
```

## C/C++ STANDARD LIBRARY

Only the most commonly used functions are listed. Header files without .h are in namespace std. File names are
actually lower case.

## STDIO.H, CSTDIO (Input/output)

```cpp
FILE* f=fopen("filename", "r"); // Open for reading, NULL (0) if error
// Mode may also be "w" (write) "a" append, "a+" update, "rb" binary
fclose(f);
// Close file f
fprintf(f, "x=%d", 3);
// Print "x=3" Other conversions:
"%5d %u %-8ld"
// int width 5, unsigned int, long left just.
"%o %x %X %lx"
// octal, hex, HEX, long hex
"%f %5.1f"
// float or double: 123.000000, 123.0
"%e %g"
// 1.23e2, use either f or g
"%c %s"
// char, char*
"%%"
// %
sprintf(s, "x=%d", 3);
// Print to array of char s
printf("x=%d”, 3);
// Print to stdout (screen unless redirected)
fprintf(stderr, ...
// Print to standard error (not redirected)
getc(f);
// Read one char (as an int) or EOF from f
ungetc(c, f);
// Put back one c to f
getchar();
// getc(stdin);
putc(c, f)
putchar(c);
fgets(s, n, f);
gets(s)
fread(s, n, 1, f);
fwrite(s, n, 1, f);
written
fflush(f);
fseek(f, n, SEEK_SET);
ftell(f);
rewind(f);
feof(f);
ferror(f);
perror(s);
clearerr(f);
remove("filename");
rename("old", "new");
f = tmpfile();
tmpnam(s);
// fprintf(f, "%c", c);
// putc(c, stdout);
// Read line into char s[n] from f. NULL if EOF
// fgets(s, INT_MAX, f); no bounds check
// Read n bytes from f to s, return number read
// Write n bytes of s to f, return number
// Force buffered writes to f
// Position binary file f at n
// Position in f, -1L if error
// fseek(f, 0L, SEEK_SET); clearerr(f);
// Is f at end of file?
// Error in f?
// Print char* s and error message
// Clear error code for f
// Delete file, return 0 if OK
// Rename file, return 0 if OK
// Create temporary file in mode "wb+"
// Put a unique file name in char s[L_tmpnam]
```

## STDLIB.H, CSTDLIB (Misc. functions)

```cpp
atof(s); atol(s); atoi(s);// Convert char* s to float, long, int
rand(), srand(seed);
// Random int 0 to RAND_MAX, reset rand()
void* p = malloc(n);
// Allocate n bytes. Obsolete: use new
free(p);
// Free memory. Obsolete: use delete
exit(n);
// Kill program, return status n
system(s);
// Execute OS command s (system dependent)
getenv("PATH");
// Environment variable or 0 (system dependent)
abs(n); labs(ln);
// Absolute value as int, long
```

## STRING.H, CSTRING (Character array handling functions)

Strings are type char[] with a '\0' in the last element used.

```cpp
strcpy(dst, src);
// Copy string. Not bounds checked
strcat(dst, src);
// Concatenate to dst. Not bounds checked
strcmp(s1, s2);
// Compare, <0 if s1<s2, 0 if s1==s2, >0 if
s1>s2
strncpy(dst, src, n);
// Copy up to n chars, also strncat(), strncmp()
strlen(s);
// Length of s not counting \0
strchr(s,c); strrchr(s,c);// Address of first/last char c in s or 0
strstr(s, sub);
// Address of first substring in s or 0
// mem... functions are for any pointer types (void*), length n bytes
memmove(dst, src, n);
// Copy n bytes from src to dst
memcmp(s1, s2, n);
// Compare n bytes as in strcmp
memchr(s, c, n);
// Find first byte c in s, return address or 0
memset(s, c, n);
// Set n bytes of s to c
```

## CTYPE.H, CCTYPE (Character types)

```cpp
isalnum(c);
isalpha(c); isdigit(c);
islower(c); isupper(c);
tolower(c); toupper(c);
// Is c a letter or digit?
// Is c a letter? Digit?
// Is c lower case? Upper case?
// Convert c to lower/upper case
```

## MATH.H, CMATH (Floating point math)

```cpp
sin(x); cos(x); tan(x);     // Trig functions, x (double) is in radians
asin(x); acos(x); atan(x);  // Inverses
atan2(y, x);                // atan(y/x)
sinh(x); cosh(x); tanh(x);  // Hyperbolic
exp(x); log(x); log10(x);   // e to the x, log base e, log base 10
pow(x, y); sqrt(x);         // x to the y, square root
ceil(x); floor(x);          // Round up or down (as a double)
fabs(x); fmod(x, y);        // Absolute value, x mod y
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
