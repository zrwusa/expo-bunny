# expo-react-bunny
We don't want a complicated project, what we want is a collection of samples based on cutting-edge technologies.


![Demo](https://raw.githubusercontent.com/zrwusa/assets/master/images/ad.gif)
![Products](https://raw.githubusercontent.com/zrwusa/assets/master/images/ad-10-sec-16m.gif)


# Architecture principles
## Type Safety

Critical bugs reported during the application runtime. Most of the time the bug involved calling a function with wrong parameters. 

Although it can be solved by rigorous unit tests, but let's face it, we can not assure 100% test coverage and even then 100% cases being considered.
 
So, it can turn out to be a million-dollar mistake. When I switched to TypeScript from plain Javascript then this problem got resolved.

<!--## Separation of Concern
## Feature Encapsulation
## Better Error Handling
## Better Response Handling
## Better Promise Management-->
<!--## Robust Unit Tests-->
## Simple Deployability

<!--## SOLID patterns,UML diagram-->




# Tech Stack

- React Native,
- Typescript,
- Redux,
- Expo,
- Firbase
- Next.js for deploying




# Principles

### 1.Don’t repeat yourself (DRY) 

### 2.Do one thing (DOT) (from Unix philosophy) 

### 3.Separation of concerns 

### 4.The principle of the least knowledge (Law of Demeter)


<table>
<thead><tr><th>Feature</th><th>Desc</th></tr></thead>
<tbody>
<tr><td>Expo</td><td>  </td></tr>
<tr><td>Next.js Deploying</td><td>  </td></tr>
<tr><td>Google Email Auth</td><td>  </td></tr>
<tr><td>Firebase OTP Auth</td><td>  </td></tr>
<tr><td>Firebase Auth</td><td>  </td></tr>
<tr><td>Firebase Google Auth</td><td>  </td></tr>
<tr><td>Firebase Facebook Auth</td><td>  </td></tr>
<tr><td>React Redux Firebase</td><td>  </td></tr>
<tr><td>JWT Auth</td><td>  </td></tr>
<tr><td>I18n</td><td>  </td></tr>
<tr><td>RTL</td><td>  </td></tr>
<tr><td>Theme Changing</td><td>  </td></tr>
<tr><td>React Native Vector Icons</td><td>  </td></tr>
<tr><td>React Navigation (Stack,Tab,Drawer,Nested,Route Params)</td><td>  </td></tr>
<tr><td>Redux Thunk</td><td>  </td></tr>
<tr><td>Map</td><td>  </td></tr>
<tr><td>Push Notification</td><td>  </td></tr>
<tr><td>React Native Components All In One</td><td></td></tr>
<tr><td>Mock RESTFul Server</td><td></td></tr>
<tr><td>Https localhost Self Signed Certification</td><td></td></tr>
</tbody>
</table>




# Preview

## Online Simples
[Expo online deployed stable](https://expo.io/@zrwusa/projects/expo-react-bunny)

[Web Next.js online deployed stable](https://expo-react-bunny-akodd3mj6-zrwusa.vercel.app)

[Web Next.js online deployed latest](https://expo-react-bunny.vercel.app)

Test Account:

username:  test@gmail.com 

password:  testtest

## Downloads
[App iOS for simulator stable](https://expo.io/artifacts/6a35db9b-add3-4354-8a8a-aae443c27054)

```sh
gunzip -c expo-react-bunny-9ed62349-af09-4cf9-8a33-d52cdd3c01a4-simulator.tar.gz | tar xopf -
// start your simulator first
xcrun simctl install booted ./expo-react-bunny.app
xcrun simctl launch booted com.zrwusa.expo-react-bunny
```

[App Android apk stable](https://expo.io/artifacts/9c50a817-aa38-4dbd-83b3-1fb07073b3b4)
```sh
// start your emulator
// drag the downloaded apk file to emulator
```




# Installation & Dev
## Installation
### For Expo
```sh
// with yarn
yarn
yarn dev

// with npm
npm install
npm dev
```
## Development

### Mock server
```sh
// with yarn
yarn mock

// with npm
npm run mock
```
### BackEnd server
I also provided a complete standard KOA backend,including RESTFul API,push notification feature and MongoDB access
[react-bunny-server](https://github.com/zrwusa/react-bunny-server)

### Local web server
```sh
yarn build:web
yarn web:serve
```



<!--
## File Structure
```shell
Expo Firebase Starter
├── assets ➡️ All static assets
├── components ➡️ All re-suable UI components for form screens
│   └── Firebase ➡️ Firebase related config directory
│       └── firebaseConfig.js ➡️ Firebase API keys
│       └── firebase.js ➡️ Firebase app initialization & authentication helper methods
│   └── Forms ➡️ Reusable form components
│       └── Form.js ➡️ Reusable Form wrapper to apply Formik
│       └── FormButton.js ➡️ Reusable button component that handles form submit using Formik context hook
│       └── FormErrorMessage.js ➡️ Reusable component to display server errors from Firebase
│       └── FormField.js ➡️ Reusable TextInput component
│   └── AppButton.js ➡️ Button component
│   └── AppTextInput.js ➡️ TextInput component
│   └── IconButton.js ➡️ Button with icon only component
│   └── SafeView.js ➡️ SafeAreaView wrapper component
│   └── Spinner.js ➡️ Loading indicator component
├── hooks ➡️ All custom hook components
│   └── useStatusBar.js ➡️ A custom hook based on @react-navigation library to animate the status bar style changes
├── navigation
│   └── AppStack.js ➡️ Protected routes such as Home screen
│   └── AuthStack.js ➡️ Routes such as Login screen, when the user is not authenticated
│   └── AuthUserProvider.js ➡️ An Auth User Context component that shares Firebase user object when logged-in
│   └── navigationTheme.js ➡️ A default theme for navigation components
│   └── Routes.js ➡️ Switch between Auth and App stacks based on Firebase user logged-in state
├── screens
│   └── ForgotPassword.js ➡️ Forgot Password screen component
│   └── HomeScreen.js ➡️ Protected route/screen component
│   └── LoginScreen.js ➡️ Login screen component
│   └── RegisterScreen.js ➡️ Register screen component
│   └── WelcomeScreen.js ➡️ Initial screen component
├── utils
│   └── colors.js ➡️ Default, reusable values across the app
├── App.js ➡️ Entry Point for Mobile apps
├── app.json ➡️ Expo config file
└── babel.config.js ➡️ Babel config (should be using `babel-preset-expo`)
```
-->

### For responsive development

Just configure the dimensions size used by the designer, "size-labor" provider will automatically be compatible different devices

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

in your pages or styles

```javascript
    const {designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    <View style={{width:wp(100),height:wp(100)}}></View>
```

ms: measure util defined sizes for styles(recommend use this to keep consistency)

wp: width to DP based on your designs

hp: height to DP based on your designs

You can define multiple design configurations, because your designs are often not designed by the same designer

### For Firebase & Google API
Create a .env file at project root path

---.env  start

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

Download your GoogleService-Info.plist for iOS from your Firebase Console to project root path

Download your google-services.json for Android from your Firebase Console to project root path

### For Next.js
```sh
// with npm
npm install
npm next

// with yarn
yarn
yarn next
```




# Theories
1."Premature optimization is the root of all evil (or at least most of it) in programming."--— Donald Knuth, “Computer Programming as an Art” (1974).

2."The remaining 10 percent of the code accounts for the other 90 percent of the development time."--— Tom Cargill, Bell Labs.


## Architecture benefits
 Architecture is necessary to save time during the development process, to maintain the system’s testability and extensibility over a long development period.
 
 
 If our project is even 50% cheaper to maintain than it could be without a good architecture — it will save developers’ time and customer’s profit.
 Building a good and clear architecture from the start of the project gives you the following benefits:
 
 1.costs:cheaper code maintenance (less time is required and cheaper financial costs);
 
 2.test:simplification of code testing (you will need fewer testers and have fewer missed “production bugs”);
 
 3.developer:easier to involve new developers into the project.
