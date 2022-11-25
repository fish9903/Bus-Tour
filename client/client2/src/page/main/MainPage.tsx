import styles from './MainPage.module.css';

const MainPage : React.FC = (props) => {
    return (<div className={styles['page-layout']}>
        <img src='/travel_main.png'
            alt='트래블 메인 로고'/>
    </div>)
};

export default MainPage;