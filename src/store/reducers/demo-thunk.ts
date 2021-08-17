import {DemoThunkActions} from '../actions';
import {DemoThunkState} from '../../types';
import {EDemoThunk} from '../../constants';


export function demoThunkStateReducer(prevState: DemoThunkState = {
    id: 0,
    text: 'initialed text'
}, {type, payload}: DemoThunkActions): DemoThunkState {
    switch (type) {
        case EDemoThunk.DEMO_THUNK_SUCCESS: {
            return {
                ...prevState,
                ...payload,
            };
        }
        default:
            return prevState;
    }
}


