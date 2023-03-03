import React , {useState, useEffect}from 'react'
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card"
import "./ProductDetail.scss";

import productService from "../../redux/features/visit/visitService"
const ProductsVisitDetail = () => {
  const { id } = useParams();
  let [products, setProducts]=useState([])
  useEffect(()=>{
    getProducts()
},[])

async function getProducts(){
    try {
      let result =await productService.getProduct(id);
      setProducts(result)
      console.log(result)
    }
    catch(error) {
      console.log(error)
    }
  }
  const styles = {
    width: '80%',
  margin: '0 auto'
  }
  const stylesImg = {
        width: '200px',
        height: '290px'
  }
  return (
    <div>
        <Card cardClass="card">
        {products && (
          <div className="detail"  style={styles}>
            <Card cardClass="group">
              {products?.image ? (
                <img style={stylesImg}
                  src={products.image.filePath}
                  alt={products.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {products.name}
            </h4>
            <p>
              <b>&rarr; ISBN : </b> {products.isbn}
            </p>
            <p>
              <b>&rarr; Category : </b> {products.category}
            </p>
            <p>
              <b>&rarr; Auteur : </b> {products.auteur}
            </p>
            <p>
              <b>&rarr; Editeur : </b> {products.editeur}
            </p>
            <hr />
            <code className="--color-dark">
              Created on: {products.createdAt}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {products.updatedAt}
            </code>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ProductsVisitDetail