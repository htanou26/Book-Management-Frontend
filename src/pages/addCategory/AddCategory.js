import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/category/categoryForm/categoryForm";
import {
  createCategory,
} from "../../redux/features/categorys/productSlice";

const initialState = {
  name: "",
};

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialState);
  const [description, setDescription] = useState("");
  const { name } = category;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    //const formData = new FormData();
    const formData = {
      "name": name,
      "description": description
    }
    
    //formData.append("name", name);
   // formData.append("description", description);

    console.log(formData);

    await dispatch(createCategory(formData));

    navigate("/categoryDashbord");
  };

  return (
    <div>
      <h3 className="--mt">Add New Category</h3>
      <CategoryForm
        category={category}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveCategory={saveCategory}
      />
    </div>
  );
};

export default AddCategory;
