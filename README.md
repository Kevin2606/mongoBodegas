# Mongo Bodegas 🎁🎪

## Instalacion y uso
Para hacer uso de **mongoBodegas**  se debe tener instalado [GIT](https://git-scm.com/), [Node.js](https://nodejs.org/es/)

### Clonar el repositorio
```bash
git clone https://github.com/Kevin2606/mongoBodegas.git
```
> Una vez clonado el repositorio accede a la carpeteta del proyecto
### Instalar dependencias
```bash
npm install
```
### Configurar variables de entorno
Crear un archivo .env en la raiz del proyecto
```bash
touch .env
```
> Nota: Este comando solo funciona en sistemas operativos basados en Unix.
> Si estas en Windows puedes crear el archivo .env desde el explorador de archivos

Una vez creado el archivo .env, accede a el desde un editor de texto
Agregar las siguientes variables de entorno
```bash
ATLAS_USER = "root"
ATLAS_PASSWORD = ""
ATLAS_DB = ""
PORT = 3000
JWT_SECRET="secret"
```
> Nota: En el campo hostname y port de SERVER se recomienda en el hostname dejar el valor de "localhost" y en el port se puede cambiar a un puerto que no este en uso, por ejemplo 8080, 3000, 5000, etc. El rango de puertos disponibles es de 0 a 65535, se recomienda no utilizar los puertos reservados que van del 0 al 1023, para mas informacion sobre los puertos reservados [click aqui](https://es.wikipedia.org/wiki/Anexo:Puertos_de_red_utilizados_por_protocolos_de_transporte)
>
> Nota: En el campo ATLAS_USER y ATLAS_PASSWORD se debe agregar el usuario y contraseña de la base de datos, si se usa el archivo .env.example se debe cambiar el valor de USER y PASSWORD por los valores de la base de datos que se encuentra en la nube.
> 
> Nota: En el campo JWT_SECRET se debe agregar una cadena de texto que sera utilizada para la generacion de tokens JWT, esta cadena de texto puede ser cualquiera, como el que esta por ejemplo: "secret".

>**Cada cambio en las variables de entorno requiere reiniciar el servidor para que los cambios surtan efecto.**

### Base de datos
En la carpeta **database** se encuentra el archivo **query.mongodb** que contiene el script para crear la base de datos y las tablas necesarias para el funcionamiento del proyecto. Tambien puedes optar por usar el archivo **.env.example** que contiene las variables de entorno necesarias para la conexion a la base de datos, solo debes cambiar el nombre del archivo a **.env** y esta te conectara a la base de datos que se encuentra en la nube.


### Iniciar el servidor
Para iniciar el servidor se debe ejecutar en la terminal para iniciar el servidor.

```bash
npm run dev
```

### Uso de la plataforma
Para hacer uso de la plataforma se debe contar con herramientas informaticas para la realizacion de pruebas de api como **[Thunder Client](https://www.thunderclient.com/)** o **[Postman](https://www.postman.com/)**, ademas necesitas obtener un token de autenticacion, para esto se debe hacer una peticion GET a la ruta **/token** con la query tabla y especificar a que tabla se quiere hacer la peticion. 
El siguiente ejemplo muestra como obtener un token de autenticacion para la tabla usuarios.

### Obtener token de autenticacion
```bash
GET /token
```
El token de autenticacion sera necesario para cada endpoint listado en la seccion siguiente, para hacer uso de estos endpoints se debe agregar el token de autenticacion en el header de la peticion con el nombre **Authorization**.
> Nota: El token de autenticacion tiene una duracion de 1 hora, despues de este tiempo se debe volver a solicitar un nuevo token.

### Endpoints

| Método | Ruta                                       | Descripción                                      |
|--------|--------------------------------------------|--------------------------------------------------|
| GET    | `/bodegas`                        | Listar todas las bodegas ordenadas alfabéticamente          |
| POST    | `/bodegas`         | Permite crear una bodegas.   |
| GET    | `/productos/productos-order-total`               | listar todos los productos en orden descendente por el campo "Total". |
| POST    | `/productos`               | Inserta un producto y a su vez asigna una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default. |
| GET    | `/inventarios`             | Permite insertar registros en la tabla de inventarios |
| GET    | `/traslados`           | Permite trasladar un producto de una bodega a otra |


## Autor

- Kevin Gallardo - [@Kevin2606](https://github.com/Kevin2606)
