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
            <label>Book Image</label>
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
                <img src={imagePreview} alt="Book" />
              </div>
            ) : (
              <p>No image set for this book.</p>
            )}
          </Card>
          <label>Book Name:</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <label>Book Category:</label>
          <select onChange={(e)=>setSelectedCat(e.target.value)}>
            {categorys.map((elem,index)=>{
                return <option key={index} value={index}>{elem.name}</option>
              })
            }
          </select><br/>

          <label>Auteur:</label>
          <input
            type="text"
            placeholder="Auteur"
            name="auteur"
            value={product?.auteur}
            onChange={handleInputChange}
          />

            <label>Editeur:</label>
            <input
              type="text"
              placeholder="Editeur"
              name="editeur"
              value={product?.editeur}
              onChange={handleInputChange}
            />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Book
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
