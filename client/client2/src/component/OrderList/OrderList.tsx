import { IOrderWithCourseInfo } from '../../interface/Order.interface';
import OrderItem from './OrderItem';
import styles from './OrderList.module.css';

interface IOrderList {
    list: IOrderWithCourseInfo[];
}


const OrderList: React.FC<IOrderList> = (props) => {
    console.log(props.list)
    return (
        <section className={styles['list']}>
            <h2 className={styles['title']}>구매 목록</h2>
            <div className={styles['list-container']}>
                <div>
                    {props.list.length > 0 ?
                    props.list.map(it => <OrderItem item={it} key={it.id}/>)
                : <div>조회된 구매 내역이 없습니다!</div>}
                </div>
            </div>
        </section>)
};

export default OrderList;