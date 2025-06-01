import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import ProductDetailModal from '../components/ProductDetailModal'; // Yeni modalı import ediyoruz
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Kullanıcı Adı");
  const [cartItemCount, setCartItemCount] = useState(3);

  // Modalın açık/kapalı durumunu yöneten state
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Sepet açılır menüsünün açık/kapalı durumunu yöneten state
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  // Ürün detay modalının açık/kapalı durumunu yöneten state
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  // Detayları gösterilecek ürünü tutan state
  const [selectedProduct, setSelectedProduct] = useState(null);


  const navigate = useNavigate();

  // Giriş yapma fonksiyonu (modalı açar)
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  // Modalı kapatma fonksiyonu
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  // Başarılı giriş sonrası çağrılacak fonksiyon
  const handleLoginSuccess = (loggedInUserName) => {
    setIsLoggedIn(true);
    setUserName(loggedInUserName);
  };

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setCartItemCount(0);
  };

  // Sepet açılır menüsünü açma/kapama fonksiyonu
  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  // Satın alma sayfasına yönlendirme
  const handleGoToCheckout = () => {
    setShowCartDropdown(false);
    navigate('/checkout');
  };

  // Ürün Detay Modalını açma
  const handleOpenProductDetailModal = (product) => {
    setSelectedProduct(product);
    setShowProductDetailModal(true);
  };

  // Ürün Detay Modalını kapatma
  const handleCloseProductDetailModal = () => {
    setShowProductDetailModal(false);
    setSelectedProduct(null);
  };

  // Ürünü sepete ekleme fonksiyonu (örnek)
  const handleAddToCart = (productToAdd) => {
    console.log(`${productToAdd.name} sepete eklendi!`);
    setCartItemCount(prevCount => prevCount + 1); // Sepet sayısını artır
    // Burada gerçek sepete ekleme mantığı (state güncelleme, API çağrısı) olur
  };

  // Sepet öğeleri için örnek veri (dropdown için)
  const cartItems = [
    { id: 1, name: "Hamburger Deluxe", price: 120, quantity: 1 },
    { id: 2, name: "Patates Kızartması", price: 35, quantity: 1 },
    { id: 3, name: "Kola", price: 20, quantity: 2 },
  ];

  const totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Öne çıkan yemekler için örnek veri (ProductDetailModal için kullanılacak)
  const featuredDishes = [
    {
      id: 1,
      name: "Hamburger Deluxe",
      description: "Özel soslu, çift köfteli, bol malzemeli efsanevi hamburger. Patates kızartması ve içecekle servis edilir.",
      price: 120,
      oldPrice: 150, // İsteğe bağlı
      image: "https://via.placeholder.com/400x300/333333/FFFFFF?text=Hamburger+Deluxe",
      portion: "Büyük",
      calories: 850,
      allergens: "Gluten, Süt Ürünü, Yumurta",
    },
    {
      id: 2,
      name: "Spagetti Bolonez",
      description: "Ev yapımı dana kıymalı bolonez sosu ile hazırlanmış lezzetli spagetti. Yanında rende parmesan peyniri ile.",
      price: 95,
      image: "https://via.placeholder.com/400x300/333333/FFFFFF?text=Spagetti+Bolonez",
      portion: "Orta",
      calories: 620,
      allergens: "Gluten, Süt Ürünü",
    },
    {
      id: 3,
      name: "Tavuk Sezar Salata",
      description: "Izgara marine edilmiş tavuk dilimleri, taze marul, kruton ve özel sezar sos ile hazırlanmış hafif ve doyurucu salata.",
      price: 70,
      image: "https://via.placeholder.com/400x300/333333/FFFFFF?text=Tavuk+Sezar+Salata",
      portion: "Büyük",
      calories: 450,
      allergens: "Gluten, Yumurta, Balık",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Sol Kısım: Logo ve Konum/Arama */}
          <div className="flex items-center space-x-6 w-full md:w-auto">
            <h1 className="text-3xl font-extrabold text-green-400">FoodApp</h1>
            
            {/* Konum Seçici */}
            <div className="relative">
              <button className="bg-gray-700 text-gray-300 py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-gray-600 transition duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Konum Seç</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>

            {/* Arama Çubuğu */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Restoran veya yemek ara..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          {/* Sağ Kısım: Kullanıcı Aksiyonları */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Sepet Simgesi ve Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleCartDropdown} // Sepet açılır menüsünü açma/kapama
                    className="relative p-2 rounded-full hover:bg-gray-700 transition duration-300"
                  >
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    {cartItemCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1">
                        {cartItemCount}
                      </span>
                    )}
                  </button>

                  {/* Sepet Dropdown Menüsü */}
                  {showCartDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-gray-700 rounded-md shadow-lg py-2 z-20">
                      <h4 className="px-4 pb-2 text-lg font-bold border-b border-gray-600 text-white">Sepetim</h4>
                      {cartItems.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-600">
                              <span className="text-gray-300">{item.name} x {item.quantity}</span>
                              <span className="text-green-400 font-medium">{item.price * item.quantity} TL</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="px-4 py-2 text-gray-400 text-center">Sepetiniz boş.</p>
                      )}
                      
                      {cartItems.length > 0 && (
                        <div className="border-t border-gray-600 px-4 py-2 flex justify-between items-center">
                          <span className="text-white font-bold">Toplam:</span>
                          <span className="text-green-400 font-bold text-xl">{totalCartPrice} TL</span>
                        </div>
                      )}
                      <div className="px-4 pt-2">
                        <button
                          onClick={handleGoToCheckout}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition duration-300"
                        >
                          Sepete Git / Siparişi Tamamla
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Kullanıcı Profili */}
                <div className="relative group">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2">
                    <img src="https://via.placeholder.com/30/FFFFFF/000000?text=A" alt="Avatar" className="rounded-full w-6 h-6 object-cover" />
                    <span>{userName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2024/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {/* Dropdown Menü (Gizli, hover'da açılır) */}
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 invisible z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Profilim</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Siparişlerim</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600" onClick={handleLogout}>Çıkış Yap</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleOpenLoginModal}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Giriş Yap
                </button>
                <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-full transition duration-300">
                  Kaydol
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold mb-4">En Lezzetli Yemekler Kapınızda!</h2>
          <p className="text-xl text-gray-300 mb-8">Geniş menümüzden dilediğinizi seçin ve hemen sipariş verin.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
            Menüyü Keşfet
          </button>
        </div>
      </header>

      {/* Featured Dishes Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Öne Çıkan Lezzetler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Food Card'ları dinamik olarak render edin */}
            {featuredDishes.map(dish => (
              <div
                key={dish.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => handleOpenProductDetailModal(dish)} // Tıklayınca modalı aç
              >
                <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h4 className="text-2xl font-bold mb-2">{dish.name}</h4>
                  <p className="text-gray-400 mb-4 truncate">{dish.description}</p> {/* Açıklamayı kısalt */}
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-bold text-xl">{dish.price} TL</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Butona tıklanınca kartın onClick'ini engelle
                        handleAddToCart(dish);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center text-gray-400">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} FoodApp. Tüm hakları saklıdır.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Product Detail Modal */}
      {showProductDetailModal && (
        <ProductDetailModal
          show={showProductDetailModal}
          product={selectedProduct}
          onClose={handleCloseProductDetailModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Home;