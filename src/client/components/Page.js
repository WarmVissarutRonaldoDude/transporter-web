import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.div`
  padding: 0;
  max-width: 100%;
  height: 100%;
`;

const Page = props => (
  <Container className="container">
    {props.children}
  </Container>
);

Page.defaultProps = {
  children: null,
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
