import React, { Fragment } from "react";
import "./App.css";
import Sidebar1 from "./components/Sidebar/Sidebar1";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import { GallaryProvider } from "./components/context/GallaryContext";
import Card from "./pages/Notfound/Card";
import routes from "./routes";
import { Account } from "./pages";

// App tổng
function App() {
  return (
    <div>
      <AuthProvider>
        <GallaryProvider>
          <Routes>
            <Route path="/" element={<Account></Account>}></Route>
            {routes.map((route) => {
              const Component = route.component;
              return (
                <Fragment key={route.path}>
                  <Route path={route.path} element={<Component />} />
                </Fragment>
              );
            })}
            <Route path="*" element={<Card></Card>}></Route>{" "}
          </Routes>
        </GallaryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

/* <Routes>
  {routes.map((route) => {
    const Component = route.component;

    return (
      <Fragment key={route.path}>
        <Route path={route.path} element={<Component />} />
      </Fragment>
    );
  })}
</Routes>; */
