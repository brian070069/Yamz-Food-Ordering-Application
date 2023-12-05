import React, { useState } from "react";
import { addNewItemValidationSchema } from "../updateExistingFood/UpdateFoodValidation";
import InLineInputError from "../../../../../components/InLineInputError";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartBaseUrl } from "../../../../../services/BaseUrls";
import HandleFormBtn from "../../../../../components/HandleFormBtn";

const AddNewItemForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, touched, errors, setValues } =
    useFormik({
      initialValues: {
        food_name: "",
        price: "",
        description: "",
        isAvailable: false,
      },
      validationSchema: addNewItemValidationSchema,

      //add new food
      onSubmit: async (values) => {
        const token = localStorage.getItem("token");

        //check for token
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        //image  upload allowed types
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/svg",
        ];

        //no choosen image
        if (!selectedFile) {
          toast.error("Please choose image for food ", {
            position: "top-center",
          });
          return;
        }

        //invalid image type
        if (!allowedTypes.includes(selectedFile.type)) {
          toast.error("Please select a valid image file (JPEG, PNG, GIF)", {
            position: "top-center",
          });
          return;
        }

        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("food_name", values.food_name);
          formData.append("food_image", selectedFile);
          formData.append("price", values.price);
          formData.append("description", values.description);
          formData.append("is_avilable", values.isAvailable ? "true" : "false");

          await axios.post(cartBaseUrl + "food/", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success("item addes succesfully", {
            theme: "dark",
            position: "top-center",
          });
          setIsLoading(false);
          setSelectedFile(null);
        } catch (err) {
          setIsLoading(false);
          console.log(err);
          if (!err.response) {
            toast.error("failed to contact the server please try again", {
              theme: "dark",
              position: "top-center",
            });
          } else if (err.request.status === 401) {
            navigate("/login", { replace: true });
          } else {
            toast.error("An error occured while uploading please try again", {
              theme: "dark",
              position: "top-center",
            });
          }
        }
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleIsAvailable = () => {
    setValues({ ...values, isAvailable: !values.isAvailable });
  };

  return (
    <div className="addNew__item">
      <h3 className="updateItem__header">Add new Item</h3>
      <form action="">
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
          <input
            type="file"
            onChange={handleFileChange}
            className={errors.price && touched.price ? "border__red" : ""}
          />
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
        <div className="addNewItem__form">
          <input
            type="checkbox"
            checked={values.isAvailable}
            onChange={handleIsAvailable}
          />
          <span>available</span>
        </div>
      </form>

      <HandleFormBtn
        content="Add item"
        handleForm={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
};

export default AddNewItemForm;
