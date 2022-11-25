import Logo from "./Logo";
import Navigation from "./navigation/Navigation";
import styles from "./Header.module.css";

const Header: React.FC = (props) => {
    return (
        <div className={styles['top_tab']}>
        <Logo/>
        <Navigation/>
    </div>
    )
};

export default Header;