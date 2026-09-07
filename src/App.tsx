import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Essays } from "./pages/Essays";
import { EssayDetail } from "./pages/EssayDetail";
import { Notes } from "./pages/Notes";
import { Research } from "./pages/Research";
import { Community } from "./pages/Community";
import { Login } from "./pages/Login";
import { Brand } from "./pages/Brand";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/essays" element={<Essays />} />
      <Route path="/essays/:slug" element={<EssayDetail />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/research" element={<Research />} />
      <Route path="/community" element={<Community />} />
      <Route path="/login" element={<Login />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
