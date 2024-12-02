
import { useNavigate, useLocation } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Footer from '../components/footer';

const BookingFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTicket = location.state?.selectedTicket;

  if (!selectedTicket) {
    return (
      <div>
        <p>Vui lòng chọn chuyến xe trước khi đặt vé.</p>
        <button onClick={() => navigate('/')}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Thông tin đặt vé</h1>
      <BookingForm selectedTicket={selectedTicket} /> 
      <Footer />
    </div>
  );
};

export default BookingFormPage;