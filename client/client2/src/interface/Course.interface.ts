import { IProgram } from "./Program.interface";
import { Ptype } from "./Ptype.interface";



export interface ICourseWithName {
    id: number;
    name :string;
}
export interface ICourseWithThumbnail extends ICourseWithName {
    thumbnail: string;
    short_desc: string;
}

export interface ICourseWithPrograms extends ICourseWithThumbnail {
    description: string;
    programs: IProgram[]
    priceinfos: IPriceinfo[]
}

interface IPriceinfo {
    type: Ptype;
    price: number;
}