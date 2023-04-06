import React from "react";
import "./index.scss";

export default function index() {
  return (
    <div className="container">
      <h1 className="title">회원가입</h1>
      <div className="form">
        <label>
          <span>이메일</span>
          <input
            data-testid="email-input"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </label>
        <label>
          <span>비밀번호</span>
          <input
            data-testid="password-input"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </label>
        <button data-testid="signup-button" type="submit">
          가입하기
        </button>
      </div>
    </div>
  );
}
