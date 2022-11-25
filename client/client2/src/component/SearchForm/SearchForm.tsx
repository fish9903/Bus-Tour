import { Form } from "react-router-dom";
import styles from './SearchForm.module.css';
const SearchForm: React.FC<{init?: string}> = (props) => {
    return (
        <Form
            className={styles['search-form']}
            id='search-form'
            role='search'
            method='get'>
            <input className={styles['search-input']}
                id='q'
                aria-label='search travel list'
                type='search'
                name='q'
                placeholder="여행지 검색 ex) 강원도 강릉" />
            <button className={styles['search-button']}>
                <img
                    className={styles['search-icon']}
                    src="/search.svg"
                    aria-label='search button' />
            </button>
        </Form>
    )
}

export default SearchForm;