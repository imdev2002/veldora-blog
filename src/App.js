import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import { AuthProvider } from "contexts/auth-context";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import LayoutDashboard from "layout/LayoutDashboard";
import AddNewPostPage from "pages/manage/AddNewPostPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route element={<LayoutDashboard></LayoutDashboard>}>
            <Route
              path="/manage/add-post"
              element={<AddNewPostPage></AddNewPostPage>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;