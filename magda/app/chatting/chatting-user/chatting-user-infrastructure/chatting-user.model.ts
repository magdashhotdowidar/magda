export class ChattingUser {
  constructor(
    public username?: string,
    public password?: string,
    public email?: string,
    public phoneNumber?: string,
    public gender?: string,
    public birthDate?: string,
    public personalImage?: string,
    public backgroundImage?: string,
    public theUserAdmin?: string,
    public roles?: string[],
    public enabled?: boolean,
    public open?:boolean
  ) {
  }

}
