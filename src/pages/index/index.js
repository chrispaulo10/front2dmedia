import React from 'react';
import Headers from '../../componentes/header';
import Menu from '../../componentes/main/Menu';
import YourOrder from '../../componentes/main/YourOrder';
import { Container, Row, Col } from 'reactstrap';

function Index() {

  return (
    <div>
    <Headers/>
    <Container>
      <Row>
        <Col lg="8" md="12" sm="12" xs="12">
          <Menu />
        </Col>
        <Col lg="4" className="body-order" >
          <YourOrder />
        </Col>
      </Row>
    </Container>
    {/* <a href="# " className="back-to-top"><i class="fas fa-chevron-up"></i></a> */}
    </div>
  );
}

export default Index;
