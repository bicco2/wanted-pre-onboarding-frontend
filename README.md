# **원티드 프리온보딩**

## 프론트엔드 인턴십 사전 과제

<br>

### 배포 링크

---

ㄴㅇㅁㄹ

### 미리보기

---

ㅁㄴㅇㄹ

### 프로젝트 실행 방법

---

#### 1. git clone <br>

```bash
git clone https://github.com/bicco2/wanted-pre-onboarding-frontend.git
```

#### 2. install

```bash
npm install
```

#### 3. start

```bash
npm start
```

<br>
<br>
<br>

# 기능구현

## 로그인/ 회원가입

1. 회원가입 , 로그인 유효성 검사

- 이메일 조건: @ 포함
- 비밀번호 조건: 8자 이상
- 하나라도 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여해주세요

2. 회원가입 완료 => 로그인 페이지로 이동

3. 로그인 완료 => todo 페이지로 이동

- 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
- 응답받은 JWT는 로컬 스토리지에 저장해주세요

4. 리다이렉트 구현

- 로컬 스토리지에 토큰 o => /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트
- 로컬 스토리지에 토큰 x => /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요

## 투두리스트

5. /todo 에는 리스트 목록이 보이도록

- todo 내용 + 완료 여부 표시 + 수정 + 삭제
- 수정시 => 제출과 취소 버튼 생성

6. todolist 추가할수있는 input과 button 만들기

- TODO 입력 input에는 data-testid="new-todo-input" 속성을 부여해주세요
- TODO 추가 button에는 data-testid="new-todo-add-button" 속성을 부여해주세요

7. 체크박스로 완료 여부
