import "./index.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

import { UseInputValidation } from "../../hooks/useInputValidation";
import { SignInHook } from "../../api/users";

export default function SignInPage() {
  const emailCustomHook = UseInputValidation(/@/g);
  const pwCustomHook = UseInputValidation(/^.{8,}$/);

  const navigate = useNavigate();

  const handleBtn = async () => {
    const apiResponse = await SignInHook({
      email: emailCustomHook.value,
      password: pwCustomHook.value,
    });
    if (apiResponse) {
      alert("success");
      navigate("/todo");
    }
  };

  return (
    <div className="container">
      <h1 className="title">로그인</h1>
      <div className="form">
        <label>
          <span>이메일</span>
          <input
            data-testid="email-input"
            type="email"
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
            onChange={pwCustomHook.handleChange}
            placeholder="비밀번호를 입력해주세요"
          />
          {!pwCustomHook.isValid && <p>8자리 이상이여야 합니다.</p>}
        </label>
        <button
          data-testid="signin-button"
          type="submit"
          disabled={!pwCustomHook.isValid || !emailCustomHook.isValid}
          onClick={handleBtn}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
