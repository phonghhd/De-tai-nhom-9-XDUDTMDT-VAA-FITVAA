import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MainNav from '../components/MainNav';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import Offers from '../components/Offers';
import api from '../services/api';
import Footer from '../components/footer';
import ProductList from '../components/ProductList';

function Home({ isLoggedIn, username, onLogout }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Lấy danh sách sản phẩm nổi bật từ server
    api.get('/products')
      .then(response => {
        setOffers(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch offers:', error);
      });
  }, []);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={onLogout} />
      <MainNav />
      <Hero />
      <SearchForm />
      <Offers offers={offers} />
      <ProductList products={offers} />
      <Footer />
    </div>
  );
}

export default Home;
