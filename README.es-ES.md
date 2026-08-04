# expo-react-bunny

Escribe una vez y ejecútalo en todas partes: iOS, Android y la web. Sabemos que no quieres un proyecto complicado, sino una colección de ejemplos basados en tecnologías de vanguardia. ¡Tu satisfacción es mi objetivo!

![Demo](https://raw.githubusercontent.com/zrwusa/assets/master/images/ad.gif)
![Productos](https://raw.githubusercontent.com/zrwusa/assets/master/images/ad-10-sec-16m.gif)


# Principios de arquitectura
## Seguridad de tipos

Se reportan errores críticos durante la ejecución de la aplicación. La mayoría de las veces, estos errores se deben a la llamada a una función con parámetros incorrectos.

Aunque esto se puede resolver con pruebas unitarias rigurosas, la realidad es que no podemos garantizar una cobertura de pruebas del 100 % y, aunque lo lográramos, no siempre se cubren todos los casos.

Por ello, este problema puede convertirse en un error millonario. Cuando pasé de JavaScript puro a TypeScript, este problema se solucionó.

<!--## Separación de preocupaciones
## Encapsulación de funciones
## Mejor manejo de errores
## Mejor manejo de respuestas
## Mejor gestión de promesas-->
<!--## Pruebas unitarias robustas-->
## Simplicidad de implementación

<!--## Patrones SOLID, diagrama UML-->


# Tecnologías utilizadas

- React Native
- TypeScript
- Redux
- Expo
- Firebase
- Next.js para implementación web


# Principios

### 1. No te repitas (DRY)

### 2. Haz una cosa (DOT) (según la filosofía de Unix)

### 3. Separación de preocupaciones

### 4. Principio de la conocimiento mínimo (Ley de Deméter)


| Característica | Descripción |
|--------------|-------------|
| Expo |  |
| Implementación en Next.js |  |
| Autenticación con correo electrónico de Google |  |
| Autenticación OTP de Firebase |  |
| Autenticación de Firebase |  |
| Autenticación de Google con Firebase |  |
| Autenticación de Facebook con Firebase |  |
| React Redux Firebase |  |
| Autenticación JWT |  |
| Internacionalización (I18n) |  |
| Diseño de derecha a izquierda (RTL) |  |
| Cambio de tema |  |
| Iconos de React Native Vector |  |
| React Navigation (Stack, Tab, Drawer, Nested, Route Params) |  |
| Redux Thunk |  |
| React Native Web |  |
| Mapa |  |
| Notificaciones push |  |
| Componentes de React Native Todo en Uno |  |
| Servidor RESTFul |  |
| Certificado HTTPS auto firmado para localhost |  |

# Entorno/Dependencias

| Dependencia | Versión | Consejos |
|--------------|---------|---------|
| Node.js | v15.0.1 | Es recomendable usar NVM para gestionar diferentes versiones de Node.js |
| expo | 41.0.0 |  |

# Versión de JavaScript
[Si no usas TypeScript, utiliza JavaScript](https://github.com/zrwusa/expo-bunny-js)

# Vista previa

## Prototipos en línea
[Expo (estable) implementado en línea](https://expo.io/@zrwusa/projects/expo-react-bunny)

[Web Next.js (estable) implementado en línea](https://expo-react-bunny-jlbcujxu2-zrwusa.vercel.app)

[Web Next.js (última versión) implementado en línea](https://expo-react-bunny.vercel.app)

Cuenta de prueba:

Usuario: test@gmail.com

Contraseña: testtest

## Descargas
[Aplicación iOS para simulador (estable)](https://expo.io/artifacts/6a35db9b-add3-4354-8a8a-aae443c27054)

```sh
gunzip -c expo-react-bunny-9ed62349-af09-4cf9-8a33-d52cdd3c01a4-simulator.tar.gz | tar xopf -
// Inicia tu simulador primero
xcrun simctl install booted ./expo-react-bunny.app
xcrun simctl launch booted com.zrwusa.expo-react-bunny
```

[Aplicación Android (APK) (estable)](https://expo.io/artifacts/9c50a817-aa38-4dbd-83b3-1fb07073b3b4)
```sh
// Inicia tu emulador
// Arrastra el archivo APK descargado al emulador
```


# Instalación y desarrollo
## Instalación
### Para Expo
```sh
// Con Yarn
yarn
yarn dev

// Con npm
npm install
npm dev
```
## Desarrollo

### Servidor de simulación
```sh
// Con Yarn
yarn mock

// Con npm
npm run mock
```
### Servidor backend

También proporcionamos un backend estándar en TypeScript con Express.
Typescript + Express + Docker + Postgres + MongoDB + Redis + Nginx + Swagger + Prom-client
[Servidor RESTFul](https://github.com/zrwusa/bunny-rest)

### Servidor web local
```sh
yarn build:web
yarn web:serve
```




<!--
## Estructura de archivos
```shell
Expo Firebase Starter
├── assets ➡️ Todos los recursos estáticos
├── components ➡️ Todos los componentes de interfaz de usuario reutilizables para pantallas de formulario
│   └── Firebase ➡️ Directorio relacionado con Firebase
│       └── firebaseConfig.js ➡️ Claves API de Firebase
│       └── firebase.js ➡️ Inicialización de la aplicación Firebase y métodos de ayuda para la autenticación
│   └── Forms ➡️ Componentes de formulario reutilizables
│       └── Form.js ➡️ Envoltura de formulario reutilizable para aplicar Formik
│       └── FormButton.js ➡️ Componente de botón reutilizable que maneja el envío del formulario usando el hook de contexto de Formik
│       └── FormErrorMessage.js ➡️ Componente reutilizable para mostrar errores del servidor desde Firebase
│       └── FormField.js ➡️ Componente TextInput reutilizable
│   └── AppButton.js ➡️ Componente de botón
│   └── AppTextInput.js ➡️ Componente TextInput
│   └── IconButton.js ➡️ Componente de botón con solo icono
│   └── SafeView.js ➡️ Componente envoltorio SafeAreaView
│   └── Spinner.js ➡️ Componente de indicador de carga
├── hooks ➡️ Todos los hooks personalizados
│   └── useStatusBar.js ➡️ Un hook personalizado basado en la biblioteca @react-navigation para animar los cambios de estilo de la barra de estado
├── navigation
│   └── AppStack.js ➡️ Rutas protegidas como la pantalla de inicio
│   └── AuthStack.js ➡️ Rutas como la pantalla de inicio de sesión, cuando el usuario no está autenticado
│   └── AuthUserProvider.js ➡️ Un componente de contexto de usuario de autenticación que comparte el objeto de usuario de Firebase cuando está conectado
│   └── navigationTheme.js ➡️ Un tema predeterminado para los componentes de navegación
│   └── Routes.js ➡️ Cambio entre pilas de autenticación y aplicación basado en el estado de inicio de sesión del usuario de Firebase
├── screens
│   └── ForgotPassword.js ➡️ Componente de pantalla de recuperación de contraseña
│   └── HomeScreen.js ➡️ Componente de ruta/pantalla protegida
│   └── LoginScreen.js ➡️ Componente de pantalla de inicio de sesión
│   └── RegisterScreen.js ➡️ Componente de pantalla de registro
│   └── WelcomeScreen.js ➡️ Componente de pantalla inicial
├── utils
│   └── colors.js ➡️ Valores predeterminados y reutilizables en toda la aplicación
├── App.js ➡️ Punto de entrada para aplicaciones móviles
├── app.json ➡️ Archivo de configuración de Expo
└── babel.config.js ➡️ Configuración de Babel (debe estar usando `babel-preset-expo`)
```
-->

### Para desarrollo basado en diseño adaptativo

Solo configura el tamaño utilizado por el diseñador, y el proveedor "size-labor" será automáticamente compatible con diferentes dispositivos.

src/config.json

  "UE": {
    "dimensions": {
      "DesignName": {
        "width": 360,
        "height": 640
      }
      ...
    }
  }

en tus páginas o estilos:

```javascript
    const {designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    <View style={{width:wp(100),height:wp(100)}}></View>
```

ms: utilidad de medición para definir tamaños en estilos (recomendado para mantener la consistencia)

wp: ancho a DP basado en tus diseños

hp: altura a DP basado en tus diseños

Puedes definir múltiples configuraciones de diseño, ya que tus diseños a menudo no son creados por el mismo diseñador.

### Para Firebase y API de Google
Crea un archivo .env en la raíz del proyecto:

---.env start

IOS_CLIENT_ID_FOR_EXPO=111111111111-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
ANDROID_CLIENT_ID_FOR_EXPO=111111111111-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
IOS_CLIENT_ID=111111111111-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
ANDROID_CLIENT_ID=111111111111-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
                  
GOOGLE_API_KEY=xxxxxxxxxxxxx_xxxxxxx_xxxxxxxxxxxxxxxxx
FACEBOOK_APP_ID=1111111111111111
                 
FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxxx
FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxx..firebaseapp.com
FIREBASE_DATABASE_URL=https://xxxxxxxxxxxxxxxxxxxxxxxx-rtdb.firebaseio.com
FIREBASE_APP_ID_IOS=1:111111111111:ios:xxxxxxxxxxxxxxxxxxxxxx
FIREBASE_APP_ID_WEB=1:111111111111:web:xxxxxxxxxxxxxxxxxxxxxx
FIREBASE_APP_ID_ANDROID=1:111111111111:android:xxxxxxxxxxxxxxxxxxxxxx
FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxxx.appspot.com
FIREBASE_MESSAGING_SENDER_ID=111111111111
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

---.env end

Descarga tu GoogleService-Info.plist para iOS desde tu consola de Firebase en la raíz del proyecto.

Descarga tu google-services.json para Android desde tu consola de Firebase en la raíz del proyecto.

### Para Next.js
```sh
// Con npm
npm install
npm next

// Con Yarn
yarn
yarn next
```




# Teorías
1. "La optimización prematura es la raíz de todos los males (o al menos de la mayoría) en la programación".— Donald Knuth, "La programación de computadoras como arte" (1974).

2. "El 10 % restante del código representa el otro 90 % del tiempo de desarrollo".— Tom Cargill, Bell Labs.

| Ámbito | Teoría |
|--------|--------|
| JavaScript | IIFEs para encapsular código en un ámbito local y evitar que las variables se filtren al ámbito global. |

## Beneficios de la arquitectura
La arquitectura es esencial para ahorrar tiempo durante el proceso de desarrollo y para mantener la capacidad de prueba y la extensibilidad del sistema a largo plazo.

Si nuestro proyecto es al menos un 50 % más económico de mantener que uno sin una buena arquitectura, ahorraremos tiempo a los desarrolladores y generaremos beneficios para los clientes.

Construir una arquitectura clara y sólida desde el inicio del proyecto ofrece los siguientes beneficios:

1. Costos: mantenimiento de código más barato (requiere menos tiempo y menores gastos financieros).

2. Pruebas: simplificación de las pruebas de código (necesitarás menos probadores y detectarás menos errores de producción).

3. Desarrollador: más fácil involucrar a nuevos desarrolladores en el proyecto.
