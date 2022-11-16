import { Form, LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { useMemo, useState, useEffect, useCallback, Fragment } from "react";

import styles from './PurchasePage.module.css';
import HeadLine from "../../component/Headline/HeadLine";
import LineContainer from "../../component/LineContainer/LineContainer";
import { CourseWithPrograms } from "../../interface/Course.interface";
import { dateOptions } from "../../util/date-option";
import { costNames } from "../../util/costNames";

const program: CourseWithPrograms = {
    id: 1,
    name: "강원도 속초",
    short_desc: "아름다운 강원도 속초로 놀러오세요~",
    thumbnail: "/ugly_cat.jpg",
    description: `A paragraph with *emphasis* and **strong importance**.

    > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
    
    * Lists
    * [ ] todo
    * [x] done
    
    A table:
    
    | a | b |
    | - | - |
    `,
    programs: [
        {
            id: 1,
            ariv_date: new Date('2022-10-11'),
            dep_date: new Date('2022-10-10'),
            state: "ok",
            max_count: 41,
            rem_count: 14,
            cid: 1,
        },
        {
            id: 2,
            ariv_date: new Date('2022-10-12'),
            dep_date: new Date('2022-10-11'),
            state: "ok",
            max_count: 42,
            rem_count: 16,
            cid: 1,
        },
        {
            id: 3,
            ariv_date: new Date('2022-10-13'),
            dep_date: new Date('2022-10-12'),
            state: "ok",
            max_count: 44,
            rem_count: 22,
            cid: 1,
        }
    ],
    priceinfos: [
        { price: 5000, type: "p1" },
        { price: 7500, type: "p2" },
        { price: 10000, type: "p3" },
    ]
}

interface Ret extends CourseWithPrograms { }

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id'];
    if (!id) {
        redirect('error');
    }

    return program;
}

const PurchasePage: React.FC = () => {
    const data = useLoaderData() as Ret;

    const [id, setId] = useState<string>("");

    const [values, setValues] = useState<number[]>(() => {
        const arr: number[] = [];
        for (let a = 0; a < data.priceinfos.length; a++) {
            arr.push(0);
        }
        return arr;
    });

    const costs = useMemo(() => {
        const arr: number[] = [];
        data.priceinfos.forEach(it => {
            arr.push(it.price);
        })
        return arr;
    },[data.priceinfos]);

    const [cost, setCost] = useState(0);

    const [cvalid, setCValid] = useState<boolean | null>(null);
    const remain_seat = useMemo(() => data.programs.filter(it => it.id === +id)[0]?.rem_count ?? -1, [data.programs, id]);
    const full_seat = useMemo(() => data.programs.filter(it => it.id === +id)[0]?.max_count ?? -1, [data.programs, id]);


    const calculateCost = useCallback(() => {
        const total_cost = values.reduce((prev, cur, idx) => prev + cur * costs[idx], 0);
        setCost(total_cost);
    }, [values, costs])

    const countValidation = useCallback(() => {
        if (remain_seat === -1) {
            setCValid(null);
            return;
        }
        const total = values.reduce((prev, cur) => prev + cur, 0);
        if (total === 0) {
            setCValid(null);
            return;
        }
        setCValid(() => total <= remain_seat);
    }, [values, remain_seat]);


    useEffect(() => {
        countValidation();
        calculateCost();
    },
        [countValidation, calculateCost]);

    const option_table = useMemo(() => data.programs.map(
        it => {
            const dept = it.dep_date.toLocaleString('ko-KR', dateOptions);
            const ariv = it.ariv_date.toLocaleDateString('ko-KR', dateOptions);
            const date = `${dept} ~ ${ariv}`;
            return <option value={it.id} key={it.id}>{date}</option>
        }
    ), [data.programs]);

    const cost_table = useMemo(() => data.priceinfos.map((it, idx) => {
        const typename = costNames.get(it.type);
        const value = <Fragment key={it.type}>
            <label htmlFor={it.type}>{typename}</label>
            <input
                type='number'
                min='0'
                id={it.type}
                name={it.type}
                disabled={id===''}
                value={values[idx]}
                onChange={(e) => {
                    setValues((prev) => {
                        const cur = [...prev];
                        cur[idx] = +e.target.value;
                        return cur;
                    });
                }} />
        </Fragment>
        return value;
    }), [data.priceinfos, values, id])

    return (
        <div className={styles['page-layout']}>
            <HeadLine content="예약" />

            <Form className={styles['purchase-form']}>
                <LineContainer title="상품 정보">
                    <div>상품 이름</div>
                    <div>{data.name}</div>
                    <label htmlFor="id">기간</label>
                    <div>
                        <select
                            style={{ textAlign: "center" }}
                            name='id'
                            id='id'
                            value={id}
                            onChange={
                                (e) => {
                                    setId((e.target.value))
                                }
                            }>
                            <option value="" disabled>세부 기간 선택</option>
                            {option_table}
                        </select>
                        <div>{`전체 좌석 ${full_seat > 0 ? full_seat : '-'}개`}</div>
                        <div>{`남은 좌석 ${remain_seat > 0 ? remain_seat : '-'}개`}</div>

                    </div>
                    <div>인원</div>
                    <div className={styles['flex-col']}>
                        {cost_table}
                        {cvalid !== null && (cvalid === true ?
                            <div>- 구매할 수 있습니다</div>
                            : <div>- 구매할 수 없습니다</div>)}
                        {cvalid === null &&
                            <div>-</div>}
                    </div>
                    <div>가격</div>
                    <div>{cvalid ? cost : 0}원</div>
                </LineContainer>
                <LineContainer title="고객 정보">

                </LineContainer>
                <button type='submit'></button>
            </Form>
        </div>)
}

export default PurchasePage;