import "./App.css";
import Header from "./components/UI/header/Header";
import Main from "./components/pages/main/Main";
import Questions from "./components/pages/questions/Questions";
import TheQuestion from "./components/UI/theQuestion/TheQuestion";
import Footer from "./components/UI/footer/Footer";
import SpecQuestion from "./components/pages/specQuestion/SpecQuestion";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />

        <Route path="/questions">
          <Route index element={<Questions />} />
          <Route path="thequestion/:id" element={<TheQuestion />} />
          <Route path=":id" element={<SpecQuestion />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
