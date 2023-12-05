import React, { useCallback, useEffect, useState } from "react";

import InLineInputError from "../../../../../components/InLineInputError";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addNewItemValidationSchema } from "./UpdateFoodValidation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cartBaseUrl } from "../../../../../services/BaseUrls";
import HandleFormBtn from "../../../../../components/HandleFormBtn";
import { HiTrash } from "react-icons/hi2";

const UpdateFoodForm = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [foodDetails, setFoodDetails] = useState({
    food_id: "",
    food_image: "",
    is_avilable: true,
  });
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, touched, errors, setValues } =
    useFormik({
      initialValues: {
        food_name: "",
        price: "",
        description: "",
      },
      validationSchema: addNewItemValidationSchema,
      onSubmit: async (values) => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        //unauthorized user
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        //if image was selcted
        if (selectedFile) {
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/svg",
          ];

          // image type now allowed
          if (!allowedTypes.includes(selectedFile.type)) {
            toast.error(
              "Please select a valid image file (JPEG, PNG, GIF,SVG)",
              {
                position: "top-center",
              }
            );
            return;
          }
          //image type allowed
          formData.append("food_image", selectedFile);
        }

        try {
          setIsLoading(true);
          formData.append("food_name", values.food_name);
          formData.append("price", values.price);
          formData.append("description", values.description);
          formData.append(
            "is_avilable",
            foodDetails.is_avilable ? "true" : "false"
          );

          await axios.patch(cartBaseUrl + `food/${id}/`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsLoading(false);
          toast.success("upated successfully", {
            position: "top-center",
          });
        } catch (err) {
          setIsLoading(false);
          if (!err.response) {
            toast.error("failed to contact the server please try again", {
              position: "top-center",
            });
          } else if (err.request.status === 401) {
            navigate("/login", { replace: true });
          } else {
            toast.error("An error occured while uploading please try again", {
              position: "top-center",
            });
          }
        }
      },
    });

  const getFoodToUpdate = useCallback(() => {
    const getFood = async () => {
      try {
        const response = await axios.get(cartBaseUrl + `food/${id}/`);
        const data = response.data;
        setValues({
          food_name: data.food_name,
          price: data.price,
          description: data.description,
        });
        setFoodDetails({
          food_id: data.food_id,
          food_image: data.food_image,
          is_avilable: data.is_avilable,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getFood();
  }, [id]);

  const handleCheckBox = () => {
    setFoodDetails({ ...foodDetails, is_avilable: !foodDetails.is_avilable });
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleDeleteFood = async () => {
    try {
      const response = await axios.delete(cartBaseUrl + `food/${id}/`);
      toast.success("deleted succesfully", { theme: "dark" });
      navigate("/staff");
    } catch (error) {
      toast.error("an error occured please try again", { theme: "dark" });
    }
  };

  useEffect(() => {
    getFoodToUpdate();
  }, []);

  return (
    <>
      <div className="addNew__item update__item">
        <h3 className="updateItem__header">Update Item</h3>
        <form action="">
          <div className="addNewItem__form">
            <h3>food Id</h3>
            <input
              type="text"
              value={foodDetails.food_id}
              onChange={() => {}}
            />
          </div>
          <div className="addNewItem__form">
            <h3>name</h3>
            <input
              type="text"
              name="food_name"
              value={values.food_name}
              onChange={handleChange}
              className={
                errors.food_name && touched.food_name ? "border__red" : ""
              }
            />
            <InLineInputError
              touched={touched.food_name}
              errors={errors.food_name}
            />
          </div>
          <div className="addNewItem__form">
            <Link to={foodDetails.food_image} style={{ width: "fit-content" }}>
              {foodDetails.food_image && foodDetails.food_image.slice(0, 22)}
            </Link>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="addNewItem__form">
            <h3>price</h3>
            <input
              type="text"
              name="price"
              value={values.price}
              onChange={handleChange}
              className={errors.price && touched.price ? "border__red" : ""}
            />
            <InLineInputError touched={touched.price} errors={errors.price} />
          </div>
          <div className="addNewItem__form">
            <h3>Description</h3>
            <input
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              className={
                errors.description && touched.description ? "border__red" : ""
              }
            />
            <InLineInputError
              touched={touched.description}
              errors={errors.description}
            />
          </div>
          <div className="addNewItem__form updateItem__buttons row">
            <div>
              <input
                type="checkbox"
                checked={foodDetails.is_avilable}
                onChange={handleCheckBox}
              />
              <span>available</span>
            </div>
            <button type="button" onClick={handleDeleteFood}>
              <HiTrash size={24} />
            </button>
          </div>
        </form>
        <HandleFormBtn
          content="update item"
          handleForm={handleSubmit}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default UpdateFoodForm;
