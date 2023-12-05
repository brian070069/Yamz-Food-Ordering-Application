import { createContext, useState } from "react";
import { useHandleProfile } from "../hooks/useHandleProfile";
import jwtDecode from "jwt-decode";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    image,
    isImageUploaded,
    setImage,
    userInfo,
    extraUserInfo,
    profilePicStatus,
    profileImageToTrue,
  } = useHandleProfile(isAuthenticated);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        //profile
        image,
        isImageUploaded,
        profileImageToTrue,
        setImage,
        userInfo,
        extraUserInfo,
        profilePicStatus,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
