import { ActivePhonePlans } from "./active-phone-plans.model";
import { User } from "./user.model";

export class Account {

    id: number = 0;
    username: string;
    name: string;
    email: string;
    address: string;
    users: Array<User>;
    phonePlans: Array<ActivePhonePlans>;

    constructor(id: number, username: string, name: string, email: string, address: string, users: Array<User>, phonePlans: Array<ActivePhonePlans>) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.address = address;
        this.users = users;
        this.phonePlans = phonePlans;
    }

}
