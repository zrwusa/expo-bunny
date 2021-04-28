import {firebase} from "../firebase";

const nearbyFilm = [{
    "coordinate": {"latitude": 5.465477663942769, "longitude": 100.28043933880761},
    "image": {"uri": "https://i.imgur.com/sNam9iJ.jpg"},
    "_id": "60378b1f10b5627f56e5339e",
    "title": "Best Place",
    "description": "This is the best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.463586808144262, "longitude": 100.28481285211431},
    "image": {"uri": "https://i.imgur.com/N7rlQYt.jpg"},
    "_id": "60378b1f10b5627f56e5339f",
    "title": "Second Best Place",
    "description": "This is the second best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.46658649635612, "longitude": 100.28283128710403},
    "image": {"uri": "https://i.imgur.com/UDrH0wm.jpg"},
    "_id": "60378b1f10b5627f56e533a0",
    "title": "Third Best Place",
    "description": "This is the third best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.467065044467615, "longitude": 100.27972409936405},
    "image": {"uri": "https://i.imgur.com/Ka8kNST.jpg"},
    "_id": "60378b1f10b5627f56e533a1",
    "title": "Fourth Best Place",
    "description": "This is the fourth best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.46677663942769, "longitude": 100.28143933880762},
    "image": {"uri": "https://i.imgur.com/sNam9iJ.jpg"},
    "_id": "60378b4810b5627f56e533a2",
    "title": "Best Place",
    "description": "This is the best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.4678649635612, "longitude": 100.28283128710403},
    "image": {"uri": "https://i.imgur.com/UDrH0wm.jpg"},
    "_id": "60378b4810b5627f56e533a4",
    "title": "Third Best Place",
    "description": "This is the third best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.462586808144262, "longitude": 100.28681285211431},
    "image": {"uri": "https://i.imgur.com/N7rlQYt.jpg"},
    "_id": "60378b4810b5627f56e533a3",
    "title": "Second Best Place",
    "description": "This is the second best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.467165044467615, "longitude": 100.27972409936405},
    "image": {"uri": "https://i.imgur.com/Ka8kNST.jpg"},
    "_id": "60378b4810b5627f56e533a5",
    "title": "Fourth Best Place",
    "description": "This is the fourth best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.467565044467615, "longitude": 100.27172409936405},
    "image": {"uri": "https://i.imgur.com/Ka8kNST.jpg"},
    "_id": "60378b7710b5627f56e533a9",
    "title": "Fourth Best Place",
    "description": "This is the fourth best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.463477663942769, "longitude": 100.2734393388076},
    "image": {"uri": "https://i.imgur.com/sNam9iJ.jpg"},
    "_id": "60378b7710b5627f56e533a6",
    "title": "Best Place",
    "description": "This is the best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.46258649635612, "longitude": 100.28583128710403},
    "image": {"uri": "https://i.imgur.com/UDrH0wm.jpg"},
    "_id": "60378b7710b5627f56e533a8",
    "title": "Third Best Place",
    "description": "This is the third best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.469586808144262, "longitude": 100.28181285211431},
    "image": {"uri": "https://i.imgur.com/N7rlQYt.jpg"},
    "_id": "60378b7710b5627f56e533a7",
    "title": "Second Best Place",
    "description": "This is the second best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.46358649635612, "longitude": 100.28983128710404},
    "image": {"uri": "https://i.imgur.com/UDrH0wm.jpg"},
    "_id": "60378b7910b5627f56e533ac",
    "title": "Third Best Place",
    "description": "This is the third best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.468065044467615, "longitude": 100.27072409936405},
    "image": {"uri": "https://i.imgur.com/Ka8kNST.jpg"},
    "_id": "60378b7910b5627f56e533ad",
    "title": "Fourth Best Place",
    "description": "This is the fourth best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.440477663942769, "longitude": 100.28343933880761},
    "image": {"uri": "https://i.imgur.com/sNam9iJ.jpg"},
    "_id": "60378b7910b5627f56e533aa",
    "title": "Best Place",
    "description": "This is the best place in Portland",
    "__v": 0
}, {
    "coordinate": {"latitude": 5.458586808144262, "longitude": 100.28681285211431},
    "image": {"uri": "https://i.imgur.com/N7rlQYt.jpg"},
    "_id": "60378b7910b5627f56e533ab",
    "title": "Second Best Place",
    "description": "This is the second best place in Portland",
    "__v": 0
}]

export const migrateNearbyFilms = async () => {
    await firebase
        .database()
        .ref('nearbyFilms')
        .set(nearbyFilm);
}
