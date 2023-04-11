import React, { useState } from "react";
import { UseInputValidation } from "../../hooks/useInputValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../constants/constants";
import "./index.scss";
type FormData = {
  email: String;
  password: String;
};

export default function SignUpPage() {
  const emailCustomHook = UseInputValidation(/@/g);
  const pwCustomHook = UseInputValidation(/^.{8,}$/);

  const navigate = useNavigate();

  const handleBtn = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/signup`,
        {
          email: emailCustomHook.value,
          password: pwCustomHook.value,
        } as FormData,
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/signin");
    } catch (error) {
      alert("error");
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h1 className="title">회원가입</h1>
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
          data-testid="signup-button"
          type="submit"
          disabled={!pwCustomHook.isValid || !emailCustomHook.isValid}
          onClick={handleBtn}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
