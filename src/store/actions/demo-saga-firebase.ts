import {SaveDemoSagaFirebaseTodoParams} from "../../types";
import {EDemoSagaFirebase} from "../../constants";


export function saveDemoSagaFirebaseTodo(params: SaveDemoSagaFirebaseTodoParams) {
    return {
        type: EDemoSagaFirebase.SAVE_DEMO_SAGA_FIREBASE_TODO,
        payload: params
    }
}
