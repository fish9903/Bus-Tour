import { useLoaderData, LoaderFunction, Link } from "react-router-dom";
import HeadLine from "../../component/Headline/HeadLine";
import ReactMarkdown from "react-markdown";
import { CourseWithPrograms } from "../../interface/Course.interface";

import styles from './DetailPage.module.css';
import { useMemo } from "react";
import { dateOptions } from "../../util/date-option";

// loader의 return type 지정
// useLoaderData는 어차피 unknown으로 되어 있어서 바꿔도 의미 없음.

interface Ret extends CourseWithPrograms { }

const program: CourseWithPrograms = {
    id: 1,
    name: "강원도 속초",
    short_desc: "아름다운 강원도 속초로 놀러오세요~",
    thumbnail: "/ugly_cat.jpg",
    description: `A paragraph with *emphasis* and **strong importance**.

    > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
    
    * Lists
    * [ ] todo
    * [x] done
    
    A table:
    
    | a | b |
    | - | - |
    `,
    programs: [
        {
            id: 1,
            ariv_date: new Date('2022-10-11'),
            dep_date: new Date('2022-10-10'),
            state: "ok",
            max_count: 40,
            rem_count: 10,
            cid: 1,
        },
        {
            id: 2,
            ariv_date: new Date('2022-10-12'),
            dep_date: new Date('2022-10-11'),
            state: "ok",
            max_count: 40,
            rem_count: 10,
            cid: 1,
        },
        {
            id: 3,
            ariv_date: new Date('2022-10-13'),
            dep_date: new Date('2022-10-12'),
            state: "ok",
            max_count: 40,
            rem_count: 10,
            cid: 1,
        }
    ],
    priceinfos: [
        { price: 5000, type: "아동" },
        { price: 7500, type: "청소년" },
        { price: 10000, type: "성인" },

    ]
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params['id'] ?? "";
    return program;
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
        it => <tr key={it.type}>
            <td>{it.type}</td>
            <td>{it.price}</td>
        </tr>
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