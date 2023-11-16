import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Select } from '@ui5/webcomponents-react';
import { Input } from '@ui5/webcomponents-react';
import { Button } from '@ui5/webcomponents-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from "./data.js";
import { HiOutlineArrowPath } from "react-icons/hi2";
import logo from "./assets/logo.png"
import "./App.css"
import { Loader } from '@ui5/webcomponents-react';
import { Icon } from '@ui5/webcomponents-react';



function App() {
  const [tcodes, setTcodes] = useState(data);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); 

  const showMoreItems = () => {
    setLoading(true); 
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000); 
  };

  const refresh = () => {
    setCurrentPage(1)
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  // Filtreleme ve sayfalama işlemleri
  const filteredTcodes = tcodes.filter((item) => {
    const descLowerCase = item.desc && item.desc.toLowerCase();
    return search.toLowerCase() === ''
      ? item
      : descLowerCase && descLowerCase.includes(search);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = filteredTcodes.slice(startIndex, startIndex + itemsPerPage);


  return (
    <>
    
    <div className="py-4">
      <Container>
          <Input icon={<Icon name="search" />}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Arama'>
          </Input>
          {loading && <Loader></Loader>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>İşlem Kodu</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item, index) => (
              <tr key={index}>
                <td>{item.tcode}</td>
                <td>{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between">
          <div>
            {filteredTcodes.length > currentPage * itemsPerPage && (
              <Button onClick={showMoreItems} variant="primary">
                Daha Fazla Göster
              </Button>
            )}
          </div>
          <div>
            <Button onClick={refresh} variant="outline-secondary">
            <HiOutlineArrowPath />
            </Button>
          </div>
        </div>
      </Container>
    </div>
    
    
    </>
  );
}

export default App;
