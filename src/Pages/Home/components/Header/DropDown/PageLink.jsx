import React from "react";
import { Link } from "react-router-dom";

const PageLink = ({ navigation, icon, name }) => {
  return (
    <Link to={navigation} className="row">
      <i>{icon}</i>
      <span>{name}</span>
    </Link>
  );
};

export default PageLink;
