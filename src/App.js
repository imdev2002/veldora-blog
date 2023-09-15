import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import { AuthProvider } from "contexts/auth-context";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import LayoutDashboard from "layout/LayoutDashboard";
import AddNewPostPage from "pages/manage/AddNewPostPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { useAuthStore } from "store";
import AddNewCategoryPage from "pages/manage/AddNewCategoryPage";
import CategoryManagePage from "pages/manage/CategoryManagePage";
import EditCategoryPage from "pages/manage/EditCategoryPage";

function App() {
  const { setCurrentUser } = useAuthStore((state) => state);
  useEffect(() => {
    onAuthStateChanged(auth, (user) =>
      user ? setCurrentUser(user) : setCurrentUser(null)
    );
  }, [setCurrentUser]);
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
            <Route
              path="/manage/add-category"
              element={<AddNewCategoryPage></AddNewCategoryPage>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManagePage></CategoryManagePage>}
            ></Route>
            <Route
              path="/manage/edit-category"
              element={<EditCategoryPage></EditCategoryPage>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
