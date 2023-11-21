import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonFormData = JSON.stringify(formData);

    try {
      const response = await fetch('http://http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonFormData,
      });

      if (response.ok) {
        // 회원가입 성공 처리
        console.log('회원가입 성공!');
      } else {
        // 회원가입 실패 처리
        console.error('회원가입 실패!');
      }
    } catch (error) {
      console.error('서버 통신 오류:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        사용자명:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUpForm;
