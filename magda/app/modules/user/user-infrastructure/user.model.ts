export class User {
  constructor(
    public  username?: string,
    public password?: string,
    public theUserAdmin?: string,
    public selectedRole?: string,
    public  roles?: string[],
    public enabled?: boolean
  ) {}

}
