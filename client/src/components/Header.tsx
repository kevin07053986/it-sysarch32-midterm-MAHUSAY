import { Link } from "react-router-dom";
import { useAppContext } from "../provider";


const Header = () => {
  const { logout } = useAppContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="text-black/70 bg-gray-100 border-b border-slate-300 flex items-center justify-between py-2 px-14">
      <Link to="/" className="flex items-center gap-1">
       
        <h1 className="font-medium">Mahusay Online Store</h1>
      </Link>
      <div className="flex items-center gap-8">
      <Link to="/"> All Product</Link>
        <Link to="/add-Product"> Add Product</Link>
        <Link to="/delete-product"> Delete Product</Link>

      <button className="px-8 py-2" onClick={handleLogout}>
        Logout
      </button>
      </div>
     
    </header>
  );
};

export default Header;
