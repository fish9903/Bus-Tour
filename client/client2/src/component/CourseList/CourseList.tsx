import CourseItem, { CourseWithThumbnail } from './CourseItem';
import styles from './CourseList.module.css';
const CourseList: React.FC<{ list: CourseWithThumbnail[] }> = (props) => {
    return (
        <section className={styles['course-list']}>
            <h2 className={styles['title']}>여행지 목록</h2>
            <div className={styles['list-container']}>
            {
                props.list.length > 0 ?
                    props.list.map(it =>
                        <CourseItem
                            id={it.id}
                            name={it.name}
                            thumbnail={it.thumbnail}
                            short_desc={it.short_desc}
                            key={it.id}
                        />)
                    :
                    <div>선택된 물건이 없습니다!</div>
            }
            </div>
        </section>)
};

export default CourseList;