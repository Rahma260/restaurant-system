
import Navbar from "../Components/Navbar/Navbar";// Import images directly
import restaurant1 from "../../public/images/restaurant1.jpg";
import restaurant2 from "../../public/images/restaurant2.jpg";
import restaurant3 from "../../public/images/restaurant3.jpg";
import restaurant4 from "../../public/images/restaurant4.jpg";
import Footer from "../Components/Footer/Footer";
import ResCareousol from "../Components/Home/ResCareousol";
import "../index.css";
import Services from "../Components/Home/Services";
import Categories from "../Components/Home/Ctegories";
import BestSellers from "../Components/Home/bestsellers";
import About from "../Components/Home/about";
const images = [restaurant1, restaurant2, restaurant3, restaurant4];

function Home() {
  return (
    <>
      <Navbar />
      <ResCareousol />
      <Services />
      <Categories />
      <BestSellers />
      <About />
      <Footer />
    </>
  );
}
export default Home;