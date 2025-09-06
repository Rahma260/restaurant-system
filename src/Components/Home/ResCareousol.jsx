import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import restaurant1 from "../../../public/images/restaurant1.jpg";
import restaurant2 from "../../../public/images/restaurant2.jpg";
import restaurant3 from "../../../public/images/restaurant3.jpg";
import restaurant4 from "../../../public/images/restaurant4.jpg";
import "../../index.css";
import { Link } from "react-router-dom";

const images = [restaurant1, restaurant2, restaurant3, restaurant4];

export default function ResCareousol() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className=" relative mt-10 w-screen h-[90vh] bg-stone-500 overflow-hidden rounded-none shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt="مطعم حجوجة"
            className="w-full h-full object-cover bg-gray-800"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-center w-2/3 text-white p-6 rounded-2xl bg-black/50 shadow-lg max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              أهلاً بكم في مطعم حجوجة
            </h1>
            <p className="text-lg md:text-xl mb-6 leading-relaxed">
              استمتعوا بالمذاق الأصيل <span className="text-red-300 text-bold">للمأكولات الشرقية</span> —
              أطباق تُحضّر بشغف وتوابل وحب. من الكباب المشوي
              إلى الأرز العطري، نأتي إليكم بالتقاليد على طبقكم.
            </p>
            <div className="space-x-4 space-x-reverse">
              <button className="bg-red-900 hover:bg-red-200 hover:text-black text-white font-semibold py-2 px-6 rounded-lg transition">
                <Link to="/products">
                  عرض القائمة
                </Link>
              </button>
              <button className="bg-transparent border-2 border-red-200 hover:bg-red-200 hover:text-black text-white font-semibold py-2 px-6 rounded-lg transition">
                <Link to="/about">
                  من نحن
                </Link>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
        >
          <FaArrowRight />
        </button>

        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-4 h-4 rounded-full ${i === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
