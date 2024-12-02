import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    // Chuyển hướng về trang chủ
    navigate('/');
  };

  return (
    <button className="submit-btn" onClick={handleLogout}>Đăng Xuat</button>
  );
}

export default Logout;
