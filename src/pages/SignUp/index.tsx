import React from "react";
import "./index.scss";
import { UseInputValidation } from "../../hooks/useInputValidation";

export default function index() {
  const emailCustomHook = UseInputValidation(/@/g);
  const pwCustomHook = UseInputValidation(/^.{8,}$/);

  return (
    <div className="container">
      <h1 className="title">회원가입</h1>
      <div className="form">
        <label>
          <span>이메일</span>
          <input
            data-testid="email-input"
            type="email"
            value={emailCustomHook.value}
            onChange={emailCustomHook.handleChange}
            placeholder="이메일을 입력해주세요"
          />
          {!emailCustomHook.isValid && <p>'@'가 포함되어야 합니다.</p>}
        </label>
        <label>
          <span>비밀번호</span>
          <input
            data-testid="password-input"
            type="password"
            value={pwCustomHook.value}
            onChange={pwCustomHook.handleChange}
            placeholder="비밀번호를 입력해주세요"
          />
          {!pwCustomHook.isValid && <p>8자리 이상이여야 합니다.</p>}
        </label>
        <button data-testid="signup-button" type="submit">
          가입하기
        </button>
      </div>
    </div>
  );
}

//   const pattern = /^.{8,}$/;
