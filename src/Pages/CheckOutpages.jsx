import React, { useState } from 'react';
import OrderStatusModal from '../components/OrderStatusModal'; // Yeni modalı import ediyoruz
import { useNavigate } from 'react-router-dom'; // Yönlendirme için

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Örnek sepet verileri (gerçek uygulamada bu veriler global state'ten veya API'den gelmeli)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Hamburger Deluxe", price: 120, quantity: 1, image: "https://via.placeholder.com/80x80/333333/FFFFFF?text=H" },
    { id: 2, name: "Spagetti Bolonez", price: 95, quantity: 1, image: "https://via.placeholder.com/80x80/333333/FFFFFF?text=S" },
    { id: 3, name: "Kola (2 Adet)", price: 20, quantity: 2, image: "https://via.placeholder.com/80x80/333333/FFFFFF?text=K" },
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // 'credit_card' veya 'cash_on_delivery'

  // Sipariş durumu modalı için state'ler
  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState(''); // 'success' veya 'error'
  const [orderMessage, setOrderMessage] = useState(''); // Modalda gösterilecek mesaj

  // Toplam sipariş tutarını hesapla
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 15; // Örnek teslimat ücreti
  const total = subtotal + deliveryFee;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Sipariş verme işlemini simüle edelim
    // Gerçek bir uygulamada burada API çağrısı yapılır
    console.log("Sipariş veriliyor...");
    console.log("Sipariş Özeti:", cartItems);
    console.log("Teslimat Adresi:", deliveryAddress);
    console.log("Ödeme Yöntemi:", paymentMethod);

    // Basit bir simülasyon: rastgele başarılı/hatalı sonuç
    const isOrderSuccessful = Math.random() > 0.3; // %70 başarı oranı

    if (isOrderSuccessful) {
      setOrderStatus('success');
      setOrderMessage('Siparişiniz başarıyla alındı ve hazırlanıyor.');
      // Temizlik veya yönlendirme
      // setCartItems([]); // Sepeti boşalt
      // setTimeout(() => navigate('/order-success'), 3000); // 3 saniye sonra yönlendir
    } else {
      setOrderStatus('error');
      setOrderMessage('Ödeme işlemi başarısız oldu. Lütfen kart bilgilerinizi kontrol edin veya farklı bir ödeme yöntemi deneyin.');
    }
    setShowOrderStatusModal(true); // Modalı göster
  };

  const handleCloseOrderStatusModal = () => {
    setShowOrderStatusModal(false);
    // Eğer sipariş başarılı ise ana sayfaya yönlendir (örnek)
    if (orderStatus === 'success') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-400 mb-12">Siparişi Tamamla</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon: Teslimat Adresi ve Ödeme Yöntemi */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teslimat Adresi */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">1. Teslimat Adresi</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="street" className="block text-gray-300 text-sm font-bold mb-2">Adres Satırı</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={deliveryAddress.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                    placeholder="Cadde, Sokak, No"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-gray-300 text-sm font-bold mb-2">Şehir</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={deliveryAddress.city}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                      placeholder="Şehir"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-gray-300 text-sm font-bold mb-2">Posta Kodu</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={deliveryAddress.zipCode}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                      placeholder="Posta Kodu"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-gray-300 text-sm font-bold mb-2">Teslimat Notları (isteğe bağlı)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={deliveryAddress.notes}
                    onChange={handleAddressChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-y"
                    placeholder="Zil bozuk, kapıya bırakın vb."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Ödeme Yöntemi */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">2. Ödeme Yöntemi</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                    className="form-radio h-5 w-5 text-green-500 bg-gray-800 border-gray-600 focus:ring-green-500"
                  />
                  <span className="ml-3 text-lg font-medium text-white">Kredi / Banka Kartı</span>
                </label>
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-4 p-4 bg-gray-700 rounded-md border border-green-500">
                    <div>
                      <label htmlFor="cardNumber" className="block text-gray-300 text-sm font-bold mb-2">Kart Numarası</label>
                      <input type="text" id="cardNumber" className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white" placeholder="XXXX XXXX XXXX XXXX" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-gray-300 text-sm font-bold mb-2">Son Kullanma Tarihi</label>
                        <input type="text" id="expiryDate" className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white" placeholder="AA/YY" required />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-gray-300 text-sm font-bold mb-2">CVV</label>
                        <input type="text" id="cvv" className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white" placeholder="XXX" required />
                      </div>
                    </div>
                  </div>
                )}

                <label className="flex items-center p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="form-radio h-5 w-5 text-green-500 bg-gray-800 border-gray-600 focus:ring-green-500"
                  />
                  <span className="ml-3 text-lg font-medium text-white">Kapıda Ödeme</span>
                </label>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Sipariş Özeti */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg h-fit sticky top-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">3. Sipariş Özeti</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                      <p className="text-lg font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Adet: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-bold">{item.price * item.quantity} TL</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700 space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Ara Toplam:</span>
                <span className="font-medium">{subtotal} TL</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Teslimat Ücreti:</span>
                <span className="font-medium">{deliveryFee} TL</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-gray-700">
                <span>Toplam Tutar:</span>
                <span className="text-green-400">{total} TL</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-xl shadow-lg transition duration-300 transform hover:scale-105"
            >
              Siparişi Tamamla
            </button>
          </div>
        </form>
      </div>

      {/* Sipariş Durum Modalı */}
      <OrderStatusModal
        show={showOrderStatusModal}
        status={orderStatus}
        message={orderMessage}
        onClose={handleCloseOrderStatusModal}
      />
    </div>
  );
};

export default CheckoutPage;