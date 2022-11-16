import { Program } from "./Program.interface";

export interface CourseWithThumbnail {
    id: number;
    thumbnail: string;
    name: string;
    short_desc: string;
}

export interface CourseWithPrograms {
    id: number;
    thumbnail: string;
    name: string;
    short_desc: string;
    description: string;
    programs: Program[]
    priceinfos: Priceinfo[]
}

interface Priceinfo {
    type: string;
    price: number;
}