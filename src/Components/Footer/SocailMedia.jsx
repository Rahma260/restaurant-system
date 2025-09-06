import { Instagram, FacebookIcon, MessageCircle } from "lucide-react";
function SocialMedia() {
  return (
    <>
      <div className="flex mt-4 sm:justify-center sm:mt-0 cursor-pointer">
        <a href="https://www.facebook.com/share/19XUQtZ3zh/">
          <FacebookIcon className="hover:fill-red-950" />
        </a>
        <a href="https://www.instagram.com/7agogah?igsh=MW93emlibHp6eXpsMg==">
          <Instagram className="hover:fill-red-950" />
        </a>

      </div>
    </>
  )
}
export default SocialMedia