export type DataT = {
    id: number;
    name: string;
    isOnline: boolean;
    match: string;
    description: string;
    message: string;
    image: any;
    age?: string;
    info1?: string;
    info2?: string;
    info3?: string;
    info4?: string;
    location?: string;
};
const data: DataT[] = [
    {
        id: 1,
        name: "Glenna Reichert",
        match: "74",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: true,
        message:
            "This is what happens when an unstoppable force meets an immovable object.",
        image: {uri:"https://images.unsplash.com/photo-1544689178-3ec92a805a87?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIxfHxpbmRpYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 2,
        name: "Kurtis DuBuque",
        match: "98",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: false,
        message:
            "You want order in Gotham. Batman must take off his mask and turn himself in.",
        image: {uri:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMxfHxpbmRpYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },

    {
        id: 3,
        name: "Ervin Howell",
        match: "45",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: false,
        message:
            "Oh, hee-hee, aha. Ha, ooh, hee, ha-ha, ha-ha. And I thought my jokes were bad.",
        image: {uri:"https://images.unsplash.com/photo-1600710399411-4da5671e19c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 4,
        name: "John Lebsack",
        match: "88",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: true,
        message: "Bats frighten me. It's time my enemies shared my dread.",
        image: {uri:"https://images.unsplash.com/photo-1617009762269-c062aaf6b3a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 5,
        name: "James Dietrich",
        match: "76",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: false,
        message: "It's not who I am underneath but what I do that defines me.",
        image: {uri:"https://images.unsplash.com/photo-1583398289705-8b6efdd1e2a7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 6,
        name: "Patricia Schulist",
        match: "95",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: true,
        message:
            "You have nothing, nothing to threaten me with. Nothing to do with all your strength.",
        image: {uri:"https://images.unsplash.com/photo-1508810301179-d8da058a3d29?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 7,
        name: "Chelsey Weissnat",
        match: "67",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: true,
        message:
            "Never start with the head. The victim gets all fuzzy. He can't feel the next... See?",
        image: {uri:"https://images.unsplash.com/photo-1550402537-6f7b6189b3b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 8,
        name: "Nicky Runol",
        match: "85",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        age: "27",
        location: "Irvine, CA",
        info1: 'Straight, Single, 5"10',
        info2: "Tea Totaller, Loves Photography & Travel",
        info3: "Beaches, Mountain, Cafe, Movies",
        info4: "Last seen: 23h ago",
        isOnline: true,
        message:
            "And as for the television's so-called plan, Batman has no jurisdiction.",
        image: {uri:"https://images.unsplash.com/photo-1611407940821-896e88707f70?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },
    {
        id: 9,
        name: "Leanne Graham",
        isOnline: true,
        match: "78",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        message:
            "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
        image: {uri:'https://images.unsplash.com/photo-1616429321229-733d6a7ff456?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60'},
    },
    {
        id: 10,
        name: "Clementine Bauch",
        match: "93",
        description:
            "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
        isOnline: false,
        message: "Someone like you. Someone who'll rattle the cages.",
        image: {uri:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"},
    },

];

export default data;
