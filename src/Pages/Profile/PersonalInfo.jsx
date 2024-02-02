import { useState } from "react";
import Avatar from "../../assets/profile.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { profileApi } from "../../services/BaseUrls";
import { Toast } from "../../services/ToasterProvider";

const PersonalInfo = ({ data }) => {
  const {
    firstName,
    phoneNumber,
    email,
    profilePicture,
    isAuthenticated,
    profilePicStatus,
    image,
    setImage,
  } = data;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadPhoto = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!selectedFile) {
      Toast.error("please select file for upload");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      Toast.error("Please select a  image of Type (JPEG, PNG, GIF)");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(profileApi, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //uploaded successfully
      setLoading(false);
      setSelectedFile(null);
      profilePicStatus.profileTrue();
      Toast.success("uploaded successfully");
      setImage(response.data.profile_pic);
    } catch (error) {
      setLoading(false);
      if (!error.response) {
        Toast.error("failed to contact the server please try again");
      } else if (error.request.status === 401) {
        navigate("/login", { replace: true });
      } else {
        Toast.error("uknown error occured please try again");
      }
    }
  };

  return (
    <>
      <div className="personalInfo__container">
        <div className="personalInfo__upper">
          <div className="profileImage__container">
            <img
              src={
                profilePicStatus.isImageUploaded && isAuthenticated
                  ? image || profilePicture
                  : Avatar
              }
              alt="image"
            />
          </div>
          <p>{email}</p>
        </div>
        <div className="personalInfo__lower row">
          <div className="personalDetails">
            <div>
              <span className=" pib">name:</span>
              <span className="pia">{firstName}</span>
            </div>
            <div>
              <span className="pib">phone Number:</span>
              <span className="pia">{phoneNumber}</span>
            </div>
          </div>
          <div className="uploadPhoto">
            <form>
              <input type="file" onChange={handleFileChange} />
            </form>
            <button
              type="button"
              className={`uploadPhoto__btn ${loading && "disabled__btn"}`}
              disabled={loading}
              onClick={uploadPhoto}
            >
              {loading ? (
                <TailSpin
                  height="22"
                  width="22"
                  color="red"
                  ariaLabel="tail-spin-loading"
                  radius="0.5"
                  wrapperStyle={{ paddingLeft: "20px" }}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "upload photo"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
