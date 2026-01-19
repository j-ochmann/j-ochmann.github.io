---
layout: default
title: git
content_hash: 4b292a895a9d5dd88aba53e8d3ff85cc
translation_status: translated
source_hash: 4b292a895a9d5dd88aba53e8d3ff85cc
translated_from: cs
---
#Git

## Instalación (Debian)
```golpecito
actualización sudo apta
sudo apto instalar git
```
## Creando un repositorio local
Vaya al directorio de su proyecto:
```golpecito
cd /ruta/a/su/proyecto
git init # Inicializa Git en el proyecto
git agregar. # Agrega todos los archivos al área de "ensayo"
git commit -m "Compromiso inicial del proyecto"
```
## Creando un repositorio en GitHub
Inicie sesión en GitHub. Haga clic en el nuevo repositorio "Nuevo repositorio" y asígnele un nombre. 
### Vincular y cargar en GitHub
Copie y pegue la URL de su repositorio de GitHub.
```golpecito
git remoto agregar origen github.com:user/repository.git
```
Envíe (cargue) el código local a GitHub:
```golpecito
git push -u origin main # o master, dependiendo del nombre de la rama principal
```
Si el nombre de la sucursal no coincide, puede aparecer un error:
```golpecito
error: src refspec main no coincide con ninguno
error: no se pudieron enviar algunas referencias a 'github.com:user/repository.git'
```
Solución cambiando el nombre de la rama actual master a main:
```golpecito
rama git -M principal
```
Tenga en cuenta la advertencia de confirmación.
- Git configura automáticamente el correo electrónico.
- Si desea que GitHub se comprometa a mostrar su tarjeta de presentación y foto de perfil correctas, solucione esto:
  
```golpecito
git config --global user.name "tu nombre"
git config --global usuario.email "vas@email.com"
git commit --amend --reset-autor
```

## Paso 5: Configuración SSH (recomendado)
Generar una clave SSH: 
```golpecito
ssh-keygen -t ed25519 -C "tu@correo electrónico.com".
```
- Copie el contenido del archivo ~/.ssh/id_ed25519.pub.
- Pon la clave en la configuración de GitHub (Configuración -> Claves SSH y GPG).
- Después de configurar SSH, puedes usar git@github.com:user/repository.git en lugar de HTTPS.
