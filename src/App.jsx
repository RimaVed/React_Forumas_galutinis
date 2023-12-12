import "./App.css";
import Header from "./components/UI/header/Header";
import Main from "./components/pages/main/Main";
import Questions from "./components/pages/questions/Questions";
import TheQuestion from "./components/UI/theQuestion/TheQuestion";
import Footer from "./components/UI/footer/Footer";
import SpecQuestion from "./components/pages/specQuestion/SpecQuestion";
import Answers from "./components/pages/answers/Answers";
import { Routes, Route } from "react-router-dom";
import AddNewQuestion from "./components/pages/addNewQuestion/AddNewQuestion";
import EditQuestion from "./components/pages/editQuestion/EditQuestion";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />

        <Route path="/questions/">
          <Route index element={<Questions />} />
          <Route path="thequestion/:id" element={<TheQuestion />} />
          <Route path=":id" element={<SpecQuestion />} />
          <Route path="addNewQuestion" element={<AddNewQuestion />} />
          <Route path="edit/:id" element={<EditQuestion />} />
        </Route>
        <Route path="/answers">
          <Route path="/answers/:id" element={<Answers />} />
        </Route>
        {/* <Route path="/users">
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route> */}
      </Routes>
      <Footer />
    </>
  );
}
export default App;
