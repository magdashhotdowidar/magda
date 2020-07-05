import * as fromMessageReducer from "./reducers/message.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {Message} from "../services/messages.service";

export interface StoreStates{
  messages:Message[]
}

export const Reducers:ActionReducerMap<StoreStates>={
messages:fromMessageReducer.messageReducer
}
