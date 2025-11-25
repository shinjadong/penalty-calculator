📋 [Project Spec] CareOn 위약금 계산기 & 면제 훅(Hook) 개발 지시서
프로젝트 개요: CCTV 렌탈 약정 해지 시 발생할 **'예상 위약금'**을 계산해 주어 고객에게 **'공포(비용)'**를 인지시키고, **'케어온 위약금 면제 프로모션'**으로 유도(Nudge)하는 마케팅용 원페이지 웹 앱 개발.

1. 기술 스택 (Tech Stack) - "2025 Best Practice"
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS v4 (or latest)

UI Library: shadcn/ui (필수: Button, Input, Card, Slider, Label)

Form Handling: React Hook Form + Zod (유효성 검사)

Icons: Lucide React

Feedback: Sonner (Toast 알림)

Animation: Framer Motion (숫자 카운팅, 결과 카드 등장 효과)

2. UI/UX 원칙 - "Don't Make Me Think"
압도적 단순함: 잡다한 메뉴, 푸터, 로고 배제. 오직 '계산'에만 집중.

애플 스타일: 넉넉한 여백, 큰 폰트, 부드러운 그림자, 모바일 퍼스트.

즉각적 피드백: 버튼 클릭 시 로딩 없이 즉시 결과 및 토스트 알림 노출.

3. 핵심 기능 명세 (Functional Requirements)
A. 입력 섹션 (Input Form)
월 납부 금액 (Monthly Fee)

입력 방식: 숫자 입력 (단위: 원)

UX: '30,000'처럼 천 단위 콤마 자동 포맷팅.

남은 약정 기간 (Remaining Months)

입력 방식: 슬라이더(Slider) + 직접 입력 병행

범위: 0 ~ 36개월

B. 계산 로직 (Logic) - 공포 소구용 추정치
공식: (월 납부 금액 × 남은 개월 수) × 0.8 (업계 평균 위약금율 가정)

참고: 정확할 필요 없음. "이렇게나 많이?"를 느끼게 하는 것이 목적.

C. 결과 섹션 (Result Card) - 계산하기 버튼 클릭 후 등장
예상 위약금: 빨간색(Red-600)의 굵은 폰트로 크게 표시. (Framer Motion으로 숫자 0부터 촤르륵 올라가는 카운팅 효과 적용)

메시지: "사장님, 이 돈을 진짜 다 내시겠습니까?"

D. 행동 유도 (Call to Action - The Nudge)
버튼: "케어온에서 0원으로 만들기 (면제 확인)"

스타일: 화면 너비 꽉 차는 대형 버튼, 브랜드 컬러(Blue/Green 계열) 사용.

동작:

클릭 시 Sonner Toast 발생: "🎉 축하합니다! 위약금 전액 지원 대상입니다."

3초 후 '상담 신청 폼' 또는 '전화 연결' (Phase 1.1에서는 단순 팝업으로 종결해도 됨).

4. 페이지 구조 (Page Structure)
app/
├── layout.tsx       # 전체 레이아웃 (폰트 설정: Pretendard 추천)
└── page.tsx         # 메인 페이지
    ├── components/
    │   ├── CalculatorForm.tsx  # 입력 폼 & 계산 로직
    │   ├── ResultCard.tsx      # 결과 표시 & 애니메이션
    │   └── NudgeButton.tsx     # CTA & Toast 트리거
5. 작업 단계 (Step-by-Step Guide for Claude)
Step 1: 프로젝트 셋업

Next.js 15 설치, Tailwind 세팅.

shadcn-ui 초기화 및 필요 컴포넌트(button, input, slider, card) 설치.

sonner, framer-motion, react-hook-form, zod 설치.

Step 2: UI 컴포넌트 구현

CalculatorForm: Zod 스키마 정의 (숫자만 입력 가능).

입력 필드 디자인: 모바일에서 터치하기 편하게 높이 50px 이상.

Step 3: 로직 연결

useForm의 watch 기능을 사용해 실시간 계산 혹은 '조회하기' 버튼 트리거 구현.

결과 값에 따라 ResultCard가 부드럽게 나타나는 애니메이션(AnimatePresence) 구현.

Step 4: 넛지(Nudge) 구현

결과 하단 CTA 버튼 클릭 시 toast.success 실행.

메시지: "위약금 면제 프로모션 코드 [CARE2025]가 적용되었습니다." (구체성 부여)