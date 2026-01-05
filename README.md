# 🎮 포켓몬 도감 (Pokemon Encyclopedia)

React + TypeScript로 만든 인터랙티브 포켓몬 도감 웹 애플리케이션

## 🔗 배포 링크

**Live Demo:** https://pokemon2025-five.vercel.app

## ✨ 주요 기능

### 🏠 포켓몬 목록

- 151마리의 1세대 포켓몬 정보 제공
- 무한 스크롤로 자동 로딩 (28개씩)
- 검색 기능 (한글 이름)
- 정렬 기능 (이름순/번호순)

### 📊 상세 정보

- 포켓몬 이미지 및 기본 정보
- 타입, 키, 몸무게
- 능력치 (HP, 공격, 방어, 특수공격, 특수방어, 스피드)
- 상세 설명

### ❤️ 즐겨찾기

- 좋아하는 포켓몬 저장
- 즐겨찾기 전용 페이지
- localStorage로 데이터 유지

### 🎯 퀴즈

- 포켓몬 이름 맞추기 퀴즈
- 실시간 정답 확인

### 🔐 인증

- Firebase 기반 회원가입/로그인
- 이메일 인증

## 🛠 기술 스택

### Frontend

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router** - 라우팅
- **Context API** - 전역 상태 관리

### Backend & API

- **Firebase Authentication** - 사용자 인증
- **PokeAPI** - 포켓몬 데이터

### Deployment

- **Vercel** - 호스팅 및 배포

## 📂 프로젝트 구조

```
poke2025/
├── src/
│   ├── components/        # 재사용 컴포넌트
│   │   ├── header.tsx
│   │   ├── pokeCard.tsx
│   │   ├── pokeList.tsx
│   │   └── ...
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Detail.tsx
│   │   ├── Favorites.tsx
│   │   ├── Quiz.tsx
│   │   └── ...
│   ├── contexts/         # Context API
│   │   ├── AuthContext.tsx
│   │   └── FavoriteContext.tsx
│   ├── hooks/            # Custom Hooks
│   │   ├── usePokemon.ts
│   │   └── usePokemonList.ts
│   ├── constants/        # 상수
│   │   ├── route.ts
│   │   └── type.ts
│   ├── types/            # TypeScript 타입
│   │   └── pokemon.ts
│   └── firebase.ts       # Firebase 설정
├── public/
└── package.json
```

## 💡 주요 구현 사항

### 1. 무한 스크롤

```typescript
// 스크롤 이벤트 감지로 자동 로딩
useEffect(() => {
  const handleScroll = () => {
    if (scrollTop + windowHeight >= documentHeight - 100) {
      setDisplayCount((prev) => prev + 28);
    }
  };
  window.addEventListener("scroll", handleScroll);
}, []);
```

### 2. Context API 활용

```typescript
// 즐겨찾기 전역 상태 관리
const FavoriteContext = createContext();
// localStorage와 연동하여 데이터 영속성 확보
```

### 3. Promise.all로 동시 API 호출

```typescript
// 여러 포켓몬 정보를 동시에 가져와 성능 최적화
const promises = favorites.map((id) => fetch(`api/${id}`));
const results = await Promise.all(promises);
```

### 4. TypeScript 타입 안정성

```typescript
interface Pokemon {
  id: number;
  name: string;
  koreanName: string;
  types: Type[];
  // ...
}
```

## 🚀 로컬 실행 방법

### 1. 클론

```bash
git clone https://github.com/CHPark00-world/poke2025.git
cd poke2025
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일 생성 후 Firebase 설정 추가:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
# ...
```

### 4. 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 📝 배운 점

- **Context API**를 활용한 효율적인 전역 상태 관리
- **Promise.all**로 여러 API를 동시에 호출하여 성능 최적화
- **localStorage**를 활용한 클라이언트 사이드 데이터 영속성
- **TypeScript**로 타입 안정성을 확보하여 런타임 에러 감소
- **무한 스크롤** 구현으로 UX 개선
- **Firebase Authentication** 연동 경험

## 🔜 향후 개선 계획

- [ ] 다크모드 추가
- [ ] 포켓몬 비교 기능
- [ ] 진화 체인 시각화
- [ ] 애니메이션 효과 개선
- [ ] 반응형 디자인 최적화
- [ ] 2세대 이상 포켓몬 추가

## 📄 라이선스

MIT License

---

**개발자:** Park  
**개발 기간:** 2024.12 - 2025.01 (1개월)  
**문의:** parkch8913@naver.com
