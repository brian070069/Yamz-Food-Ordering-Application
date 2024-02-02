import { useCallback, useContext } from "react";
import { AuthenticationContext } from "../../context/authContext.";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../Home/HomeReducer";
import { CartContext } from "../../context/CartContext";
import { Toast } from "../../services/ToasterProvider";

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
        Toast.success("You logged Out succesfully");
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
