import { useState } from "react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import DesktopMenu from "./DesktopMenu";
import Actions from "./Actions";
import MobileButton from "./MobileButton";
import MobileMenu from "./MobileMenu";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className=" top-0 left-0 right-0 md:w-full backdrop-blur-md p-3 md:p-4 bg-stone-50 shadow-md z-50 fixed" >
        <div className="flex justify-between items-center mx-auto w-full px-3 md:px-6">
          <Logo />
          <SearchInput />
          <DesktopMenu />
          <Actions />
          <MobileButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {isOpen && <MobileMenu />}
      </header>
    </>
  );
}

export default Navbar;
