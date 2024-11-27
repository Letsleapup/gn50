# React + TypeScript + Vite

## 프로젝트 소개

- 강남구 2040 플랜 기반의 학생 대상 AI 체험형 서비스
- AI를 활용한 웹툰 생성과 미래 이미지 생성 기능 제공
- 챗봇 기반의 인터랙티브 사용자 경험

## 팀(프론트엔드 부분) 소개 및 일정

장영권 https://github.com/visvaden7<br>
박초롱 https://github.com/helloghostt<br>
<br>
전체기간 : 2024.10.25 - 2024.11.28 <br>
페이지 작업, API 연동, 테스트 및 디버깅<br>
<br>

## 배포 URL

URL: https://gn50.aixstudio.kr/<br>
Repo: https://github.com/Letsleapup/gn50<br>
<br>

## 폴더구조

<details>
<summary>/frontend</summary>

```bash
frontend/
├── public/             # 정적 파일들
└── src/
   ├── components/      # 컴포넌트 (textarea, layout, loading, banner, button, modal 등)
   ├── pages/           # 페이지 (메인, 체험, 공유, 챗봇, 에러페이지)
   ├── types/           # 인터페이스
   ├── api/             # chatbot, gallery, main, result, select, profanity
   ├── util/            # logger, scrolltotop, getbylength, checkos등
   └── const/           # 상수 선언
```

<details>

## 🔍 주요 기능

1. 대화형 AI 챗봇

   - 사용자 맞춤형 질문-답변 시스템
   - 비속어 필터링 시스템

2. AI 이미지 생성

   - 걷기 좋은 도시 이미지 생성(강남구 공원/녹지 30곳)
   - 시대별 웹툰 생성 (과거/현재/미래의 강남구 모습)
   - 사용자 입력 기반 맞춤형 결과물

3. 갤러리 시스템
   - 생성된 결과물 공유 기능
   - 이미지 및 시나리오 관리

## 기술스택(Freontend)

### Frontend

- **기본**: React 18, TypeScript 5, Vite 4
- **스타일링**: TailwindCSS 3
- **상태관리**: React Query, React Hooks(useState)
- **HTTP 통신**: Axios
- **코드 포맷팅**: Prettier

### AI/ML

- **이미지 생성**: Stable Diffusion 3
- **프롬프트 최적화**: Custom Prompt Engineering

<details>
<summary>결과물 페이지</summary>
![메인페이지1](https://github.com/user-attachments/assets/c4e8d08a-64c7-4be2-af32-a8f52cecf0ad)
![메인페이지2](https://github.com/user-attachments/assets/b392acef-b654-411f-a601-71576a7decc3)
![메인페이지3](https://github.com/user-attachments/assets/498c4bf3-ad9f-40aa-b328-bdca39323c97)
![체험페이지1](https://github.com/user-attachments/assets/f0b9f5fe-1bd4-40a8-af0f-f6dd7e4d762f)
![체험-모달](https://github.com/user-attachments/assets/a7999ddb-1188-4ed7-8a81-704cfacf9548)
![챗봇페이지](https://github.com/user-attachments/assets/173f25e5-51c2-4ccf-90c4-64a2d2ed44ce)
![생성페이지](https://github.com/user-attachments/assets/999e50b1-4e9f-4508-b36b-e287cf53b00e)
![시나리오수정](https://github.com/user-attachments/assets/4ccd1c16-48ec-4606-a8eb-a1be2898291c)
![체험페이지2](https://github.com/user-attachments/assets/5a3dace7-85ac-4e9b-84de-96790b7b5bde)
![갤러리1](https://github.com/user-attachments/assets/1e52c586-0e42-4654-9b08-b0e843e1f4de)
![갤러리2](https://github.com/user-attachments/assets/ebe4af7a-6aa2-4798-81a3-2575c44b0e9a)
![상세페이지](https://github.com/user-attachments/assets/0aa87384-35a4-4bfc-918c-1215941c1a0b)
</details>

<details>
<summary>초기세팅 명령어</summary>

npm create vite@latest my-chatbot-app -- --template react-ts<br>
cd my-chatbot-app<br>
npm install<br>
npm install -D tailwindcss postcss autoprefixer<br>
npx tailwindcss init -p<br>
npm install axios @types/react @types/react-dom @types/react-router-dom eslint prettier eslint-config-prettier eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-react<br>
npm install swiper @types/swiper<br>
<br>
axios: HTTP 클라이언트<br>
@types/react, @types/react-dom, @types/react-router-dom: React 관련 타입 정의<br>
eslint, prettier: 코드 품질 및 스타일 도구<br>
eslint-config-prettier: ESLint와 Prettier 충돌 방지<br>
eslint-plugin-react-hooks: React Hooks 규칙<br>
@typescript-eslint/eslint-plugin, @typescript-eslint/parser: TypeScript ESLint 도구<br>

<br>
@tailwind base;<br>
@tailwind components;<br>
@tailwind utilities;<br>

</details>

## 폰트

- 구글 open sans<br>
  <br>

## 배포

1. GitHub Actions에서 프로젝트를 빌드
2. 빌드 결과물을 EC2로 전송
3. PM2로 Node 서버 실행
4. Apache로 정적 파일 서빙 및 Node 서버로 프록시
5. 자동 배포 완료

## 라이브러리

- hangul.js : 영타->한글변환
- TailwindCSS : 스타일링
- Axios: HTTP 클라이언트

## 트러블슈팅

### inko

- **문제**: vite와의 충돌로 추측.
- **해결**: hangul.js로 대신함

### 채팅 히스토리 관리 문제

- **문제**: React의 상태 업데이트 비동기 특성으로 인한 채팅 히스토리 누락
- **해결**:
  - 상태 의존성 제거 및 파라미터 기반 데이터 전달 방식 도입
  - useCallback 의존성 배열 최적화
  - 컴포넌트 생명주기 고려한 상태 관리 로직 재설계

### AI 이미지 생성 최적화

- **문제**: 불안정한 이미지 생성 품질과 긴 생성 시간
- **해결**:
  - 프롬프트 엔지니어링 최적화
  - 네거티브 프롬프트 조정
  - 토큰 제한 및 할루시네이션 감소를 위한 프롬프트 구조화
