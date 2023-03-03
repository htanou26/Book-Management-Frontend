import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import categoryService from "../../redux/features/categorys/categoryService"
import CategoryList from "../../components/category/categoryList/categoryList";
const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  let [category, setCategorys]=useState([])
  useEffect(()=>{
    getCategory()
  },[])
  async function getCategory(){
    try {
      let result =await categoryService.getAll()
      setCategorys(result.data)
      console.log(result.data)
    }
    catch(error) {
      console.log(error)
    }
  }


  return (
    <div>
      <ProductSummary products={products} />
      <CategoryList categorys={category} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
