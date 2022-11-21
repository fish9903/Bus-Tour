import { QRCodeCanvas } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';
import { IOrderWithCourseInfo } from '../../interface/Order.interface';
import styles from './OrderItem.module.css';
import { toPng } from 'html-to-image';
import { Fragment, useMemo } from 'react';
import { costNames } from '../../util/costNames';

interface IOrderItem {
    item: IOrderWithCourseInfo
}

const OrderItem: React.FC<IOrderItem> = (props) => {
    const navigate = useNavigate();
    const item = props.item;
    const disabled = props.item.state === 'canceled';

    const person_table = useMemo(() => item.personinfos.map((it) => {
        const typename = costNames.get(it.type);
        const value = <Fragment key={it.type}>
            <div>{typename}</div>
            <div>{it.count} 명</div>
        </Fragment>
        return value;
    }), [item.personinfos])

    const printTicket = () => {
        const ticket = document.getElementById(`ticket-${item.id}`);
        if (ticket) {
            toPng(ticket)
            .then((dataurl) => {
                var link = document.createElement('a');
                link.download = 'ticket.jpeg';
                link.href = dataurl;
                link.click();
                link.remove();
            })
        }
    };

    const goToRefundPage = () => {
        navigate(`/refund/${item.id}`);
    }

    return (
        <div className={styles['container']}>
            <div className={styles['item']}
                id={`ticket-${item.id}`}>
                <div className={styles['item-info']}>
                    <div>상품 ID</div>
                    <Link to={`/confirm/${item.id}`}>
                        {item.id}
                    </Link>
                    <div>상품명</div>
                    <Link to={`/detail/${item.course.id}`}>
                        {item.course.name}
                    </Link>
                    <div>출발일</div>
                    <div>{item.program.dep_date.toLocaleString('ko-KR')}</div>
                    <div>도착일</div>
                    <div>{item.program.ariv_date.toLocaleString('ko-KR')}</div>
                    <div>인원</div>
                    <div className={styles['flex-col']}>{person_table}</div>
                    <div>가격</div>
                    <div>{item.total_price}</div>
                </div>
                <div className={styles['qr-code']}>
                    <QRCodeCanvas value={item.QRcode} />
                </div>
            </div>
            <div className={styles['button-container']}>
                <button disabled={disabled} onClick={printTicket}>표 출력</button>
                <button disabled={disabled} onClick={goToRefundPage}>환불하기</button>
            </div>
        </div>
    )
};

export default OrderItem;