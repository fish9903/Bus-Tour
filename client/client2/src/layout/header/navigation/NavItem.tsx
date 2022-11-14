import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

/**
 * @prop to: 링크 주소
 * @prop title: 링크 이름 
 */
export interface NavitemProps {
    to: string;
    name: string;
}

/**
 * 네비게이션의 각 항목들. 상위에서 NavitemProps에 해당하는 인자를 받아야 한다.
 */
const Navitem: React.FC<NavitemProps> = (props) => {
    return (
        <li className={styles['nav_item']} key={props.to}>
            <NavLink
                to={props.to}
                className={({ isActive }) =>
                    isActive ?
                        styles['active_nav']
                        : styles['nav']
                }>
                {props.name}
            </NavLink>
        </li>)
}

export default Navitem;