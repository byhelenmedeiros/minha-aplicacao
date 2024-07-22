import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

const DesignPage = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/data/services.json')
      .then(response => {
        setServices(response.data[category] || []);
        setFilteredServices(response.data[category] || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
        setError('Erro ao carregar serviços.');
        setLoading(false);
      });
  }, [category]);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilteredServices(
      services.filter(service =>
        service.name.toLowerCase().includes(value)
      )
    );
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4">Serviços de {category.replace(/_/g, ' ')}</h1>
        <Form className="mb-4">
          <Form.Group controlId="filter">
            <Form.Control
              type="text"
              placeholder="Filtrar serviços"
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Form>
        <Row>
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <Col key={service.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ServiceCard service={service} />
              </Col>
            ))
          ) : (
            <p>Nenhum serviço encontrado.</p>
          )}
        </Row>
      </motion.div>
    </Container>
  );
};

export default DesignPage;
