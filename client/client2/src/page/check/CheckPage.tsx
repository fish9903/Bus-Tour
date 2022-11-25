import { useLoaderData, LoaderFunction, useNavigate, Form } from "react-router-dom";
import React, { useLayoutEffect } from "react";

import styles from './CheckPage.module.css';
import HeadLine from "../../component/Headline/HeadLine";
import LineContainer from "../../component/LineContainer/LineContainer";
import { costNames } from "../../util/costNames";
import { IOrderWithCourseInfo } from "../../interface/Order.interface";
import { mockorder } from "../../fakenet";
import OrderList from "../../component/OrderList/OrderList";


interface Ret {
    data: IOrderWithCourseInfo[];
    username: string;
    pno: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? "";

    const username = url.searchParams.get('username');
    const pno = url.searchParams.get('pno');

    const arr: IOrderWithCourseInfo[] = [];

    console.log(username, pno);
    if (username && pno) {
        arr.push(mockorder);
    }

    // 여러 정보를 가져오는 단계.


    return {
        data: arr,
        username: username ?? "",
        pno: pno ?? ""
    };
}

const CheckPage: React.FC = () => {
    const navigate = useNavigate();
    const { data, username, pno } = useLoaderData() as Ret;

    useLayoutEffect(() => {
        const name_elem = document.getElementById('username') as HTMLInputElement;
        name_elem.value = username;
        const pno_elem = document.getElementById('pno') as HTMLInputElement;
        pno_elem.value = pno;
    }, [username, pno]);

    return (
        <div className={styles['page-layout']}>
            <HeadLine content="구매내역 조회" />
            <LineContainer title="구매자 정보"
                grid={false}>
                <Form
                    id='check-form'
                    role='search'
                    method='get'
                    className={styles['input_form']}>
                    <label htmlFor='username'>이름</label>
                    <input
                        id='username'
                        name='username'
                        placeholder='구매자 성함'
                    />
                    <label htmlFor='pno'>전화번호</label>
                    <input
                        id='pno'
                        name='pno'
                        placeholder='구매자 전화번호' />
                    <button className={styles['button']}>조회</button>
                </Form>
            </LineContainer>
            <OrderList list={data} />
        </div>
    )
}

export default CheckPage;