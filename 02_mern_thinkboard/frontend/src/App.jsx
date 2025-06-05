import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Createpage from "./pages/Createpage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("synthwave");
  return (
    <div className="relative h-full w-full" data-theme={theme}>
      <Navbar setTheme={setTheme} />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
