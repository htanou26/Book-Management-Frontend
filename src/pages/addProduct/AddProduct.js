import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import CategoryService from "../../redux/features/categorys/categoryService";


const initialState = {
  name: "",
  auteur: "",
  editeur: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categorys,setCategorys]=useState([]);
  const [selectedCat,setSelectedCat]=useState("");
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(()=>{
    getAllCategorys();
  },[])

  const isLoading = useSelector(selectIsLoading);

  async function getAllCategorys(){
    const resultat = await CategoryService.getCategorys()
    setCategorys(resultat)
    }

  const { name, auteur, editeur } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateISBN = (categorys) => {
    const letter = categorys.slice(0, 3).toUpperCase();
    const number = Date.now();
    const isbn = letter + "-" + number;
    return isbn;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    console.log(categorys[selectedCat]);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("isbn", generateISBN(categorys[selectedCat].name));
    formData.append("category", categorys[selectedCat].name);
    formData.append("auteur", auteur);
    formData.append("editeur", editeur);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        categorys={categorys}
        setSelectedCat={setSelectedCat}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
