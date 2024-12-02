import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [ho_ten, setHo_ten] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [so_dien_thoai, setSo_dien_thoai] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Xóa thông báo lỗi

    try {
      const response = await api.post('/auth/register', {
        ho_ten,
        username,
        password,
        email,
        so_dien_thoai
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.response.data.message); // Hiển thị thông báo lỗi từ server
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Đăng Ký</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ho_ten">Họ Tên:</label>
            <input type="text" id="ho_ten" name="ho_ten" value={ho_ten} onChange={(e) => setHo_ten(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Tên Đăng Nhập:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật Khẩu:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="so_dien_thoai">Số Điện Thoại:</label>
            <input type="tel" id="so_dien_thoai" name="so_dien_thoai" value={so_dien_thoai} onChange={(e) => setSo_dien_thoai(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn">Đăng Ký</button>
        </form>
        <a href="/login" className="back-link">Trở về trang đăng nhập</a>
      </div>
    </div>
  );
}

export default Register;