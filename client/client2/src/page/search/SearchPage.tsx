import { useLoaderData, LoaderFunction, useNavigation } from "react-router-dom";
import CourseList from "../../component/CourseList/CourseList";
import HeadLine from "../../component/Headline/HeadLine";
import SearchForm from "../../component/SearchForm/SearchForm";
import { fakeNetwork } from "../../fakenet";
import styles from './SearchPage.module.css';
import axios from 'axios';
import { CourseWithThumbnail } from "../../interface/Course.interface";

// loader의 return type 지정
// useLoaderData는 어차피 unknown으로 되어 있어서 바꿔도 의미 없음.

interface Ret {
    data: CourseWithThumbnail[],
    q: string,
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? "";

    let arr: CourseWithThumbnail[] = [];
    if (query !== '') {
        arr = await fakeNetwork(query);
    }
    // 여기서 데이터 fetch 수행.
    return { data: arr, q: query };
}

const SearchPage: React.FC = (props) => {
    const { data, q } = useLoaderData() as Ret;
    const navigation = useNavigation(); // 로딩 중 띄우는 용도

    return (
        <div className={styles['page-layout']}>
            <HeadLine content="여행지 찾기" />
            <SearchForm />
            <div hidden={!(navigation.state === 'loading')}>찾는중......</div>
            <CourseList list={data} />

        </div>
    )
};

export default SearchPage;