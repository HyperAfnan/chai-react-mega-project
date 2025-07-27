import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

const Logout = () => {
   const dispatch = useDispatch();
   const logoutHandler = (e) => {
      e.preventDefault();
      authService.logout().then(() => {
         dispatch(logout());
         window.location.reload();
      });
   };
   return (
      <button
         onClick={logoutHandler}
         type="button"
         className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
         Logout
      </button>
   );
};

export default Logout;
