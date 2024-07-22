import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AnimatedBackground from '../components/AnimatedBackground';
import './HomePage.css'; // Inclua seus estilos personalizados aqui

const HomePage = () => {
  return (
    <>
      <AnimatedBackground />
      <Container fluid className="home-container">
        <Row className="min-vh-100 align-items-center justify-content-center text-center">
          <Col xs={12} md={10} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
                
              <h1 className="mb-4">Os serviços</h1>
              <p className="lead mb-5">
                Descubra soluções para suas necessidades com nossos serviços especializados em Desenvolvimento Web e Design.
              </p>
            </motion.div>

            <Row className="justify-content-center">
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="service-card"
                  >
                    <Button as={Link} to="/services/development"  className="service-btn w-100 p-3 ">
                      Desenvolvimento Web
                    </Button>
                  </motion.div>
                </motion.div>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="service-card"
                  >
                    <Button as={Link} to="/services/design"  className="service-btn w-100 p-3">
                      Design
                    </Button>
                    
                  </motion.div>
                </motion.div>
                
              </Col>
            </Row>
          </Col>
        </Row>
        
      </Container>
    </>
  );
};

export default HomePage;
