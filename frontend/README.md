# React + TypeScript + Vite

반응형 구현된 디자인
생성형 AI를 이용한 이미지 생성 체험형 서비스

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

## 폰트

구글 open sans<br>
<br>

## 배포

1. GitHub Actions에서 프로젝트를 빌드
2. 빌드 결과물을 EC2로 전송
3. PM2로 Node 서버 실행
4. Apache로 정적 파일 서빙 및 Node 서버로 프록시
5. 자동 배포 완료

## 라이브러리

- hangul.js : 영타->한글변환

## 트러블슈팅

- inko : vite와의 충돌로 추측..hangul.js로 대신함
