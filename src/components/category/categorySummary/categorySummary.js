import React, { useEffect } from "react";
import "./ProductSummary.scss";
import { BsCart4 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
} from "../../../redux/features/product/productSlice";

// Icons
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CategorySummary = ({ products }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default CategorySummary;
