import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";
const ProductForm = ({
  product,
  productImage,
  imagePreview,
  categorys,
  setSelectedCat,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {


  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <label>Product Category:</label>
          <select onChange={(e)=>setSelectedCat(e.target.value)}>
            {categorys.map((elem,index)=>{
                return <option key={index} value={index}>{elem.name}</option>
              })
            }
          </select><br/>

          <label>Product Auteur:</label>
          <input
            type="text"
            placeholder="Product Auteur"
            name="auteur"
            value={product?.auteur}
            onChange={handleInputChange}
          />

            <label>Product Editeur:</label>
            <input
              type="text"
              placeholder="Product Editeur"
              name="editeur"
              value={product?.editeur}
              onChange={handleInputChange}
            />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
