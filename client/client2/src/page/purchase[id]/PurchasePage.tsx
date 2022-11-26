import { Form, LoaderFunction, redirect, useLoaderData, useNavigate } from "react-router-dom";
import React, { useMemo, useState, useEffect, useCallback, Fragment } from "react";

import styles from './PurchasePage.module.css';
import HeadLine from "../../component/Headline/HeadLine";
import LineContainer from "../../component/LineContainer/LineContainer";
import { ICourseWithPrograms } from "../../interface/Course.interface";
import { dateOptions } from "../../util/date-option";
import { costNames } from "../../util/costNames";
import Spinner from "../../component/Spinner/Spinner";
import { useSpinner } from "../../hooks/useSpinner";
import axios from "axios";
import { cardno_input_regex, name_input_regex, pno_input_regex, valid_regex } from "../../util/regex";

interface Ret extends ICourseWithPrograms {
    data: ICourseWithPrograms,
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id'];
    if (!id) {
        redirect('error');
    }
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? "";
    // 여기서 데이터 fetch 수행.
    const res = await axios.get(`/server/courseDetail/${id}`);
    const str = JSON.stringify(res.data);
    const arr = JSON.parse(str);

    for (let prog of arr.programs) {
        prog.dep_date = new Date(prog.dep_date);
        prog.ariv_date = new Date(prog.ariv_date);
    } // 문자열로 들어오므로 Date로 가공한다.

    return arr;
}

// export const action: ActionFunction = async ({ request, params }) => {
//     const formData = await request.formData();
//     const data_list = Object.fromEntries(formData);
//     console.log(data_list);

//     return redirect('/', {});
// }

const PurchasePage: React.FC = () => {
    const data = useLoaderData() as Ret;
    const navigate = useNavigate();
    const { active, turnOn, turnOff } = useSpinner();

    const [id, setId] = useState<string>("");
    const [values, setValues] = useState<number[]>(() => {
        const arr: number[] = [];
        for (let a = 0; a < data.priceinfos.length; a++) {
            arr.push(0);
        }
        return arr;
    });

    const [cost, setCost] = useState(0);
    const [cvalid, setCValid] = useState<boolean | null>(null);

    const [uInput, setUInput] = useState<string[]>(['', '', '']);

    const [uvalid, setUvalid] = useState<boolean[]>([false, false, false]);
    const [total_valid, setTotalValid] = useState<boolean>(false);

    const costs = useMemo(() => {
        const arr: number[] = [];
        data.priceinfos.forEach(it => {
            arr.push(it.price);
        })
        return arr;
    }, [data.priceinfos]);

    const remain_seat = useMemo(() => data.programs.filter(it => it.id === +id)[0]?.rem_count ?? -1, [data.programs, id]);
    const full_seat = useMemo(() => data.programs.filter(it => it.id === +id)[0]?.max_count ?? -1, [data.programs, id]);
    const option_table = useMemo(() => data.programs.map(
        it => {
            const dept = (new Date(it.dep_date)).toLocaleDateString('ko-KR', dateOptions);
            const ariv = (new Date(it.ariv_date)).toLocaleString('ko-KR', dateOptions);
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
                disabled={id === ''}
                value={values[idx]}
                onKeyDown={(e) => {
                    e.preventDefault();
                    return false;
                }}
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
    }, [countValidation, calculateCost]);

    useEffect(() => {
        const match =valid_regex.map((val,idx) => val.test(uInput[idx]));
        setUvalid(prev => match);
    }, [uInput]);

    useEffect(() => {
        if (cvalid && uvalid.every((val) => { return val === true })) {
            setTotalValid(true);
        }
    }, [cvalid, uvalid])

    const SubmitController: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault(); // 제출하는거 일단 막기
        turnOn();
        const formdata = new FormData(e.currentTarget); //form data 추출
        const datalist = Object.fromEntries(formdata); // 추출한 데이터를 객체로 변환
        console.log(datalist);//  출력

        turnOff();
        // -> 주문 id 나옴
        // navigate(`/confirm/${orderid}`,{replace: true});
    }

    return (
        <div className={styles['page-layout']}>
            <HeadLine content="예약" />
            <Form className={styles['purchase-form']}
                method='post'
                // action='/server/purchase'
                // action 명시하면 대응되는 주소에 가서 작업 하는 것으로 보임.
                onSubmit={SubmitController}
            >
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
                            onChange={(e) => { setId((e.target.value)) }}>
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
                            : <div className={styles['warning']}>- 구매할 수 없습니다</div>)}
                        {cvalid === null &&
                            <div>-</div>}
                    </div>
                    <div>가격</div>
                    <div>{cvalid ? cost : 0}원</div>
                </LineContainer>
                <LineContainer title="고객 정보">
                    <label htmlFor="username">구매자 이름</label>
                    <span>
                        <input type='text'
                            id="username"
                            name="username"
                            placeholder="성함"
                            value={uInput[0]}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (name_input_regex.test(val)) {
                                    setUInput(prev => {
                                        const cur = [...prev];
                                        cur[0] = e.target.value;
                                        return cur;
                                    })
                                }
                            }} />
                        {!uvalid[0] && <span className={styles['warning']}>{" *"}</span>}
                    </span>
                    <label htmlFor="pnumber">휴대폰 번호</label>
                    <span>
                        <input type='text'
                            id="pnumber"
                            name="pnumber"
                            placeholder="-을 빼고 입력하세요 (5~16자)"
                            value={uInput[1]}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (pno_input_regex.test(val)) {
                                    setUInput(prev => {
                                        const cur = [...prev];
                                        cur[1] = e.target.value;
                                        return cur;
                                    })
                                }
                            }} />
                             {!uvalid[1] && <span className={styles['warning']}>{" *"}</span>}
                    </span>
                    <label htmlFor="cardinfo">결제수단 정보</label>
                    <span>
                        <input type='text'
                            id="cardinfo"
                            name="cardinfo"
                            placeholder="-을 빼고 입력 (14~16자)"
                            value={uInput[2]} 
                            onChange={(e) => {
                                const val = e.target.value;
                                if (cardno_input_regex.test(val)) {
                                    setUInput(prev => {
                                        const cur = [...prev];
                                        cur[2] = e.target.value;
                                        return cur;
                                    })
                                }
                            }}/>
                             {!uvalid[2] && <span className={styles['warning']}>{" *"}</span>}
                    </span>
                </LineContainer>
                {!active && <button type='submit' disabled={!total_valid} className={styles['purchase-button']}>예약하기</button>}
                <Spinner isActive={active} />
            </Form>
        </div>)
}

export default PurchasePage;