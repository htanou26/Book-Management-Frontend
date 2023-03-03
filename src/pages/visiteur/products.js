import React , { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import productService from "../../redux/features/visit/visitService";
import { AiOutlineEye } from "react-icons/ai";

const ProductsVisite = () => {
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);
    let [products, setProducts]=useState([])
    useEffect(()=>{
        getProducts()
    },[])
    async function getProducts(){
        try {
          let result =await productService.getProducts()
          setProducts(result)
          console.log(result)
        }
        catch(error) {
          console.log(error)
        }
      }
      const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        setSearchTimeout(
          setTimeout(() => {
            const searchResult = products.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
            setSearchedResults(searchResult);
          }, 500),
        );
      };
  return (
    <>
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
    </Navbar>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>N</th>
          <th>Name</th>
          <th>Category</th>
          <th>Auteur</th>
          <th>Editeur</th>
          <th>voir</th>
        </tr>
      </thead>
      <tbody>
            {
                products.map((p, index) => (
                  <tr key={p._id}>
                    <td>{index+1}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.auteur}</td>
                    <td>{p.editeur}</td>
                    <td>
                        <span>
                          <Link to={`/Visit/${p._id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                    </td>
                  </tr>
                ))
            }        
      </tbody>
    </Table>
    </>
  )
}

export default ProductsVisite