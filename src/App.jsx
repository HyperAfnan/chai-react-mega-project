import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
   const [loading, setloading] = useState(true);
   const dispatch = useDispatch();

   useEffect(() => {
      authService
         .getUserInfo()
         .then((userData) => {
            if (userData) dispatch(login({userData}));
            else dispatch(logout());
         })
         .finally(() => setloading(false));
   }, []);
   return !loading ? (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
         <div className="w-full block">
            <Header />
             <Outlet />              
            <Footer />
         </div>
      </div>
   ) : (
      <div className="">Hello world</div>
   );
}

export default App;
