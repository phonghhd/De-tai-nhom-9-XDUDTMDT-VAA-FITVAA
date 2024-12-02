import React from 'react';
import logo from '../image/logo.jpg';

function MainNav() {
  return (
    <nav className="main-nav">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul>
        <li><a href="/schedule">Lịch Trình</a></li>
        <li><a href="/">Liên Hệ</a></li>
        <li><a href="/my-tickets">Vé Xe Của Tôi</a></li>
        <li><a href="/Cart">Giỏ Hàng </a></li>
      </ul>
    </nav>
  );
}

export default MainNav;
