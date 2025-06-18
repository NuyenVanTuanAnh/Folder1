import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const listLinks = [
  { to: "/", label: "Home", id: 1 },
  { to: "/blog", label: "Blog", id: 2 },
  { to: "/profile", label: "Profile", id: 3 },
  { to: "/contact", label: "Contact Us", id: 4 },
];

const Nav = () => {
  return (
    <>
      <div
        className="p-5 bg-white shadow-md 
    flex justify-center items-center gap-x-5 
    font-semibold text-gray-700 text-bold"
      >
        {listLinks.map((props) => (
          <NavLink
            key={props.id}
            to={props.to}
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
          >
            {props.label}
          </NavLink>
        ))}
      </div>
      <Outlet></Outlet>
    </>
  );
};

{
  /* <Routes>
        <Route path="/" element={<Nav></Nav>}>
          {" "}
          <Route path="/" element={<>Home Page</>} />
          <Route path="/blog" element={<BlogPage></BlogPage>} />
          <Route
            path="/blog/:slug"
            element={<BlogPageDetails></BlogPageDetails>}
          />
          <Route path="/profile" element={<ProfilePage></ProfilePage>} />
          <Route path="/contact" element={<>Contact Us</>} />
        </Route>
        <Route path="*" element={<>This is 404 page</>}></Route>{" "}
      </Routes> */
}
{
  /* <Sidebar></Sidebar>
      <Button></Button> */
}

export default Nav;
