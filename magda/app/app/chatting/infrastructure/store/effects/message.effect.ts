import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as FromMessageAction from "../actions/message.action";
import {catchError, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
import {Message, MessageService} from "../../services/messages.service";
import {of} from "rxjs";
import {MessageInterface} from "../reducers/message.reducer";

@Injectable()
export class MessageEffect {
  constructor(private messageService: MessageService, private actions: Actions, private http: HttpClient) {
  }

  @Effect()
  sendMessage$ = this.actions.pipe(
    ofType(FromMessageAction.SEND),
    //  tap(()=>alert('aaa')) ,
    // take(1),
    switchMap((action: FromMessageAction.SendMessage) =>
      this.messageService.sendMessage(action.payload).pipe(
        map(
          (data: Message) => {
            // alert(action.payload.message);
            return action;
          }),
        catchError((error: HttpErrorResponse) => of(new FromMessageAction.ErrorAlert(error.message)))
      )
    ),
    switchMap((action: FromMessageAction.SendMessage) => {
      let from = action.payload.messageFrom;
      let to = action.payload.messageTo;
      return this.messageService.getMessagesByFromAndTo(from, to).pipe(map((data: Message[]) => {
        // alert(data[8].message)
        return new FromMessageAction.SetAllFromToMessages(data)
      }))
    })/*,
    switchMap((action: FromMessageAction.SetAllFromToMessages) => {
      let to = action.payload[0].messageTo;
      return this.messageService.getUnReadMessages(to).pipe(map((data: Message[]) => {
        // alert(data[8].message)
        return new FromMessageAction.SetUnReadMessages(data)
      }))
    })*/
  )

  /*
    @Effect()
    getMessagesByFromAndTo$ = this.actions.pipe(
      ofType(FromMessageAction.GET_BY_FROM_TO),
      switchMap((action: FromMessageAction.GetMessageByFromAndTo) => {
        let from = action.payload.from;
        let to = action.payload.to;
       return  this.messageService.getMessagesByFromAndTo(from, to).pipe(map((data: Message[]) => {
          return new FromMessageAction.SetAllFromToMessages(data)
        }))
      })
    )*/


}
