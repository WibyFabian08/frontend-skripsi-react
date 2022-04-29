import { Link } from "react-router-dom";

const FooterLink = ({ children, path }) => {
  return (
    <Link
      className="font-semibold text-white hover:underline hover:text-blue-300"
      to={path}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
