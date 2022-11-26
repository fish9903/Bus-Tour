export const name_input_regex = /^[a-zA-Zㄱ-힣0-9]{0,30}$/;
export const name_valid_regex = /^[a-zA-Zㄱ-힣0-9]{1,30}$/;
export const pno_input_regex = /^[0-9]{0,16}$/;
export const pno_valid_regex = /^[0-9]{5,16}$/;
export const cardno_input_regex = /^[0-9]{0,16}$/;
export const cardno_valid_regex = /^[0-9]{14,16}$/;

export const valid_regex = [name_valid_regex, pno_valid_regex, cardno_valid_regex]