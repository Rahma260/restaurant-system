import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Phone, MapPin, Mail } from "lucide-react";

function About() {
  return (
    <>
      <Navbar />

      <div className="mt-28 px-6 py-12 max-w-6xl mx-auto space-y-12 min-h-screen">
        <div className="text-gray-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-red-950 mb-4">قصتنا</h2>
            <p>
              مطعم <span className="font-semibold text-red-950">حجوجة</span> – اسم يحاكي دفء جدّتنا. بدأنا
              رحلتنا كملاذ للوجبات المصرية التقليدية في منطقة شيراتون المطار، حيث خدمتنا
              أشهى الأطباق المنزلية كالمشوي والطواجن وشوربة العدس، بكل حب وراحة وكأنك في بيتك.
            </p>
            <p className="mt-4">
              بمرور الوقت، اكتسب "حجوجة" شهرة بين السكان المحليين والزوار على حد سواء على
              إثر جودة الطعام وأجوائه العائلية الدافئة. نحرص على الوصفات الأصلية والمكونات
              الطازجة – لأن طعامنا يأخذك مباشرًا إلى قلب الريف المصري.
            </p>
          </div>

          <div className="w-full mt-8 h-64 rounded-lg overflow-hidden shadow-lg">
            <video
              src="../public/video/about.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />

          </div>
        </div>

        <div className="text-gray-700 space-y-4">
          <h2 className="text-3xl font-bold text-red-950 mb-4">فروعنا</h2>
          <p className="flex items-center gap-2">
            <MapPin className="text-red-950" size={20} /> الفرع الرئيسي في:
            <strong> Rocket Garden، شارع الصاعقة – طريق السويس، القاهرة</strong>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="text-red-950" size={20} /> هاتف الحجز:
            <strong dir="ltr">+20 12 80055200</strong>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="text-red-950" size={20} /> لمتابعة العروض والحجز:
            <strong><a href="https://www.facebook.com/share/19XUQtZ3zh/">زوروا صفحتنا على فيسبوك</a> </strong>
          </p>
          <p>
            المطعم مفتوح يوميًا من الساعة <strong>3:00 مساءً</strong> وحتى <strong>1:00 صباحًا</strong>.
          </p>
        </div>

        <div className="text-gray-700 space-y-4">
          <h2 className="text-3xl font-bold text-red-950 mb-4">لماذا حجوجة؟</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              نقدم أطباقًا مستوحاة من وصفات الجدّات المصرية – لحمة مطبوخة ببطء، خضراوات طازجة، وشوربات غنية.
            </li>
            <li>
              الأطباق تأتي في حصص كبيرة تناسب العائلة والمجموعات، وتتميز بطعم غني ومشبع.
            </li>
            <li>
              أجواء دافئة وودّية، والطاقم يعاملك كما لو كنت من العائلة – رغم الانشغال الشديد في أوقات الذروة.
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
