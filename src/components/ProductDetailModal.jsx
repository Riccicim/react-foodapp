import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailModal = ({ show, product, onClose, onAddToCart }) => {
  if (!show || !product) {
    return null;
  }

  // Framer Motion varyantları
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: { delay: 0.1, type: "spring", stiffness: 100 },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                      bg-opacity-60
                     backdrop-blur-sm
                    "
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Arka plana tıklayınca kapatma
        >
          <motion.div
            className="relative max-w-2xl w-full bg-gray-800 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden text-white"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Modal içeriğine tıklayınca kapanmayı engelleme
          >
            {/* Kapatma Butonu */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 z-10"
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Ürün Resmi */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900 p-4">
              <img
                src={product.image || "https://via.placeholder.com/400x300/333333/FFFFFF?text=Ürün+Resmi"}
                alt={product.name}
                className="w-full h-full object-contain rounded-md"
              />
            </div>

            {/* Ürün Detayları */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3 text-green-400">{product.name}</h2>
                <p className="text-gray-300 text-lg mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-400">{product.price} TL</span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through ml-2">{product.oldPrice} TL</span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 mt-4 text-gray-200">Ek Bilgiler:</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  <li>Porsiyon: {product.portion}</li>
                  <li>Kalori: {product.calories} kcal</li>
                  <li>Alerjenler: {product.allergens}</li>
                  {/* Diğer özellikler buraya eklenebilir */}
                </ul>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product); // Ürünü sepete ekle
                  onClose(); // Modalı kapat
                }}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg transition duration-300"
              >
                Sepete Ekle
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;