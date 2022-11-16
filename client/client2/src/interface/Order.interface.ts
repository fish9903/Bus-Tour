export interface Order {
    id: string;
    order_date: Date;
    up_date?: Date;
    state: string;
    QRcode: string;
    total_price: number;
    card_number:string;
    personinfos: Personinfo[]
}

interface Personinfo {
    type: string;
    count: number;
    price_pp: number;
}