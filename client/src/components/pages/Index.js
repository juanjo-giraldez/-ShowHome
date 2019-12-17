import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import  from "bootstrap"

const Index = () => {
  return (
    <Container>
      <section>
        <Row>
          <Col md={6}>
            <h1>"Show Home"! </h1>
          </Col>

          <Col md={6} variant="success">
            <h3>Es una app para eventos en casas. </h3>

            <p>Se trata de ofrecer espacios y eventos.</p>
            <br />
            <p>Promover planes entre "Anfitriones" y "Creadores". </p>
            <br />
            <p>Crear nuevos expacios de unión cultural.</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Index;
