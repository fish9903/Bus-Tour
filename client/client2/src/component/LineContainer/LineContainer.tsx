import styles from './LineContainer.module.css';

interface LContainerProps {
    children?: React.ReactNode,
    title?: string,
    grid?: boolean
}

const LineContainer: React.FC<LContainerProps> = (props) => {
    return (
        <div className={styles['lc']}>
            <h2 className={styles['title']}>
                {props.title}
            </h2>
            <div className={styles['line']}>
                <div className={`${props.grid === undefined || props.grid === true ? styles['lcc'] : ''}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default LineContainer;