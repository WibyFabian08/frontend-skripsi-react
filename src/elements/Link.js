import { Link } from "react-router-dom";

const NavLink = ({ children, path, getNavLink }) => {
  return (
    <Link
      className={[
        "mx-4 font-semibold hover:underline hover:text-blue-300",
        getNavLink,
      ].join(" ")}
      to={path}
    >
      {children}
    </Link>
  );
};

export default NavLink;
