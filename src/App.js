import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "pages/LoginPage";
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
import UserManagePage from "pages/manage/UserManagePage";
import ProfilePage from "pages/ProfilePage";
import PostManagePage from "pages/manage/PostManagePage";
import Layout from "components/layout/Layout";
import PostDetailPage from "pages/PostDetailPage";

function App() {
  const { setCurrentUser } = useAuthStore((state) => state);
  useEffect(() => {
    onAuthStateChanged(auth, (user) =>
      user ? setCurrentUser(user) : setCurrentUser(null)
    );
  }, [setCurrentUser]);
  console.log(process.env);
  return (
    <div>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/post/:slug"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route
            path="/profile/:username"
            element={<ProfilePage></ProfilePage>}
          ></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
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
          <Route
            path="/manage/user"
            element={<UserManagePage></UserManagePage>}
          ></Route>
          <Route
            path="/manage/post"
            element={<PostManagePage></PostManagePage>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
