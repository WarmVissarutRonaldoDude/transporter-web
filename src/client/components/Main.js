import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/shipping';
import Page from './Page';
import Shipping from './Shipping';

class Main extends React.PureComponent {
  render() {
    return (
      <Page>
          <Shipping />
          {this.props.children}
      </Page>
    );
  }
}

Main.defaultProps = {
  children: null,
};

Main.propTypes = {
  children: PropTypes.node,
};

const mapProps = (state) => {
  const { polyglot } = mapStateToProps('shipping')(state);

  return {
    polyglot,
  };
};

export default connect(mapProps, bindActions(actions))(Main);
