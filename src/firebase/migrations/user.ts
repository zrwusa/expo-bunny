import {firebase} from "../firebase";

const portraitURLs = {
    a: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/a.jpg',
    b: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/b.jpg',
    c: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/c.jpg',
    d: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/d.jpg',
    e: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/e.jpg',
    f: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/f.jpg',
    g: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/g.jpg',
    h: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/h.jpg',
    i: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/portraits/m/i.jpg',
}
const users: firebase.UserInfo[] = [
    {
        displayName: 'Pablo Rios',
        email: '',
        phoneNumber: '+601162366666',
        providerId: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fi.jpg?alt=media&token=e51deb19-6fa4-451a-b2fc-9e92f52db343',
        uid: 'BzoqTn3KZCXDWScp0fhKr8xGp2u2',
    },
    {
        displayName: 'Test',
        email: 'test@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fj.jpg?alt=media&token=3b210a82-0e08-4080-a518-f3d7c25368a2',
        providerId: '',
        uid: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
    },
    {
        displayName: 'Zrwaus',
        email: 'zrwaus@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fk.jpg?alt=media&token=38b2b032-2f7f-447d-9e83-2e6b8d1cf89f',
        providerId: '',
        uid: "hovkAoBO4SfArjeT0A9ydAEtfnF3",

    },
    {
        displayName: 'Alama',
        email: 'aaa@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fa.jpg?alt=media&token=4b0a0670-41cf-4678-8822-05ef5fe69c13',
        providerId: '',
        uid: 'iXtCc0Ad4KYxSv4eat3EdRLGCmC3',
    },
    {
        displayName: 'Bloto',
        email: 'bbb@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fb.jpg?alt=media&token=0cd3c7ad-033d-4f77-853c-aaca2058418d',
        providerId: '',
        uid: 'YtyPwHQsErYX6KH6DYLmQn7OQgn1',
    },
    {
        displayName: 'Charis',
        email: 'ccc@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fc.jpg?alt=media&token=31188292-a9e1-48f1-80ae-88387cda60c3',
        providerId: '',
        uid: 'vr9SRkq7ofOYiOQao6aTRkkMUEp1',
    },
    {
        displayName: 'Dalat',
        email: 'ddd@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fd.jpg?alt=media&token=3b023315-05f1-481f-bd3e-544211240db5',
        providerId: '',
        uid: 'L2WaWwhWH9ZO7gjZHItAvJMXh9D2',
    },
    {
        displayName: 'Eleis',
        email: 'eee@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fe.jpg?alt=media&token=a118ea91-e05b-4501-874a-2e83eca0f119',
        providerId: '',
        uid: 'da4g2pOxzVb7slyAXEUO3uWwuQl2',
    },
    {
        displayName: 'Famie',
        email: 'fff@gmail.com',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Ff.jpg?alt=media&token=0f331dc9-be29-4a27-b47c-75e885806666',
        providerId: '',
        uid: 'EvqTQMfHJLRPF2BU3MxbZGoF1R43',
    }
]

export const datingUsers = [{
    "uid": "EvqTQMfHJLRPF2BU3MxbZGoF1R43",
    "phoneNumber": "",
    "displayName": "Famie",
    "providerId": "",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Ff.jpg?alt=media&token=0f331dc9-be29-4a27-b47c-75e885806666",
    "email": "fff@gmail.com"
}, {
    "email": "girlj@gmail.com",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-j.jpg?alt=media&token=51635a29-0085-47cc-9e7a-c29a8cad8222",
    "displayName": "Nora",
    "uid": "FiwAbC0GmEggjBjhYXT6KYWy5MQ2"
}, {
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-i.jpg?alt=media&token=6a7b1ddc-ad8e-4bd4-a289-6b51520d7d2b",
    "displayName": "Grace",
    "email": "girli@gmail.com",
    "uid": "SGGbJPMgHsZElaOnBCIdJvxLtlm2"
}, {
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-g.jpg?alt=media&token=d0c79ecd-187d-49ab-8e4c-2847bb96fbe4",
    "uid": "ZSELWYRetZSbHNFQTjVxX9aXybk1",
    "email": "girlg@gmail.com",
    "displayName": "Penelope"
}, {
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-e.jpg?alt=media&token=dd6b0d55-9e53-4744-b6cb-d01a2bf166cf",
    "displayName": "Camila",
    "email": "girle@gmail.com",
    "uid": "cttSShc6sLc6ilC3z08BKaFhykx2"
}, {
    "displayName": "Madison",
    "uid": "d73w1kbo7TVoN7ME0uiAEPmd7er1",
    "email": "girlh@gmail.com",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-h.jpg?alt=media&token=5f277881-399f-4401-975d-728101270e45"
}, {
    "uid": "gEQMxRMVfjRLUngNJHKcIj1Impu1",
    "phoneNumber": "",
    "email": "test@gmail.com",
    "displayName": "Test",
    "providerId": "",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fj.jpg?alt=media&token=3b210a82-0e08-4080-a518-f3d7c25368a2"
}, {
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-b.jpg?alt=media&token=8a6d8dfd-a52b-47a2-8010-0d9841fea07d",
    "email": "girlb@gmail.com",
    "uid": "jOFfjkUgKURpW2IOpED64LzC5B23",
    "displayName": "Eliana"
}, {
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-f.jpg?alt=media&token=de55fda2-6d4c-4f8d-abd7-19bd678a5c90",
    "email": "girlf@gmail.com",
    "uid": "ofjK67aCefXFNBc8DDV7WmKZAQW2",
    "displayName": "Mila"
}, {
    "displayName": "Naomi",
    "uid": "q8my5u5kq3d1vDvYu1dNVjpPKiK2",
    "email": "girla@gmail.com",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-a.jpg?alt=media&token=b01ecde0-0447-4906-8378-2b8eddeb9b0e"
}, {
    "uid": "qcIR4FfL1AfFGP2SHtVODQ4iLLw1",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-c.jpg?alt=media&token=e105d5ac-add9-4881-8e8a-cd6aa94b2826",
    "displayName": "Valentina",
    "email": "girlc@gmail.com"
}, {
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fbeautiful-girls%2Fbeautiful-girl-d.jpg?alt=media&token=4cffbc0e-c8da-4ee1-ad61-06a1e23f83e2",
    "displayName": "Ariana",
    "email": "girld@gmail.com",
    "uid": "vg9cb0vsbSUDtgfXyPySHX747wQ2"
}]

export const migrateUsers = async () => {
    for (const user of users) {
        await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set(user)
    }
}
