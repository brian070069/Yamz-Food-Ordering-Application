import React from "react";
import { useNavigate } from "react-router-dom";

const SingleProject = ({ projectInfo }) => {
  const { id, image, description, price, style, location } = projectInfo;
  const navigate = useNavigate("");

  const handleNavigate = () => {
    navigate(`/project/${id}`);
  };

  return (
    <div className={`workDetails ${id % 2 === 0 && "workDetails__reverse"}`}>
      <div className="workImage">
        <img src={image} alt="image" />
      </div>
      <div className="workInfo">
        <h4>{location}</h4>
        <p>{description}</p>
        <div className="otherInfo">
          <button onClick={handleNavigate}>view project</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
