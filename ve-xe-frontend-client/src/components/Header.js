import React from 'react';
import Logout from './Logout';


function Header() {
  const isLoggedIn = localStorage.getItem('token') !== null;
  // const username = localStorage.getItem('username');
  return (
    <header>
      <div className="header-left">
        <div className="contact-info">
          <span> ✉ nhom9@gmail.com</span>
          <span> ☎ +84 987 654 321</span>
        </div>
      </div>
      <nav className="auth-links">
        {isLoggedIn ? (
          <>
            {/* <span>{username}</span> */}
            <Logout />
          </>
        ) : (
          <>
            <a href="/register">Đăng Ký</a> | <a href="/login">Đăng Nhập</a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;


