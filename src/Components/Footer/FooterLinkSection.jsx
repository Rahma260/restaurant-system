import { Link } from "react-router-dom";

function FooterLinkSection({ title, links }) {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-red-950 uppercase">
        {title}
      </h2>
      <ul className="text-gray-500 font-medium">
        {links.map((link) => (
          <li key={link.label} className="mb-4 last:mb-0">
            <Link
              to={link.link}
              className="hover:underline transition duration-300 hover:text-red-900"
            >
              {link.label}
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default FooterLinkSection;
