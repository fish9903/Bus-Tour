import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from './header/Header';
import '../index.css';
import Footer from './footer/Footer';

/**
 * 메인 레이아웃 컴포넌트. header 정보나 네비게이션 등을 표현
 */
const Layout: React.FC = (props) => {
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
}

export default Layout;