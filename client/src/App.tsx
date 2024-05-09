import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductView from "./pages/ProductView";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { useAppContext } from "./provider";
import AuthWrapper from "./_wrappers/LoginSignupWrapper";
import Protected from "./_wrappers/Protected";

const App = () => {
  const {
    state: { token },
  } = useAppContext();
  return (
    <Routes>
      {token ? (
        <Route path="/" element={<Protected />}>
          <Route index element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductView />} />
          <Route path="/delete-product" element={<Profile />} />
        </Route>
      ) : (
        <Route path="/" element={<AuthWrapper />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      )}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default App;
