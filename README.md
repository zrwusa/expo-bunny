# expo-react-bunny
I know you don't want a complicated project, what you want is a collection of samples based on cutting-edge technologies.Your happy use is my goal!

# Tech Stack
- React Native,
- Typescript,
- Redux,
- Expo,
- Next.js for deploying


<table>
<thead><tr><th>Feature</th><th>Desc</th></tr></thead>
<tbody>
<tr><td>Expo</td><td>  </td></tr>
<tr><td>Next.js Deploying</td><td>  </td></tr>
<tr><td>Google Auth</td><td>  </td></tr>
<tr><td>JWT Auth</td><td>  </td></tr>
<tr><td>I18n</td><td>  </td></tr>
<tr><td>RTL</td><td>  </td></tr>
<tr><td>Theme Changing</td><td>  </td></tr>
<tr><td>React Native Vector Icons</td><td>  </td></tr>
<tr><td>React Navigation (Stack,Tab,Drawer,Nested,Route Params)</td><td>  </td></tr>
<tr><td>Redux Thunk</td><td>  </td></tr>
<tr><td>Map</td><td>  </td></tr>
<tr><td>React Native Components All In One</td><td>  </td></tr>
<tr><td>Mock Server</td><td>  </td></tr>
<tr><td>Https localhost Self Signed Certification</td><td>  </td></tr>
</tbody>
</table>

                            1.Don’t repeat yourself (DRY)
                            2.Do one thing (DOT) (from Unix philosophy)
                            3.Separation of concerns
                            4.The principle of least knowledge (Law of Demeter)

## Installation
### For Expo
```sh
// with yarn
yarn
yarn start

// with npm
npm install
npm start
```

### For Next.js
```sh
// with npm
npm install
npm next dev

// with yarn
yarn
yarn next dev
```



## Online Simples
[Expo online deployed stable](https://expo.io/@zrwusa/projects/expo-react-bunny)

[Web Next.js online deployed stable](https://expo-react-bunny-r0lgewwmn.vercel.app)

[Web Next.js online deployed latest](https://expo-react-bunny.vercel.app)

## Downloads
[App iOS for simulator stable](https://expo.io/artifacts/1f58c134-13f1-4021-9a63-b436bfda8a4b)

```sh
gunzip -c expo-react-bunny-9ed62349-af09-4cf9-8a33-d52cdd3c01a4-simulator.tar.gz | tar xopf -
// start your simulator first
xcrun simctl install booted ./expo-react-bunny.app
xcrun simctl launch booted com.zrwusa.expo-react-bunny
```

[App Android apk stable](https://expo.io/artifacts/28b3cb5d-536d-4ee2-a2f9-6f2a4eaef61a)
```sh
// start your emulator
// drag the downloaded apk file to emulator
```


## Development

### local web server
```sh
yarn build:web
yarn web:server
```
### For responsive development

Just configure the dimensions size used by the designer, responsiveFromUE will automatically be compatible different devices

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
    const {ms, responsive} = useSizer();
    const {wp} = responsive.iphoneX;
```

ms: measure util defined sizes for styles(recommend use this to keep consistency)

wp: width to DP based on your designs

hp: height to DP based on your designs

You can define multiple design configurations, because your designs are often not designed by the same designer

### For explicit navigation tree

NavigationTree: Explicitly define a navigation tree, and the navigation of the entire App is clear at a glance. 

Navigator components are automatically generated through configuration, 

and the nesting relationship between Navigators is automatically generated. 

There is no need to define Navigator components separately, 

just care about Screens components.

At the same time,linking configuration is automatically generated. 

No modification of React Navigation, you can use any configuration of React Navigation with confidence.

