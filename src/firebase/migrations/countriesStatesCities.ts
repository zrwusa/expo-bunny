// import {deepKeysConvert, deepRemoveByKey} from "../../utils";
// import countriesStatesCities from "./countriesStatesCities.json"
// import {firebase} from "../firebase";

export const migrateCountries = async () => {
    // const countriesRemovedStates = deepRemoveByKey(countriesStatesCities, ['states']);
    // const countriesNeeded = ['Malaysia', 'United States']
    // const countriesStatesCitiesFiltered = countriesStatesCities.filter(item => countriesNeeded.includes(item.name));
    // const countriesStatesCitiesFilteredCamel = deepKeysConvert(countriesStatesCitiesFiltered, 'camel');
    //
    // let states = []
    // for (const country of countriesStatesCitiesFilteredCamel) {
    //     for (const state of country.states) {
    //         state.countryId = country.id;
    //         state.phoneCode = country.phoneCode;
    //         state._id = country.id + '-' + state.id;
    //         states.push(state)
    //     }
    // }
    //
    // let cities = []
    // for (const state of states) {
    //     for (const city of state.cities) {
    //         city.stateId = state.id;
    //         city.countryId = state.countryId;
    //         city.phoneCode = state.phoneCode;
    //         city.stateCode = state.stateCode;
    //         city._id = state.countryId + '-' + state.id + '-' + city.id;
    //         cities.push(city)
    //     }
    // }
    //
    // const statesRemoveCities = deepRemoveByKey(states, ['cities']);
    // console.log(states)
    // console.log(cities)
    // console.log(statesRemoveCities)
    // for (const state of statesRemoveCities) {
    //     await firebase
    //         .firestore()
    //         .collection('states')
    //         .doc(state._id.toString())
    //         .set(state)
    // }
    //
    // for (const city of cities) {
    //     if (Math.random() < 0.01) {
    //         await firebase
    //             .firestore()
    //             .collection('cities')
    //             .doc(city._id.toString())
    //             .set(city)
    //     }
    // }
}
