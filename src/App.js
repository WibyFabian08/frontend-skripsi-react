import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import store from "./redux/store";
import { Provider } from "react-redux";

import {
  AdminHome,
  MandorHome,
  NotFound,
  Login,
  Logout,
  Unauthorize,
  LandingPage,
  Register,
  Profile,
  ListKontraktor,
  Detail,
  ListImages,
  ListKriteria,
  ListProjekBaru,
  CreateProjekBaru,
  LowonganProjek,
  DetailLowongan,
  Test,
  ListCalonKontraktor,
  ListTender,
  RiwayatTender,
  ListHasilPemilihan
} from "./pages";

import {
  AdminRoute,
  KontraktorRoute,
  PublicRoute,
} from "./components/routes";

import { BsFillArrowUpSquareFill } from "react-icons/bs";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);

    return () => (window.onscroll = null);
  };
  return (
    <div className="relative">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminHome />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/kontraktor"
              element={
                <AdminRoute>
                  <ListKontraktor />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/images"
              element={
                <AdminRoute>
                  <ListImages />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/kriteria"
              element={
                <AdminRoute>
                  <ListKriteria />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/projek-baru"
              element={
                <AdminRoute>
                  <ListProjekBaru />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/calon-kontraktor/:id"
              element={
                <AdminRoute>
                  <ListCalonKontraktor />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/hasil-pemilihan/:id"
              element={
                <AdminRoute>
                  <ListHasilPemilihan />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/create-projek"
              element={
                <AdminRoute>
                  <CreateProjekBaru />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/update/projek/:id"
              element={
                <AdminRoute>
                  <CreateProjekBaru />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/riwayat-tender"
              element={
                <AdminRoute>
                  <RiwayatTender />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/kontraktor"
              element={
                <KontraktorRoute>
                  <MandorHome />
                </KontraktorRoute>
              }
            ></Route>
            <Route
              path="/kontraktor/lowongan-projek"
              element={
                <KontraktorRoute>
                  <LowonganProjek />
                </KontraktorRoute>
              }
            ></Route>
            <Route
              path="/kontraktor/lowongan-projek/detail/:id"
              element={
                <KontraktorRoute>
                  <DetailLowongan />
                </KontraktorRoute>
              }
            ></Route>
            <Route
              path="/kontraktor/tender-list"
              element={
                <KontraktorRoute>
                  <ListTender />
                </KontraktorRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <PublicRoute>
                  <Profile />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/detail/:id"
              element={
                <PublicRoute>
                  <Detail />
                </PublicRoute>
              }
            ></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/unauthorize" element={<Unauthorize />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <div
        className={[
          "fixed bottom-10 right-10 transition-all duration-300 z-50",
          isScrolled ? " opacity-100" : " opacity-0",
        ].join(" ")}
      >
        <BsFillArrowUpSquareFill
          onClick={() => handleClick()}
          size="30px"
          color="#23A6F0"
          style={{ cursor: "pointer" }}
        ></BsFillArrowUpSquareFill>
      </div>
    </div>
  );
}

export default App;
