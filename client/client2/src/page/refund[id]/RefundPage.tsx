import { useMemo, Fragment, useState, useEffect } from 'react';
import { Form, LoaderFunction, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import HeadLine from '../../component/Headline/HeadLine';
import LineContainer from '../../component/LineContainer/LineContainer';
import ConfirmModal from '../../component/modal/ConfirmModal';
import { mockorder } from '../../fakenet';
import { IOrderWithCourseInfo } from '../../interface/Order.interface';
import { costNames } from '../../util/costNames';
import styles from './RefundPage.module.css';

interface Ret extends IOrderWithCourseInfo { }

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id'];
    if (!id) {
        redirect('error');
    }

    return mockorder;
}

const RefundPage: React.FC = (props) => {
    const navigate = useNavigate();
    const data = useLoaderData() as Ret;
    const course = data.course;
    const program = data.program;
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
    const [isAllRefund, setRefundType] = useState<boolean>(true);

    const [counts, setCounts] = useState<number[]>(() => {
        const arr: number[] = [];
        for (let a = 0; a < data.personinfos.length; a++) {
            arr.push(0);
        }
        return arr;
    });
    const [canRefund, setCanRefund] = useState<boolean>(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (isAllRefund) {
            setCounts(prev => {
                const arr = [...prev];
                for (let a = 0; a < data.personinfos.length; a++) {
                    arr[a] = data.personinfos[a].count;
                }
                return arr;
            })

        }
    }, [isAllRefund, data.personinfos]);

    useEffect(() => {
        if (counts.some(val => val > 0) && counts.every((val, idx) => val <= data.personinfos[idx].count)) {
            setCanRefund(true);
        }
        else {
            setCanRefund(false);
        }
    }, [counts, data.personinfos]);

    const cost_table = useMemo(() => data.personinfos.map((it, idx) => {
        const typename = costNames.get(it.type);
        const value = <Fragment key={it.type}>
            <label>{typename}</label>
            <input
                type='number'
                min='0'
                max={it.count}
                id={it.type}
                name={it.type}
                disabled={isAllRefund === true}
                value={counts[idx]}
                onKeyDown={(e) => {
                    e.preventDefault();
                    return false;
                }}
                onChange={
                    (e) => {
                        setCounts(prev => {
                            const cur = [...prev];
                            cur[idx] = +e.target.value;
                            return cur;
                        })
                    }
                } />
        </Fragment>
        return value;
    }), [data.personinfos, isAllRefund, counts]);

    const toggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setRefundType(prev => !prev);
    }

    const refundHandler = () => {
        setModal(false);
        // 환불 로직 정의


        // 환불 성공하면
        navigate(`/confirm/${data.id}`,{replace: true, preventScrollReset:false});

        // 실패하면 에러 페이지로.
    }

    return (<div className={styles['page-layout']}>
        <HeadLine content="환불" />
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
        <Form method='post'
            className={styles['fill']}>

            <LineContainer title="환불">
                <div>환불 타입</div>
                <button
                    onClick={toggle}
                >{isAllRefund ? "전체 환불" : "부분 환불"}</button>
                {cost_table}

            </LineContainer>
            <button
                disabled={!canRefund}
                onClick={(e) =>{
                    e.preventDefault();
                    setModal(true);
                }}
                className={styles['refund-button']}>
                환불하기
            </button>
        </Form>
        <ConfirmModal
        title='환불 확인'
        display={modal}
        onConfirm={refundHandler}
        onReject={() => {
            setModal(false);
        }}>
            <p>환불이 수행된 이후 사용자는 환불을 번복할 수 없습니다.</p>
            <p>예를 들어 사용자의 실수로 예정보다 더 많은 인원을 환불하더라도
                환불을 취소할 수 없으므로 사용자는 전체 표를 취소한 이후 다시 결제 과정을 진행해야 합니다.</p>
            <p>따라서 착오로 인한 불편이 발생하지 않도록 점검 후 환불을 진행해주시길 바랍니다.</p>
            <p>환불이 완료되면 구매 확인 페이지로 이동합니다.</p>
            </ConfirmModal>
    </div >);
}

export default RefundPage;