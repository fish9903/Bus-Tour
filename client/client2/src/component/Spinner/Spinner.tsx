import styles from './Spinner.module.css';

const Spinner: React.FC<{isActive: boolean}> = ({isActive}) => {

    return (<div className={`${styles['spinner']} ${isActive?"":styles['hidden']}`}
    >
        <div className={styles['wing']}></div>
        <div className={styles['wing']}></div>
        <div className={styles['text']}>로딩중 ...</div>
    </div>
    )
}

export default Spinner;