import styles from './Headline.module.css';

const HeadLine: React.FC<{content: string}> = (props) => {
    return (<h1 className={styles['headline']}>{props.content}</h1>)
}

export default HeadLine;