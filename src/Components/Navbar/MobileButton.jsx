function MobileButton({ isOpen, setIsOpen }) {

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden ml-2 sm:ml-3 transition duration-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}
export default MobileButton;
