import { useLoaderData, LoaderFunction, useNavigation } from "react-router-dom";

import styles from './DetailPage.module.css';

// loader의 return type 지정
// useLoaderData는 어차피 unknown으로 되어 있어서 바꿔도 의미 없음.

interface Ret {
    id: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id'] ?? "";
    return {id};
}

const DetailPage: React.FC = (props) => {
    const data = useLoaderData() as Ret;


    return (
        <div>
            <div>{}</div> 
        </div>
    )
};

export default DetailPage;