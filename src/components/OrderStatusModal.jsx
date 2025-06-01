import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderStatusModal = ({ show, status, message, onClose }) => {
  // Modalın görünürlüğü show prop'una bağlı olacak
  if (!show) {
    return null;
  }

  const isSuccess = status === 'success';

  // Framer Motion varyantları
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: "-100vh", // Başlangıçta ekranın üstünden
      opacity: 0,
    },
    visible: {
      y: "0", // Ekranda ortalanmış
      opacity: 1,
      transition: { delay: 0.1, type: "spring", stiffness: 100 }, // Yay efektiyle gelme
    },
    exit: {
      y: "100vh", // Çıkarken ekranın altına doğru gitme
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-70 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Arka plana tıklayınca kapatma
        >
          <motion.div
            className={`relative max-w-lg w-full p-8 rounded-lg shadow-2xl flex flex-col items-center text-center
                        ${isSuccess ? 'bg-green-700' : 'bg-red-700'} // Duruma göre renk
                        `}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Modal içeriğine tıklayınca kapanmayı engelleme
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-300 z-10"
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {isSuccess ? (
              <>
                <motion.svg
                  className="w-24 h-24 text-white mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </motion.svg>
                <h2 className="text-3xl font-extrabold text-white mb-4">Siparişiniz Onaylandı!</h2>
                <p className="text-lg text-gray-100 mb-6">Teşekkür ederiz! Siparişiniz başarıyla alındı ve hazırlanıyor.</p>
              </>
            ) : (
              <>
                <motion.svg
                  className="w-24 h-24 text-white mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </motion.svg>
                <h2 className="text-3xl font-extrabold text-white mb-4">Sipariş Hatası!</h2>
                <p className="text-lg text-gray-100 mb-6">Üzgünüz, siparişiniz sırasında bir hata oluştu.</p>
              </>
            )}
            <p className="text-md text-gray-200">{message}</p>
            <button
              onClick={onClose}
              className={`mt-8 px-6 py-3 rounded-full text-white font-bold text-lg transition duration-300
                          ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
                          `}
            >
              Tamam
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderStatusModal;