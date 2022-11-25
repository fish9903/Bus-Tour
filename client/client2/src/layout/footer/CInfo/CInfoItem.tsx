
import styles from "./CInfoItem.module.css";

interface CInfoItemProps {
    name?: string;
    children?: React.ReactNode;
}

const CInfoItem: React.FC<CInfoItemProps> = (props) => {
    return (
        <div className={styles['info-item']}>
            <div className={styles['title']}>{props.name}</div>
            <div className={styles['targets']}>{props.children}</div>
        </div>
    )
};

export default CInfoItem;