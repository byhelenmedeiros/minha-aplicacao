import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './ServiceList.css'; // Inclua seus estilos personalizados aqui

const ServiceList = () => {
  const [services, setServices] = useState({});
  const [activeCategory, setActiveCategory] = useState('development');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/data/services.json')
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
        setError('Erro ao carregar serviços.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4"><h4>Carregando...</h4></div>;
  if (error) return <div className="text-center mt-4"><h4>{error}</h4></div>;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <Container className="mt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="mb-4">Nossos Serviços</h1>

        <div className="mb-4">
          <Button
            variant={activeCategory === 'development' ? 'primary' : 'outline-primary'}
            onClick={() => handleCategoryChange('development')}
            className="category-btn mx-2"
          >
            Desenvolvimento Web
          </Button>
          <Button
            variant={activeCategory === 'design' ? 'primary' : 'outline-primary'}
            onClick={() => handleCategoryChange('design')}
            className="category-btn mx-2"
          >
            Design
          </Button>
        </div>

        <Section title={activeCategory === 'development' ? 'Desenvolvimento Web' : 'Design'} services={services[activeCategory]} />
      </motion.div>
    </Container>
  );
};

const Section = ({ title, services }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-5"
    >
      <h2 className="text-center mb-4">{title}</h2>
      {Object.keys(services || {}).map(subcategory => (
        <div key={subcategory} className="mb-4">
          <h3 className="text-center mb-3">{subcategory.replace(/_/g, ' ')}</h3>
          <Row className="d-flex justify-content-center">
            {services[subcategory].map(service => (
              <Col xs={12} sm={6} md={4} lg={3} key={service.id} className="mb-4">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="service-card">
                    <Card.Body>
                      <Card.Title className="text-center">{service.name}</Card.Title>
                      <Card.Text className="text-center">{service.tooltip}</Card.Text>
                      <Button variant="outline-primary" className="w-100 service-btn">Ver mais</Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </motion.div>
  );
};

export default ServiceList;
