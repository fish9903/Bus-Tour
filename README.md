# Bus-Tour
> 소프트웨어공학개론 트래블 팀

## 시작 방법
* server실행: intellij에서 ./server/src/main/kotlin/com/example/Application.kt 실행
* client실행: terminal에서 ./client/client2/ 위치에서 yarn install -> yarn start

## DB 설정
* AWS RDS 사용
* host name: database-1.cpimteab28le.us-east-1.rds.amazonaws.com
* user name: admin
# 사용된 스택 목록
- 프론트엔드
    - typescript
    - react([CRA](https://create-react-app.dev/) 기반)
    - [react-router](https://www.npmjs.com/package/react-router)
    - [react-markdown](https://www.npmjs.com/package/react-markdown)
    - [html-to-image](https://www.npmjs.com/package/html-to-image) : html 상의 표 정보를 이미지로 추출하는데 사용
    - [qrcode.react](https://www.npmjs.com/package/qrcode.react) : 표에 대한 바코드를 생성하는데 사용
    - [axios](https://www.npmjs.com/package/axios)
- 백엔드
    - kotlin
    - [ktor](https://ktor.io/): 코틀린 기반 웹 어플리케이션 서버
    - [exposed](https://github.com/JetBrains/Exposed): kotlin 언어용 ORM
- 데이터베이스
    - mysql(로컬, RDS)
- 다이어그램
    - draw.io

현재 프로젝트에 대한 자세한 사항이 알고 싶으시다면 [docs](https://github.com/fish9903/Bus-Tour/tree/main/docs)의 문서를 참고하세요.
