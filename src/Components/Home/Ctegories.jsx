import { motion } from "framer-motion";
import { Utensils, Drumstick, Soup, CookingPot, Salad, CupSoda, Beef } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Items from "../../Data/Items.json";

export default function Categories() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    Items.categories[categoryId]?.name || Items.categories[1].name
  );

  useEffect(() => {
    if (Items.categories[categoryId]) {
      setSelectedCategory(Items.categories[categoryId].name);
    }
  }, [categoryId]);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <section
      className="relative py-16 bg-gradient-to-br from-amber-50 to-orange-100 w-screen overflow-hidden"
      id="categories"
      dir="rtl"
    >
      <div className="absolute inset-0 bg-[url('/images/categoryBG.jpg')] bg-contain bg-center opacity-50"></div>
      <div className="absolute inset-0 bg-white/40"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-red-950 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          الفئات المتاحة
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {Items.categories.map((category, index) => (
            <motion.div
              key={category.id}
              onClick={() => handleClick(category.id)}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{
                scale: 1.15,
                rotate: 6,
                boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 flex flex-col items-center justify-center rounded-full 
                     shadow-lg bg-gradient-to-tr from-red-800 to-red-950 
                     cursor-pointer transition duration-300 hover:shadow-2xl"
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {index === 0 && <Utensils size={32} color="white" />}
                {index === 1 && <Drumstick size={32} color="white" />}
                {index === 2 && <Soup size={32} color="white" />}
                {index === 3 && <CookingPot size={32} color="white" />}
                {index === 4 && <Salad size={32} color="white" />}
                {index === 5 && <CupSoda size={32} color="white" />}
                {index === 6 && <Beef size={32} color="white" />}
              </motion.div>
              <p className="mt-3 text-md font-semibold text-white">{category.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
