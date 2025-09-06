// Services.jsx
import { motion } from "framer-motion";
import { UtensilsCrossed, Truck, Star, Smartphone } from "lucide-react";

function Services() {
  const services = [
    {
      icon: <UtensilsCrossed className="w-12 h-12 text-red-900" />,
      title: "مأكولات أصيلة",
      description: "استمتع بنكهات المطبخ الشرقي المحضرة بكل حب وتقاليد عريقة.",
    },
    {
      icon: <Truck className="w-12 h-12 text-red-900" />,
      title: "توصيل سريع",
      description: "نوصلك وجباتك المفضلة طازجة وساخنة حتى باب منزلك.",
    },
    {
      icon: <Star className="w-12 h-12 text-red-900" />,
      title: "جودة مميزة",
      description: "نستخدم أفضل المكونات لنضمن لك مذاقاً لا يُنسى في كل طبق.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-red-900" />,
      title: "طلب سهل",
      description: "اطلب في أي وقت عبر نظامنا البسيط وسهل الاستخدام.",
    },
  ];

  return (
    <section className="py-16 bg-stone-50 w-screen" id="services"
      dir="rtl">
      <div className="max-w-7xl mx-auto text-center px-6">
        <motion.h2
          className="text-4xl font-bold text-red-950 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          خدماتنا
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-red-950 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
