import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getCategory } from "../../../redux/features/categorys/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./categoryDetail.scss";


const CategoryDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { category, isLoading, isError, message } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCategory(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Category Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {category && (
          <div className="detail">
            <h4>
              <span className="badge">Name: </span> &nbsp; {category.name}
            </h4>
            <p>
              <b>&rarr; Description : </b> <br/> {category.description.split("<p>").join("").split("</p>").join("")}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CategoryDetail;
