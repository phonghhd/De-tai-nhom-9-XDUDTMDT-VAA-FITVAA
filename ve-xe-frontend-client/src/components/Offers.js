import React from 'react';
import uudai from '../image/uudai.jpg';
import gioithieu from '../image/gioithieu.jpg';
import khuhoi from '../image/khuhoi.jpg';

function Offers() {
  const offers = [
    {
      "title": "THỨ 3 HÀNG TUẦN",
      "description": "12h - 14h Thứ 3 hàng tuần - Flash Sale đến 50%",
      "image": uudai
    },
    {
      "title": "THƯƠNG NHAU GỬI CODE CHO NHAU",
      "description": "Giới thiệu bạn mới - Nhận quà khủng",
      "image": gioithieu
    },
    {
      "title": "ĐẶT VÉ KHỨ HỒI",
      "description": "Nhận ưu đãi x2 khi đặt dịch vụ xe khách khứ hồi",
      "image": khuhoi
    }
  ];
  
  return (
    <div className="container">
      <h1>Chương Trình nổi bật</h1>
      <div className="offers">
        {offers.map((offer, index) => (
          <div className="offer" key={index}>
            <img src={offer.image} alt={offer.title} className="offer-image" />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Offers;
