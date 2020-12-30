import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {IRootState} from "./models";
import {Action} from "redux";

export type IMyExtraArg = {myExtraArg1:string } ;
export type IThunkResult<R> = ThunkAction<R, IRootState, IMyExtraArg, Action>;
export type IThunkDispatch = ThunkDispatch<IRootState, IMyExtraArg, Action>;
