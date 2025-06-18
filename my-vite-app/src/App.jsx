import React from "react";
import "./App.css";
import Photo from "./components/gallary/Photo";
import Sidebar1 from "./components/Sidebar/Sidebar1";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Sidebar2 from "./components/Sidebar/Sidebar2";
import Nav from "./components/router/Nav";
import BlogPage from "./components/router/BlogPage";
import ProfilePage from "./components/router/ProfilePage";
import BlogPageDetails from "./components/router/BlogPageDetails";

import Dashboard from "./pages/Dashboard/Dashboard";
import Evista from "./pages/Evista/Evista";
import Harvest from "./pages/Harvest/Harvest";
import Transfer from "./pages/Transfer/Transfer";
import ShrimpManagement from "./pages/ShrimpManagement/ShrimpManagement";
import Info from "./pages/Info/Info";
import Access from "./pages/Access/Access";
import Alarm from "./pages/Alarm/Alarm";
import Farm from "./pages/Farm/Farm";
import Food from "./pages/Food/Food";
import MachinesManager from "./pages/MachinesManager/MachinesManager";
import Account from "./pages/Account/Account";
import { AuthProvider } from "./components/context/AuthContext";
import { GallaryProvider } from "./components/context/GallaryContext";

// App tổng
function App() {
  const routes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/evista", component: Evista },
    { path: "/harvest", component: Harvest },
    { path: "/food", component: Food },
    { path: "/transfer", component: Transfer },
    { path: "/machinesmanager", component: MachinesManager },
    { path: "/shrimpmanagement", component: ShrimpManagement },
    { path: "/info", component: Info },
    { path: "/access", component: Access },
    { path: "/alarm", component: Alarm },
    { path: "/farm", component: Farm },
    { path: "/account", component: Account },
  ];

  return (
    <div>
      {/* <AuthProvider>
        <GallaryProvider>
          <HeaderLoad></HeaderLoad>
          <Photo></Photo>
        </GallaryProvider>
      </AuthProvider> 
      <Dashboard></Dashboard>*/}

      {/* <Routes>
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
      </Routes> */}
      {/* <Sidebar></Sidebar>
      <Button></Button> */}
      <AuthProvider>
        <GallaryProvider>
          <Routes>
            <Route path="/" element={<Sidebar1></Sidebar1>}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route path="*" element={<>This is 404 page</>}></Route>{" "}
            </Route>
          </Routes>
        </GallaryProvider>
      </AuthProvider>

      {/* <Routes>
        <Route path="/" element={<Sidebar1 />}>
          <Route index element={<Dashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="evista" element={<Evista />} />
          <Route path="food" element={<Food />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="machinesmanager" element={<MachinesManager />} />
          <Route path="shrimpmanagement" element={<ShrimpManagement />} />
          <Route path="info" element={<Info />} />
          <Route path="harvest" element={<Harvest />} />
          <Route path="access" element={<Access />} />
          <Route path="alarm" element={<Alarm />} />
          <Route path="farm" element={<Farm />} />
        </Route>
        <Route path="*" element={<div>This is 404 page</div>} />
      </Routes> */}
    </div>
  );
}

export default App;
