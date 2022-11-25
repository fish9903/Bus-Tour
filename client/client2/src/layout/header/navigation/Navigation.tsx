import Navitem, { NavitemProps } from "./NavItem";
import styles from "./Navigation.module.css";

const nav_list: NavitemProps[] = [
    { name: '여행지 찾기', to: '/search' },
    { name: '구매내역 조회', to: '/check' }
] // 여기다가 내용 계속 추가하는 방식. 차후 변경될 수 있음

const Navigation: React.FC = (props) => {
    return (
        <nav className="navigation">
            <ul className={styles['nav_list']}>
                {
                    nav_list.map(v => <Navitem name={v.name} to={v.to} key={v.to} />)
                }
            </ul>
        </nav>
    )
};

export default Navigation;