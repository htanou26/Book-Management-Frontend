import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./categoryList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import categoryService from "../../../redux/features/categorys/categoryService"

const CategoryList = ({ categorys, isLoading }) => {
  let [category, setCategorys]=useState([])
  useEffect(()=>{
    getCategory()
},[])
async function deleteCategorys(id){
try{
  await categoryService.deleteCategory(id)
  getCategory();
}
catch(error){
  console.log(error)
}
}
async function getCategory(){
  try {
    let result =await categoryService.getCategorys()
    setCategorys(result)
    console.log(result)
  }
  catch(error) {
    console.log(error)
  }
}
  const [search, setSearch] = useState("");
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure you want to delete this category.",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCategorys(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  console.log(categorys);
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Categorys Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && category.length === 0 ? (
            <p>-- No Category found, please add a category...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>n</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {console.log(category)}
                {category.map((cate, index) => {
                  const { _id, name} = cate;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/category-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-category/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
