import React from 'react';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giriş yapılıyor...");
    onLoginSuccess("Ayşe Yılmaz");
    onClose();
  };

  return (
    // Modal Arka Planı (Overlay) - Güncellenen Kısım
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-60 backdrop-blur-sm">
      {/* Modal İçeriği */}
      <div className="relative max-w-screen-lg w-full bg-gray-50 dark:bg-gray-800 shadow-xl rounded-lg flex flex-col sm:flex-row overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-white transition-colors duration-300 z-10"
          aria-label="Close modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="w-full lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="mt-6 text-3xl xl:text-4xl font-extrabold text-gray-900 dark:text-white">Lezzetly</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Yemek dünyasına giriş yap!</p>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-full flex flex-col gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google icon"
                  className="w-5 h-5"
                />
                <span className="text-base font-medium">Google ile Giriş Yap</span>
              </button>
            </div>

            <div className="my-8 border-b border-gray-300 dark:border-gray-600 w-full text-center relative">
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-800 px-3 text-sm text-gray-500 dark:text-gray-400">VEYA</span>
            </div>

            <form className="w-full max-w-xs space-y-4" onSubmit={handleSubmit}>
              <input
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                type="email"
                placeholder="Mail"
                required
              />
              <input
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                type="password"
                placeholder="Şifre"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
              >
                Giriş Yap
              </button>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                <a href="#" className="underline hover:text-green-400 transition">Hizmet Şartları</a> ve <a href="#" className="underline hover:text-green-400 transition">Gizlilik Politikası</a>nı kabul ediyorum.
              </p>
            </form>
            <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                Hesabın yok mu? <a href="#" className="font-medium text-green-500 hover:underline">Kaydol</a>
            </p>
          </div>
        </div>

        {/* Resim Kısmı */}
        <div className="hidden lg:flex flex-1 bg-indigo-100 dark:bg-indigo-900 items-center justify-center p-6">
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            className="w-3/4 max-w-xs"
            alt="illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;