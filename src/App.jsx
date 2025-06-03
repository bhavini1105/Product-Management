import React, { useEffect, useRef, useState } from 'react'
import Index from './Components/Index';
import Form from './Components/Form';
import Table from './Components/Table';
import { Route, Routes, useNavigate } from 'react-router';
import axios from 'axios';

const App = () => {
  const [product, setProduct] = useState({});
  const [productsData, setProductsData] = useState([]);
  const [godown, setGodown] = useState([]);
  const [editId, setEditId] = useState("");
  const imgRef = useRef();
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const URL = "http://localhost:3000/product";

  // useEffect(() => {
  //   const oldData = JSON.parse(localStorage.getItem("productss") || "[]");
  //   setProductsData(oldData);
  // }, []);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    let res = await axios.get(URL);
    setProductsData(res.data);
    setEditId("");
    setProduct({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "godown") {
      let newGodown = [...godown];
      if (checked) {
        newGodown.push(value);
      } else {
        newGodown = newGodown.filter((val) => val !== value);
      }
      setGodown(newGodown);
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const product_image = {
            name: file.name,
            type: file.type,
            url: reader.result,
          };
          setProduct((prev) => ({ ...prev, product_image }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validation = () => {
    let errors = {};
    if (!product.product_name)
      errors.product_name = "*Product Name is required";
    if (!product.product_price)
      errors.product_price = "*Product Price is required";
    if (!product.product_stock) errors.product_stock = "*Stock is required";
    // if (!product.file) errors.file = "*Image is required";
    if (!godown || godown.length === 0) errors.godown = "*Godown is required";
    if (!product.description) errors.description = "*Description is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) return;

    if (editId === "") {
      await axios.post(URL, { ...product, godown, id: String(Date.now()) });
    } else {
      let res = await axios.put(`${URL}/${editId}`, { ...product });
    }
    handleFetch();

    setProduct({});
    setGodown([]);
    imgRef.current.value = "";

    navigate("/table");
  };

  const handleDelete = async (id) => {
    await axios.delete(`${URL}/${id}`);
    handleFetch();
  };

  const handleEdit = (id) => {
    let user = productsData.find((item) => item.id === id);
    if (!user) return;

    setEditId(id);
    setProduct(user);
    setGodown(user.godown || []);
    navigate("/form");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/form"
          element={
            <Form
              handleChange={handleChange}
              product={product}
              godown={godown}
              handleSubmit={handleSubmit}
              imgRef={imgRef}
              isEdit={editId !== ""}
              error={error}
            />
          }
        />
        <Route
          path="/table"
          element={
            <Table
              productsData={productsData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
