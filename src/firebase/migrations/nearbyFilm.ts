import {firebase} from "../firebase";

const nearbyFilms = [
    {
        "coordinate": {
            "latitude": 5.465477663942769,
            "longitude": 100.28043933880761
        },
        "image": {
            "uri": "https://i.imgur.com/sNam9iJ.jpg"
        },
        "_id": "nearby-film-001",
        "title": "Best Place",
        "description": "This is the best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.463586808144262,
            "longitude": 100.28481285211431
        },
        "image": {
            "uri": "https://i.imgur.com/N7rlQYt.jpg"
        },
        "_id": "nearby-film-002",
        "title": "Second Best Place",
        "description": "This is the second best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.46658649635612,
            "longitude": 100.28283128710403
        },
        "image": {
            "uri": "https://i.imgur.com/UDrH0wm.jpg"
        },
        "_id": "nearby-film-003",
        "title": "Third Best Place",
        "description": "This is the third best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.467065044467615,
            "longitude": 100.27972409936405
        },
        "image": {
            "uri": "https://i.imgur.com/Ka8kNST.jpg"
        },
        "_id": "nearby-film-004",
        "title": "Fourth Best Place",
        "description": "This is the fourth best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.46677663942769,
            "longitude": 100.28143933880762
        },
        "image": {
            "uri": "https://i.imgur.com/sNam9iJ.jpg"
        },
        "_id": "nearby-film-005",
        "title": "Best Place",
        "description": "This is the best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.4678649635612,
            "longitude": 100.28283128710403
        },
        "image": {
            "uri": "https://i.imgur.com/UDrH0wm.jpg"
        },
        "_id": "nearby-film-006",
        "title": "Third Best Place",
        "description": "This is the third best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.462586808144262,
            "longitude": 100.28681285211431
        },
        "image": {
            "uri": "https://i.imgur.com/N7rlQYt.jpg"
        },
        "_id": "nearby-film-007",
        "title": "Second Best Place",
        "description": "This is the second best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.467165044467615,
            "longitude": 100.27972409936405
        },
        "image": {
            "uri": "https://i.imgur.com/Ka8kNST.jpg"
        },
        "_id": "nearby-film-008",
        "title": "Fourth Best Place",
        "description": "This is the fourth best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.467565044467615,
            "longitude": 100.27172409936405
        },
        "image": {
            "uri": "https://i.imgur.com/Ka8kNST.jpg"
        },
        "_id": "nearby-film-009",
        "title": "Fourth Best Place",
        "description": "This is the fourth best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.463477663942769,
            "longitude": 100.2734393388076
        },
        "image": {
            "uri": "https://i.imgur.com/sNam9iJ.jpg"
        },
        "_id": "nearby-film-010",
        "title": "Best Place",
        "description": "This is the best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.46258649635612,
            "longitude": 100.28583128710403
        },
        "image": {
            "uri": "https://i.imgur.com/UDrH0wm.jpg"
        },
        "_id": "nearby-film-011",
        "title": "Third Best Place",
        "description": "This is the third best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.469586808144262,
            "longitude": 100.28181285211431
        },
        "image": {
            "uri": "https://i.imgur.com/N7rlQYt.jpg"
        },
        "_id": "nearby-film-012",
        "title": "Second Best Place",
        "description": "This is the second best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.46358649635612,
            "longitude": 100.28983128710404
        },
        "image": {
            "uri": "https://i.imgur.com/UDrH0wm.jpg"
        },
        "_id": "nearby-film-013",
        "title": "Third Best Place",
        "description": "This is the third best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.468065044467615,
            "longitude": 100.27072409936405
        },
        "image": {
            "uri": "https://i.imgur.com/Ka8kNST.jpg"
        },
        "_id": "nearby-film-014",
        "title": "Fourth Best Place",
        "description": "This is the fourth best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.440477663942769,
            "longitude": 100.28343933880761
        },
        "image": {
            "uri": "https://i.imgur.com/sNam9iJ.jpg"
        },
        "_id": "nearby-film-015",
        "title": "Best Place",
        "description": "This is the best place in Portland",
        "__v": 0
    },
    {
        "coordinate": {
            "latitude": 5.458586808144262,
            "longitude": 100.28681285211431
        },
        "image": {
            "uri": "https://i.imgur.com/N7rlQYt.jpg"
        },
        "_id": "nearby-film-016",
        "title": "Second Best Place",
        "description": "This is the second best place in Portland",
        "__v": 0
    }
]

export const migrateNearbyFilms = async () => {
    for (const nearbyFilm of nearbyFilms) {
        await firebase
            .firestore()
            .collection('nearbyFilms')
            .doc(nearbyFilm._id)
            .set(nearbyFilm);
    }
}
