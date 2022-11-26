import { useLoaderData, LoaderFunction, useNavigate, Form } from "react-router-dom";
import React, { useLayoutEffect } from "react";

import styles from './CheckPage.module.css';
import HeadLine from "../../component/Headline/HeadLine";
import LineContainer from "../../component/LineContainer/LineContainer";
import { costNames } from "../../util/costNames";
import { IOrderWithCourseInfo } from "../../interface/Order.interface";
import { mockorder } from "../../fakenet";
import OrderList from "../../component/OrderList/OrderList";
import axios from "axios";


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
    console.log(arr);
    if (username && pno) {
        arr.push(mockorder);
    }

    // 여러 정보를 가져오는 단계.
    const orderData = await axios.get(`/server/searchPurchase/${username}/${pno}`);
    const order_str = JSON.stringify(orderData.data);
    const order_arr = JSON.parse(order_str);

    const programData = await axios.get(`/server/searchProgram/${order_arr.ProgramId}`);
    const program_str = JSON.stringify(programData.data);
    const program_arr = JSON.parse(program_str);

    const courseData = await axios.get(`/server/searchCourse/${program_arr.cid}`);
    const course_str = JSON.stringify(courseData.data);
    const course_arr = JSON.parse(course_str);

    const userData = await axios.get(`/server/searchUser/${order_arr.userId}`);
    const user_str = JSON.stringify(userData.data);
    const user_arr = JSON.parse(user_str);

    const jsonData = {
        QRcode: order_arr.QRcode,
        card_number: order_arr.card_number,
        course: course_arr,
        id: order_arr.id,
        order_date: order_arr.ordered_date,
        personinfos: order_arr.personinfos,
        program: program_arr,
        up_date: order_arr.up_date,
        user: user_arr,
    }

    const jsonArray = []
    jsonArray.push(jsonData);

    console.log(jsonArray);
    console.log(arr);

    return {
        data: jsonArray,
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