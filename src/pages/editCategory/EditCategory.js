import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CategoryForm from "../../components/category/categoryForm/categoryForm";
import {
  getCategory,
  getCategorys,
  selectIsLoading,
  selectCategory,
  updateCategory,
} from "../../redux/features/categorys/productSlice";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const categoryEdit = useSelector(selectCategory);

  const [category, setCategory] = useState(categoryEdit);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCategory(categoryEdit);

    setDescription(
      categoryEdit && categoryEdit.description ? categoryEdit.description : ""
    );
  }, [categoryEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    //const formData = new FormData();
    //formData.append("name", category?.name);
    //formData.append("description", description);
    const formData = {
      "name": category?.name,
      "description": description
    }
    console.log(formData);

    await dispatch(updateCategory({ id, formData }));
    await dispatch(getCategorys());
    navigate("/categoryDashbord");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Category</h3>
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

export default EditCategory;
