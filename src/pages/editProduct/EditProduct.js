import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import CategoryService from "../../redux/features/categorys/categoryService"

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const [categorys,setCategorys]=useState([])//tableau categorys
  const [selectedCat,setSelectedCat]=useState("")//indice des categorys

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [auteur, setEditeur] = useState("");
  const [editeur, setAuteur] = useState("");

  useEffect(()=>{
    getAllCategorys();
  },[])

  async function getAllCategorys(){
  const resultat = await CategoryService.getCategorys()
    setCategorys(resultat)
  }

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
console.log(product);
  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    ); 
    setEditeur(
      productEdit && productEdit.editeur ? productEdit.editeur : ""
    );    
    setAuteur(
      productEdit && productEdit.auteur ? productEdit.auteur : ""
    );
  }, [productEdit]);
console.log(product);
  let myArray = categorys;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("auteur", auteur);
    formData.append("editeur", editeur);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Book</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        categorys={myArray}
        selectedCat={setSelectedCat}   
        auteur={auteur}
        setAuteur={setAuteur}        
        editeur={editeur}
        setEditeur={setEditeur}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;
