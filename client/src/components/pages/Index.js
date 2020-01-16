import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Index = () => {
  return (
    <div className="paseo">
    <Container>

      <section className="colorIndex">
        <Row>
          <Col md={6}>
            <h1 className="titleIndex">"Show Home"! </h1>
          </Col>

          <Col md={6} variant="success" className="textIndex">
            <h3><strong > Es una app para eventos en cualquier lugar </strong></h3 >

            <p> Eventos y diversión para gente divertida.</p>
            <br />
            <p>planes y eventos creados especialmente para ti </p>
            <br />
            <p>busca tu plan y unete.....</p>
          </Col>
        </Row>
      </section>
    </Container>
    </div>
  );
};

export default Index;
