import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Essays } from "./pages/Essays";
import { EssayDetail } from "./pages/EssayDetail";
import { Notes } from "./pages/Notes";
import { Research } from "./pages/Research";
import { ResearchDetail } from "./pages/ResearchDetail";
import { Community } from "./pages/Community";
import { Thread } from "./pages/Thread";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/essays" element={<Essays />} />
      <Route path="/essays/:slug" element={<EssayDetail />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/research" element={<Research />} />
      <Route path="/research/:slug" element={<ResearchDetail />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/:id" element={<Thread />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
