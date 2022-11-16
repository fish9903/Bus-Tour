import { LoaderFunction } from "react-router-dom";
import HeadLine from "../../component/Headline/HeadLine";
import styles from './ErrorPage.module.css';

const loader: LoaderFunction = ({request,params}) => {
    const reason = request.body;
}

const ErrorPage: React.FC = () => {
    return (
    <div className={styles['layout']}>
        <HeadLine content="오류가 발생했어요!" />
        <img src='travel_logo.png' alt='트래블 로고'/>
        <div className={styles['error-message']}>
            <p>어떤 과정에서 오류가 발생하여 현재 위치로 오게 되었습니다.</p>
            <p>뒤로가기 버튼 또는 상단의 메뉴 바를 이용하여 탐색하세요.</p>
        </div>

    </div>
    )
}

export default ErrorPage;