import { Link } from 'react-router-dom';
import styles from './CourseItem.module.css';

export interface CourseItemProps {
    id: number;
    thumbnail: string;
    name: string;
    short_desc: string;
}

const CourseItem: React.FC<CourseItemProps> = (props) => {
    return (
        <Link to={`/detail/${props.id}`}
            className={styles['item']}>
            <img className={styles['thumbnail']}
                src={props.thumbnail}
                alt={props.name}
            />
            <div className={styles['item-info']}>
                <h3>{props.name}</h3>
                <div>{props.short_desc}</div>
            </div>
        </Link>
    )
};

export default CourseItem;