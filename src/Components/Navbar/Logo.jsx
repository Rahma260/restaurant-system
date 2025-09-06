import logo from "../../../public/images/logo3.png"
function Logo() {
  return (
    <>
      <div className="flex-shrink-0">
        <img
          src={logo}
          alt="شعار المطعم"
          className="w-19 h-10 sm:w-24 sm:h-12 md:w-20 md:h-16 rounded-md drop-shadow-[0_4px_6px_rgba(127,29,29,0.8)]"
        />
      </div>
    </>
  )
}
export default Logo;
