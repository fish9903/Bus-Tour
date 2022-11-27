// 구매할 때 전달하는 정보
export interface PurchaseInfo {
    name: string;
    phone_number: string;
    card_number: string;
    pid: number;
    priceinfos: PCount[]
}
export interface PCount {
    type: string;
    count: number;
}