import CInfo from "./CInfo/CInfo";
import CInfoItem from "./CInfo/CInfoItem";
import styles from "./Footer.module.css";

const Footer: React.FC = (props) => {
    return (
        <footer className={styles['footer']}>
            <CInfo title="진행 기간">
                <CInfoItem name="09.13 ~ 09.26">
                    <div>주제 선정</div>
                    <div>문제 기술서 작성</div>
                </CInfoItem>
                <CInfoItem name="09.27 ~ 10.11">
                    <div>유스케이스 설계</div>
                    <div>유스케이스 명세 작성</div>
                </CInfoItem>
                <CInfoItem name="10.15 ~ 11.08">
                    <div>액티비티 다이어그램</div>
                    <div>시퀀스 다이어그램</div>
                    <div>클래스 다이어그램</div>
                    <div>UI 설계</div>
                </CInfoItem>
                <CInfoItem name="11.11 ~ 11.29">
                    <div>설계 기반 구현</div>
                    <div>동작 시연</div>
                </CInfoItem >
            </CInfo>
            <CInfo title="구성원">
                <CInfoItem name="팀장">
                    <div>2018112072 조광호</div>
                    <div>백엔드</div>
                </CInfoItem>
                <CInfoItem name="팀원">
                    <div>2018112070 이희준</div>
                    <div>프론트엔드, 백엔드</div>
                    <div>데이터베이스 구현</div>
                </CInfoItem>
                <CInfoItem name=" ">
                    <div>2019113577	이대엽</div>
                    <div>백엔드</div>
                </CInfoItem>
                <CInfoItem name=" ">
                    <div>2019112074 조영승</div>
                    <div>프론트엔드</div>
                </CInfoItem>
            </CInfo>

        </footer>
    )
};

export default Footer;