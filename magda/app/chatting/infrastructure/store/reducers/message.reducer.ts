import {Message} from "../../services/messages.service";
import * as fromMessageAction from "../actions/message.action";
import {Set_Returned_All_Messages_By_From_To} from "../actions/message.action";


export interface MessageInterface {
  messages: Message[];
}

const initialData: Message[] = []


export function messageReducer(state = initialData, action: fromMessageAction.MessageAction) {
  switch (action.type) {
    case Set_Returned_All_Messages_By_From_To: {
      return action.payload;
    }

    default :
      return null;
  }
}
