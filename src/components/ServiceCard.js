import React from 'react';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './ServiceCard.css'; 

const ServiceCard = ({ service, isSelected, onClick }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Perfeito para: {service.perfectFor}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`service-card ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
      >
        <Card className="border-1 rounded-lg shadow-sm">
          <Card.Body>
            <Card.Title className="text-center">{service.name}</Card.Title>
            <Card.Text className="text-center">{service.description}</Card.Text>
            <Button variant="primary" className="service-btn w-100" onClick={onClick}>
              Ver preços
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </OverlayTrigger>
  );
};

export default ServiceCard;
