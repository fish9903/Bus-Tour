import { IProgram } from "./Program.interface";
import { Ptype } from "./Ptype.interface";

export interface ICourseWithThumbnail {
    id: number;
    thumbnail: string;
    name: string;
    short_desc: string;
}

export interface ICourseWithPrograms {
    id: number;
    thumbnail: string;
    name: string;
    short_desc: string;
    description: string;
    programs: IProgram[]
    priceinfos: IPriceinfo[]
}

interface IPriceinfo {
    type: Ptype;
    price: number;
}