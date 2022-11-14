
import styles from "./CInfo.module.css";
import CInfoItem from "./CInfoItem";

interface CInfoProps {
    title?: string;
    children?: React.ReactNode;
}

const CInfo: React.FC<CInfoProps> = (props) => {
    return (
        <div className={styles['info-container']}>
            <div className={styles['title']}>{props.title}</div>
            <div className={styles['targets']}>
                {props.children}
            </div>
        </div>
    )
};

export default CInfo;