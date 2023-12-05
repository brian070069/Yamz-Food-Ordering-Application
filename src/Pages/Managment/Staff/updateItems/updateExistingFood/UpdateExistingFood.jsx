import Header from "../../../../Home/components/Header/Header";
import ManagmentNavigation from "../../../components/ManagmentNavigation";
import SideBar from "../../SideBar";

import UpdateFoodForm from "./upateFoodForm";
import { useParams } from "react-router-dom";

const UpdateExistingFood = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <SideBar />
      <UpdateFoodForm id={id} />
      <ManagmentNavigation />
    </>
  );
};

export default UpdateExistingFood;
