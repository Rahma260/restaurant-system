import { motion } from "framer-motion";
import aboutImage from "../../../public/images/logo2.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="py-20 bg-stone-100 w-screen" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:gap-12">
        <motion.div
          className="lg:w-1/2 overflow-hidden mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutImage}
            alt="من نحن"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="lg:w-1/2 text-right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-red-950 mb-6">من نحن</h2>
          <p className="text-lg text-gray-700 mb-4">
            مرحباً بكم في مطبخنا! نقدم أشهى المأكولات الشرقية الأصيلة المحضرة
            بأفضل المكونات وبأسلوب تقليدي يعكس التراث العريق.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            هدفنا تقديم تجربة طعام مميزة لكل زبون، مع توصيل سريع وخدمة ممتازة.
            نحن نحرص على الجودة والنظافة والالتزام بالمواعيد.
          </p>
          <button className="px-6 py-3 bg-red-950 text-white font-semibold rounded-md hover:bg-white border-2 hover:text-red-950 hover:border-red-950 transition">
            <Link to="about">
              اكتشف المزيد
            </Link>
          </button>
        </motion.div>

      </div>
      <motion.div
        className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <div>
          <h3 className="text-3xl font-bold text-red-950">2+</h3>
          <p className="text-gray-700">سنوات خبرة</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-red-950">200+</h3>
          <p className="text-gray-700">طبق مميز</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-red-950">1000+</h3>
          <p className="text-gray-700">زبائن سعداء</p>
        </div>
      </motion.div>
    </section>
  );
}
