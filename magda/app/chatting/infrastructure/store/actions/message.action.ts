import {Action} from "@ngrx/store";
import {Message} from "../../services/messages.service";
import {MessageInterface} from "../reducers/message.reducer";

export const SEND = 'send';
export const GET_BY_FROM_TO = 'get_from_to';
export const Set_Returned_All_Messages_By_From_To='set_from_to_messages';
export const ERROR='error';

export class ErrorAlert {
  constructor(message:string){
    alert(message)
  }
}

export class SetAllFromToMessages implements Action{
  readonly type= Set_Returned_All_Messages_By_From_To;
  constructor(public payload:Message[]){}
}

export class SendMessage implements Action {
  readonly type = SEND;

  constructor(public payload: Message) {
  }
}

export class GetMessageByFromAndTo implements Action {
  readonly type = GET_BY_FROM_TO;

  constructor(public payload: { from: string, to: string }) {
  }
}

export type MessageAction = SendMessage | GetMessageByFromAndTo|SetAllFromToMessages;
