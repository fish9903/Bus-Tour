import { Link } from 'react-router-dom';
import { CourseWithThumbnail } from '../../interface/Course.interface';
import styles from './CourseItem.module.css';


const CourseItem: React.FC<CourseWithThumbnail> = (props) => {
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