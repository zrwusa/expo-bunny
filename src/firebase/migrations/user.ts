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

export const migrateUsers = async () => {
    for (const user of users) {
        await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set(user)
    }
}
