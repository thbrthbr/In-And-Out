![header](https://user-images.githubusercontent.com/27846824/201936135-ee9ad674-ca48-4edd-bd1c-5a4dc37f5f80.png)


# In-And-Out

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Description

<table>
  <tr>
    <td>
달력 UI를 통한 수입/지출 체크 및 일기 쓰기 그리고 다양한 인터페이스로 심플한 수입/지출 관리 서비스를 제공하는 사이트
    </td>
  </tr>
</table>

#### Demo

> live demo: [link](http://ec2-3-34-206-181.ap-northeast-2.compute.amazonaws.com:3000/)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 기획 배경 및 해결하고자 하는 문제

<table>
  <tr>
    <td>
단순한 가계부를 작성하기에는 기존에 존재하는 네이버 가계부와 같은 앱들이 UI/UX 관점에서 복잡하고 한눈에 들어오지 않아 사용자가 필요한 부분에 집중 할 수 있게 Material Design과 기존 부족한 그래프 기능을 보완하기 위해 Chart.js를 사용해 심플한 가계부를 만들었습니다. 또, 일기기능을 추가하여 그 날의 수입지출내역을 회고할 수 있습니다.
    </td>
  </tr>
</table>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 프로젝트 구조

![structure-final](https://user-images.githubusercontent.com/98104603/204092433-41a98f24-cdc7-4240-b217-25c119252a7c.png)


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 핵심 기능

1. 달력
   (영상)
2. 수입/지출
   (영상)
3. 월간/연간 보고서
<div>
   <img src="https://user-images.githubusercontent.com/70008599/202196778-b4a1a90a-c3b7-4e67-93fd-8294d254babb.gif"/>
</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 사용한 기술 및 배포 환경

#### Frontend
<div style="display: flex">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=flat&logo=Create React App&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/Material Design-757575?style=flat&logo=Material Design&logoColor=white" />
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=white" />
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-0078D7?style=flat&logo=Zulip&logoColor=white" />
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat&logo=FormStack&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=Chart.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=React Router&logoColor=white" />
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white" />
</div>

#### Backend
<div style="display: flex">
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white" />
  <img src="https://camo.githubusercontent.com/8b52054528b341c998fd4cb3fba8cd8e55e39c57ea13f5c28e050c92eaed90eb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e6725323053656375726974792d3644423333463f7374796c653d666c61742d737161757265266c6f676f3d737072696e675365637572697479266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-sqaure&amp;logo=springSecurity&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/dc0e549bfa4cf04e928f1e2e27c290e4ef9fb4446e5f8a884693c59bb348ec53/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537072696e67253230446174612532304a70612d3644423333463f7374796c653d666c61742d737161757265266c6f676f3d61717561266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Spring%20Data%20Jpa-6DB33F?style=flat-sqaure&amp;logo=aqua&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/5381c0ce10938fe4bdf54440d3b6ba0531fd7d8c08f1ab9e95d380181e6ee53f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f517565727944736c2d3564396262393f7374796c653d666c61742d737161757265266c6f676f3d41706163686545436861727473266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/QueryDsl-5d9bb9?style=flat-sqaure&amp;logo=ApacheECharts&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/330a65adef4d67548f214e118eaaa57f0687a47ca9b37e95e0d4c5bca8afd4d2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4f41757468322d4543314332343f7374796c653d666c61742d737161757265266c6f676f3d4175746879266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/OAuth2-EC1C24?style=flat-sqaure&amp;logo=Authy&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/e1500726b022f759d8ece0166d7c146a81ced17fb207ae4763d9d68ff16575f5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f636b65722d3234393645443f7374796c653d666c61742d737161757265266c6f676f3d646f636b6572266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Docker-2496ED?style=flat-sqaure&amp;logo=docker&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/3f31e2c0cf8ed8130b9d9b7dd1d7c3b2022c531d655214d9d0a7e26e78f07e68/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656469732d4443333832443f7374796c653d666c61742d737161757265266c6f676f3d7265646973266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Redis-DC382D?style=flat-sqaure&amp;logo=redis&amp;logoColor=white" style="max-width: 100%;">  
  <img src="https://camo.githubusercontent.com/07dbe160a6f32b1bd15a66b7c6d4f1212faa0626bcad983050183df0dd6ebb67/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d7953716c2d3434373941313f7374796c653d666c61742d737161757265266c6f676f3d6d7973716c266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/MySql-4479A1?style=flat-sqaure&amp;logo=mysql&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white" />
  <img src="https://camo.githubusercontent.com/c0ca2cf082c453b516c646405b8c8ec9bcc52ba00ef7bf6b7a3e21bd27750e41/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532532305244532d3532374646463f7374796c653d666c61742d737161757265266c6f676f3d616d617a6f6e524453266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/AWS%20RDS-527FFF?style=flat-sqaure&amp;logo=amazonRDS&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/e1b339e6af8ad8fe29af009307ec959397916548464f2f9757883ead315face1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f41575325323053332d3536394133313f7374796c653d666c61742d737161757265266c6f676f3d616d617a6f6e5333266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/AWS%20S3-569A31?style=flat-sqaure&amp;logo=amazonS3&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/fd6b227fef8e2cd13eac4912e29d5b1bfc6e9250ae9b3376d110aec2eea18ba5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f537761676765722d3835454132443f7374796c653d666c61742d737161757265266c6f676f3d73776167676572266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-sqaure&amp;logo=swagger&amp;logoColor=white" style="max-width: 100%;">
  <img src="https://camo.githubusercontent.com/41e7772279691487576f8e6892b1c4a3be96c2d86a2e1fa777f158aa28ab52b3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a656e6b696e732d4432343933393f7374796c653d666c61742d737161757265266c6f676f3d4a656e6b696e73266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Jenkins-D24939?style=flat-sqaure&amp;logo=Jenkins&amp;logoColor=white" style="max-width: 100%;">
</div>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

#### Team (담당한 업무)
<details>
<summary> 윤지용 </summary>

1. 달력
2. 수입
3. 보고서(수입)
4. 엑셀
</details>
<details>
<summary> 오근협 </summary>

1. 일기
2. 지출
3. 보고서(지출)
</details>
<details>
<summary> 김란 </summary>

1. 로그인, OAuth 로그인
2. 회원가입 및 회원관련
</details>
<details>
<summary> 이태희 </summary>

1. 일기
2. 달력
3. api formData 통신
4. 스타일링 
</details>
<details>
<summary> 김찬주 </summary>
  
1. 회원가입 및 정보 수정
- react-hook-form + yup을 사용한 입력 정보 유효성 검사 

2. 수입/지출
- react-data-grid를 사용한 수입/지출 및 보고서 표 작성 및 드롭다운 메뉴 커스터마이징

3. 보고서
- chart.js를 사용한 월간/연간 보고서 작성 및 그래프 커스터마이징

4. 기타
- react query를 사용한 빠른 서버 데이터 변경 반영 및 오래된 데이터 자동 업데이트
-  Material 디자인 적용
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### 개발 관련 문서

<details>
<summary> 피그마 </summary>
<img src="https://user-images.githubusercontent.com/27846824/201936269-b0577211-007a-4fad-9cb4-c43cbf354459.PNG"/>

</details>

<details>
<summary> API 명세서 </summary>
  <img src="https://user-images.githubusercontent.com/27846824/202340046-95c1c07f-2548-4350-b297-7c1e173d9001.jpg"/>
  <img src="https://user-images.githubusercontent.com/27846824/202340051-9e281588-5ae2-45ab-891f-c0b83da78499.jpg"/>
  <img src="https://user-images.githubusercontent.com/27846824/202340053-e8afa899-0324-40c8-8249-64e8cb0efba9.jpg"/>
  <img src="https://user-images.githubusercontent.com/27846824/202340057-02a43df8-fcf7-4857-ae35-080c6ac3d335.jpg"/>
  
</details>

<details>
<summary> ERD </summary>
<img src="https://user-images.githubusercontent.com/27846824/201935663-d41af558-046d-4aac-8fef-4dc597815df5.png"/>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Getting Started

#### Frontend

1. devDependency 패키지를 설치한다

```javascript
npm install -f
(Material ui library가 react 18 버전과 dependency 문제가 있어서 -f 옵션 필요 )
```

2. ./client 폴더로 이동해 프로젝트를 실행한다

```javascript
npm start
```

#### Backend


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### Licence

MIT
