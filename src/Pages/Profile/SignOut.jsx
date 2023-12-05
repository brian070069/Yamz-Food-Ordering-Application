import { useCallback, useContext } from "react";
import { AuthenticationContext } from "../../context/authContext.";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ACTION } from "../Home/HomeReducer";
import { CartContext } from "../../context/CartContext";

const SignOut = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticationContext
  );
  const [, dispatch] = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    const logOut = async () => {
      if (isAuthenticated) {
        dispatch({ type: ACTION.CLEARCART });
        localStorage.clear();
        toast.success("You logged Out succesfully", {
          position: "top-center",
          theme: "dark",
        });

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 1000)
        );
        setIsAuthenticated(false);
        navigate("/", { replace: true });
      }
    };
    logOut();
  }, [isAuthenticated]);

  return (
    <div className="signOut row">
      <button type="button" onClick={handleLogOut}>
        sign out
      </button>
    </div>
  );
};

export default SignOut;
