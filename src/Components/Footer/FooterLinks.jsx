import FooterLinkSection from "./FooterLinkSection";

function FooterLinks() {

  return (
    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
      <FooterLinkSection
        title="القائمة"
        links={[
          { link: "/products/1", label: " التصنيفات" },
        ]}
      />
      <FooterLinkSection
        title="من نحن"
        links={[
          { link: "/about", label: "قصتنا" },
        ]}
      />
      <FooterLinkSection
        title="تواصل معنا"
        links={[
          { link: "/contact", label: "تواصل" },
          {
            link: "", label: "+20 12 80055200"
          }
        ]}
      />
    </div>
  );
}

export default FooterLinks;
