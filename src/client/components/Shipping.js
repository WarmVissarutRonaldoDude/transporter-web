import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/shipping';

const TrackingInput = styled.input`
  background-color: transparent;
  border: 0.1rem solid #e63312;
  border-radius: 0.4rem;
  color: #f9bc00;
  font-family: sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  height: 4.8rem;
  text-align: center;
  width: 200px !important;
  margin: 20px;
`;

const Header = styled.span`
  font-family: sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

const TrackingLabel = styled.label`
    margin: 20px;
    font-family: sans-serif;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    display: inline;
`;

const FindButton = styled.button.attrs({
    disabled: props => props.busy,
  })`
    background-color: #f9bc00;
    border: 0.1rem solid #f9bc00;
    color: #fff;
    font-family: sans-serif;
    font-size: '1.4rem';
    font-weight: bold;
    letter-spacing: 0;
    margin-top: '1rem';
    height: 4.4rem;
    text-transform: none;
    width: auto;
    overflow: hidden;
    padding: 20;
`;

class Shipping extends React.Component {
    onFindShipping(evt) {
        evt.preventDefault();
        if (this.props.store.shippingId) {
            this.props.actions.getShippingDetail(this.props.store.shippingId);
        }
    }

    onShippingIdPut(evt) {
        evt.preventDefault();
        const id = evt.target.value;

        if (id) {
            this.props.actions.inputShippingId(id);
        }
    }

    render() {
        const shippingId = this.props.store.shippingId || '';
        const shippingDetail = this.props.store.shippingDetail &&
        this.props.store.shippingDetail.shippingData ?
            JSON.stringify(this.props.store.shippingDetail.shippingData, null, 4) : '';
        return (
            <div>
                <Header>Shipping Page Tracking</Header>
                <div>
                    <TrackingLabel>
                        Tracking Number:
                    </TrackingLabel>
                    <TrackingInput
                        name="shippingId"
                        value={shippingId}
                        onChange={evt => this.onShippingIdPut(evt)}
                    />
                    <FindButton
                        type="button"
                        onClick={evt => this.onFindShipping(evt)}
                    >
                        Find
                    </FindButton>
                </div>
                <div>
                    <TrackingLabel>
                        Shipping Detail:
                    </TrackingLabel>
                    <TrackingLabel>
                        {shippingDetail}
                    </TrackingLabel>
                </div>
            </div>
        );
    }
}


Shipping.propTypes = {
    actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
    store:  PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default connect(mapStateToProps('shipping'), bindActions(actions))(Shipping);