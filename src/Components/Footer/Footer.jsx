import CopyRight from "./CopyRight";
import FooterLinks from "./FooterLinks";
import SocialMedia from "./SocailMedia";
import Logo from "../Navbar/Logo";

function Footer() {
  return (
    <div className=" bottom-0 left-0  w-screen backdrop-blur-md p-3 md:p-4 bg-stone-50"
      dir="rtl">
      <div className="w-full p-4 lg:py-8">
        <div className="md:flex md:justify-between">
          <FooterLinks />
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <SocialMedia />
          <CopyRight />
        </div>
      </div>
    </div>
  );
}

export default Footer;
