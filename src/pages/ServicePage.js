import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import './ServicePage.css'; // Certifique-se de que está importando as classes CSS corretamente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ServicePage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    axios.get('/data/services.json')
      .then(response => {
        const fetchedServices = response.data[category] || [];
        setServices(fetchedServices);
        setFilteredServices(fetchedServices);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
        setError('Erro ao carregar serviços.');
        setLoading(false);
      });
  }, [category]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setSelectedPlan(null); // Reset selected plan
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const navigateToCategory = (newCategory) => {
    navigate(`/services/${newCategory}`);
  };

  if (loading) {
    return (

      <Container className="text-center mt-4">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </Container>
    );
  }

  if (error) return <Container><p>{error}</p></Container>;

  return (
    <Container className="mt-4 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-center">Serviços de {category.replace(/_/g, ' ')}</h1>

        {/* Botões de navegação */}
        <Container className="text-center mb-4">
          {category !== 'design' && (
            <Button
              variant="primary"
              onClick={() => navigateToCategory('design')}
              className="me-2 service-btn"
            >
              Ir para Design
            </Button>
          )}
          {category !== 'development' && (
            <Button
              variant="primary"
              onClick={() => navigateToCategory('development')}
              className="ms-2 service-btn"
            >
              Ir para Desenvolvimento Web
            </Button>
          )}
        </Container>

        <Row>
          <AnimatePresence>
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <Col
                  key={service.id}
                  xs={12} sm={6} md={4} lg={3}
                  className="mb-4"
                >
                  <ServiceCard 
                    service={service} 
                    isSelected={selectedService === service} 
                    onClick={() => handleServiceClick(service)}
                  />
                </Col>
              ))
            ) : (
              <Col><p>Nenhum serviço encontrado.</p></Col>
            )}
          </AnimatePresence>
        </Row>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="selected-service mt-4"
          >
            <Container className="p-3 border rounded shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
              <h2 className="text-center">{selectedService.name}</h2>
              <p className="text-center">{selectedService.description}</p>
              <h3 className="text-center">Planos</h3>
              <Row>
                {selectedService.plans && Object.keys(selectedService.plans).map(plan => (
                  <Col xs={12} sm={4} md={4} key={plan} className="mb-2">
                    <Button 
                      variant="outline-primary" 
                      className="w-100 service-btn"
                      onClick={() => handlePlanClick(plan)}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                    </Button>
                  </Col>
                ))}
              </Row>
              {selectedPlan && (
                <Container className="p-3 border rounded mt-4 shadow-sm" style={{ maxWidth: '600px', margin: 'auto' }}>
                  <h4 className="text-center">{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan Details</h4>
                  <p className="text-start">{selectedService.plans[selectedPlan]?.description}</p>
                  <p className="text-start">Preço: {selectedService.plans[selectedPlan]?.price}</p>
                  <p className="text-start">Funcionalidades:</p>
                  <ul className="text-start list">
                    {selectedService.plans[selectedPlan]?.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Container>
              )}
              <Button variant="secondary" className="service-btn mt-3" onClick={() => setSelectedService(null)}>
                Voltar
              </Button>
            </Container>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default ServicePage;
