import { ICourseWithName, ICourseWithThumbnail } from "./Course.interface";
import { IProgram } from "./Program.interface";
import { Ptype } from "./Ptype.interface";
import { IUser } from "./User.interface";

export interface IOrder {
    id: string;
    order_date: Date;
    up_date: Date;
    state: string;
    QRcode: string;
    total_price: number;
    card_number:string;
    personinfos: IPersoninfo[];
    user: IUser;
    program: IProgram;
}

export interface IShowOrder extends IOrder {
    course: ICourseWithName;
}

export interface IOrderWithCourseInfo extends IOrder {
    course: ICourseWithThumbnail;
}
interface IPersoninfo {
    type: Ptype;
    count: number;
    price_pp: number;
}