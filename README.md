# expo-react-bunny
We don't want a complicated project, what we want is a collection of samples based on cutting-edge technologies.

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
- Next.js for deploying

# Principles

###1.Don’t repeat yourself (DRY) 

###2.Do one thing (DOT) (from Unix philosophy) 

###3.Separation of concerns 

###4.The principle of the least knowledge (Law of Demeter)


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
<tr><td>React Native Components All In One</td><td></td></tr>
<tr><td>Mock RESTFul Server</td><td></td></tr>
<tr><td>Https localhost Self Signed Certification</td><td></td></tr>
</tbody>
</table>



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
    const {responsive} = sizeLabor;
    const {wp} = responsive.iphoneX;
    <View style={{width:wp(100),height:wp(100)}}></View>
```

ms: measure util defined sizes for styles(recommend use this to keep consistency)

wp: width to DP based on your designs

hp: height to DP based on your designs

You can define multiple design configurations, because your designs are often not designed by the same designer


### For Next.js
```sh
// with npm
npm install
npm next

// with yarn
yarn
yarn next
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
