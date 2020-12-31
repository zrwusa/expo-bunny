import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "./models";
import {Action} from "redux";

export type IMyExtraArg = {myExtraArg1:string } ;
export type ThunkResult<R> = ThunkAction<R, RootState, IMyExtraArg, Action>;
export type ThunkDispatchCustom = ThunkDispatch<RootState, IMyExtraArg, Action>;
