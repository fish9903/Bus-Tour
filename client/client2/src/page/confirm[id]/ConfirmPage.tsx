import { redirect, useLoaderData, LoaderFunction, useNavigate } from "react-router-dom";
import React, { useMemo, Fragment } from "react";

import styles from './ConfirmPage.module.css';
import HeadLine from "../../component/Headline/HeadLine";
import LineContainer from "../../component/LineContainer/LineContainer";
import { costNames } from "../../util/costNames";
import { IOrderWithCourseInfo } from "../../interface/Order.interface";
import { mockorder } from "../../fakenet";
import CourseItem from "../../component/CourseList/CourseItem";
import axios from "axios";


interface Ret extends IOrderWithCourseInfo { }

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id']; // order id
    if (!id) {
        redirect('error');
    }

    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? "";
    // 여기서 데이터 fetch 수행.
    const orderData = await axios.get(`/server/purchase/${id}`);
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

    console.log(program_arr)
    console.log(order_arr)

    const jsonData = {
        id: order_arr.id,
        card_number: order_arr.card_number,
        order_date: order_arr.ordered_date,
        up_date: order_arr.up_date,
        personinfos: order_arr.personinfos,
        QRcode: order_arr.QRcode,
        state: order_arr.state,
        total_price: order_arr.total_price,
        program: program_arr,
        course: course_arr,
        user: user_arr,
    }

    console.log(jsonData)
    console.log(mockorder)

    return jsonData;
}

const ConfirmPage: React.FC = () => {
    const navigate = useNavigate();
    const data = useLoaderData() as Ret;
    const course = data.course;
    const program = data.program;
    const user = data.user;
    const order_date = useMemo(() => data.order_date.toLocaleString('ko-KR'), [data.order_date]);
    const up_date = useMemo(() => data.up_date?.toLocaleString('ko-KR') ?? "-", [data.up_date]);

    const person_table = useMemo(() => data.personinfos.map((it) => {
        const typename = costNames.get(it.type);
        const value = <Fragment key={it.type}>
            <div>{typename}</div>
            <div>{it.count} ({it.count * it.price_pp})</div>
        </Fragment>
        return value;
    }), [data.personinfos])

    const moveToCheckPage = () => {
        navigate('/check');
    }

    return (
        <div className={styles['page-layout']}>
            <HeadLine content="구매 확인" />
            <CourseItem 
                id={course.id}
                name={course.name}
                short_desc={course.short_desc}
                thumbnail={course.thumbnail}
                />
            <LineContainer title="상품 정보">
                <div>상품 이름</div>
                <div>{course.name}</div>
                <div>출발일</div>
                <div>{program.dep_date.toLocaleString()}</div>
                <div>도착일</div>
                <div>{program.ariv_date.toLocaleString()}</div>                
                <div>인원</div>
                <div className={styles['flex-col']}>
                    {person_table}
                </div>
                <div>총 가격</div>
                <div>{data.total_price}</div>
            </LineContainer>
            <LineContainer title="구매자 정보">
                <div>구매자 이름</div>
                <div>{user.name}</div>
                <div>휴대폰 번호</div>
                <div>{user.phone_number}</div>
            </LineContainer>
            <LineContainer title="주문 정보">
                <div>주문 ID</div>
                <div>{data.id}</div>
                <div>주문 시각</div>
                <div>{order_date}</div>
                <div>주문 갱신 시각</div>
                <div>{up_date}</div>
                <div>결제수단 정보</div>
                <div>{data.card_number}</div>
                <div>주문 상태</div>
                <div>{data.state}</div>
            </LineContainer>
            <button 
            className={styles['purchase-button']}
            onClick={moveToCheckPage}>조회 페이지로 이동</button>
        </div>
    )
}

export default ConfirmPage;