import { BrowserRouter, Route, Routes } from "react-router-dom";
import CertificateIndex from "./components";
import CreateCertificate from "./components/template";
import VisitingCard from "./components/visitingcard";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<CertificateIndex />} />
        <Route path="/generate" element={<CreateCertificate />} />
        <Route path="/visitingcard" element={<VisitingCard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
