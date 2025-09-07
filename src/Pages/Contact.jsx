import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Phone, MapPin, Mail } from "lucide-react";

function Contact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
      <Navbar />

      <div className="mt-28 px-6 py-12 max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-950">
          تواصل معنا
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">معلومات التواصل</h3>
            <p className="flex items-center text-gray-600 gap-2">
              <MapPin className="text-red-950" size={20} /> العنوان: القاهرة - مصر
            </p>
            <p className="flex items-center text-gray-600 gap-2">
              <Phone className="text-red-950" size={20} /> الهاتف: +20 111 222 3333
            </p>
            <p className="flex items-center text-gray-600 gap-2">
              <Mail className="text-red-950" size={20} /> البريد الإلكتروني: info@example.com
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-8">خريطة الموقع</h3>
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.4663752878287!2d31.381346900000004!3d30.0808269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145817f6441278d1%3A0xfd3b9facdd09dce9!2z2K3YrNmI2KzYqQ!5e0!3m2!1sen!2seg!4v1757090311485!5m2!1sen!2seg" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" >
              </iframe>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">أرسل رسالة</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">الاسم</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-950"
                  placeholder="اكتب اسمك"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-950"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">الرسالة</label>
                <textarea
                  name="message"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-1 focus:ring-red-950"
                  placeholder="اكتب رسالتك هنا..."
                  required
                ></textarea>
              </div>
              {success && (
                <p className="mb-4 text-green-600 font-medium text-مل">
                  تم إرسال رسالتك بنجاح!
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-red-950 text-white py-2 rounded-lg shadow-md hover:bg-white hover:text-red-950 border-2 border-red-950 transition duration-300"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      </div >

      <Footer />
    </>
  );
}

export default Contact;
