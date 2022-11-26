import { useLoaderData, LoaderFunction, Link } from "react-router-dom";
import HeadLine from "../../component/Headline/HeadLine";
import ReactMarkdown from "react-markdown";
import {ICourseWithPrograms, ICourseWithThumbnail} from "../../interface/Course.interface";

import styles from './DetailPage.module.css';
import { useMemo } from "react";
import { dateOptions } from "../../util/date-option";
import { costNames } from "../../util/costNames";
import {fakeNetwork, mockprogram} from "../../fakenet";
import axios from "axios";

interface Ret extends ICourseWithPrograms {
    data: ICourseWithPrograms,
}



export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id'] ?? "";
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? "";
    // 여기서 데이터 fetch 수행.
    const res = await axios.get(`/server/courseDetail/${id}`);
    const str = JSON.stringify(res.data);
    const arr = JSON.parse(str);
    //console.log(res.data);
    console.log(arr);

    return arr;
}

const DetailPage: React.FC = (props) => {
    const data = useLoaderData() as Ret;
    const timetr = useMemo(() => data.programs.map(
        it => <tr key={it.id}>
            <td>{it.dep_date.toLocaleString('ko-KR', dateOptions)}</td>
            <td>{it.ariv_date.toLocaleString('ko-KR', dateOptions)}</td>
        </tr>
    ), [data.programs]);

    const costtr = useMemo(() => data.priceinfos.map(
        it => {
            const typename = costNames.get(it.type);
            return <tr key={it.type}>
                <td>{typename}</td>
                <td>{it.price}</td>
            </tr>
        }
    ), [data.priceinfos]);



            return (
            <div className={styles['page-layout']}>
                <span className={styles['headline']}>
                    <HeadLine content={data.name} />
                </span>
                <div className={styles['desc-layout']}>
                    <img className={styles['thumbnail']}
                        src={data.thumbnail}
                        alt={data.name} />

                    <table className={styles['cost-table']}>
                        <thead>
                            <tr>
                                <th colSpan={2}>가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {costtr}
                        </tbody>
                    </table>

                    <table className={styles['time-table']}>
                        <thead>
                            <tr>
                                <th colSpan={2}>기간</th>
                            </tr>
                            <tr>
                                <th>출발</th>
                                <th>도착</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetr}
                        </tbody>
                    </table>

                    <div className={styles['short-desc']}>
                        <h3 className={styles['headline']}>간략한 설명</h3>
                        <div>{data.short_desc}</div>
                    </div>
                </div>

                <div className={styles['description']}>
                    <h3 className={styles['headline']}>상세 설명</h3>
                    <div className={styles['desc-text']}>
                        <ReactMarkdown children={data.description} />
                    </div>
                </div>
                <div className={styles['purchase-info']}>
                    <Link to={`/purchase/${data.id}`} className={styles['purchase-button']}>예약하기</Link>
                </div>
            </div>
            )
};

            export default DetailPage;