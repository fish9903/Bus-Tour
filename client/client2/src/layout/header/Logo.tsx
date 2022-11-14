import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo: React.FC = (props) => {
    return (
        <h1>
            <Link to='/' className={styles.logo}>
                <img
                    src='/travel_logo3.png'
                    alt='여행은 트래블'
                    className={styles.logo_image}/>
                <div className={styles.logo_text}>트래블</div>
            </Link>
        </h1>
    )
};

export default Logo;