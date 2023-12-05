import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getToken } from "../libs/getToken";
import { profileApi } from "../services/BaseUrls";
import { useCallback, useEffect, useState } from "react";

export const useHandleProfile = (rerender) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [image, setImage] = useState("");
  const [userInfo, setUserInfo] = useState({
    phone_number: "",
    first_name: "",
    email: "",
  });
  const [extraUserInfo, setExtraUserInfo] = useState({
    profilePicture: "",
    qPoints: "",
  });
  const token = getToken("token");

  const profileImageToTrue = useCallback(() => {
    setIsImageUploaded(true);
  }, [isImageUploaded]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const { phone_number, first_name, email } = decodedToken;
      setUserInfo({
        phone_number: phone_number,
        first_name: first_name,
        email: email,
      });

      //get profile picture
      const getProfileInfo = async () => {
        try {
          const response = await axios.get(profileApi, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          if (!response?.data?.profile_pic) {
            setIsImageUploaded(false);
            setExtraUserInfo({
              ...extraUserInfo,
              qPoints: data.points,
            });
            return;
          }

          setIsImageUploaded(true);
          setExtraUserInfo({
            qPoints: data.points,
            profilePicture: data.profile_pic,
          });
        } catch (err) {
          if (!err.response) {
            toast.error("failed to contact server", {
              position: "top-center",
              theme: "dark",
            });
          } else if (err.request.status === 401) {
            localStorage.clear();
          } else {
            toast.error("an error occured please try again", {
              position: "top-center",
              theme: "dark",
            });
          }
        }
      };
      getProfileInfo();
    }
  }, [rerender]);

  return {
    image,
    setImage,
    isImageUploaded,
    userInfo,
    extraUserInfo,
    profileImageToTrue,
  };
};
