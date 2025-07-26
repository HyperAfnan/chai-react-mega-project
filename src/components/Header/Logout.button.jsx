import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

const Logout = () => {
   const dispatch = useDispatch();
   const logoutHandler = (e) => {
      e.preventDefault();
      authService.logout().then(() => {
         dispatch(logout());
      });
   };
   return (
      <div className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
         Logout
      </div>
   );
};

export default Logout;
