import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ClientProjects from "./pages/ClientProjects.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="client-projects" element={<ClientProjects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
