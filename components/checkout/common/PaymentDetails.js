import React, { Component } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import Radiobox from '../../common/atoms/Radiobox';

export default class PaymentDetails extends Component {
  /**
   * Render a form for using the Chec test gateway.
   *
   * @returns {JSX.Element}
   */
  renderTestGateway() {
    const {
      gateways,
      onChangeGateway,
      selectedGateway,
      cardNumber,
      expMonth,
      expYear,
      cvc,
    } = this.props;

    if (!gateways || !gateways.available['test_gateway']) {
      return null;
    }

    
  }

  /**
   * Renders a Stripe Elements form for capturing payment information using Stripe as the gateway
   *
   * @returns {JSX.Element}
   */
  renderStripe() {
    const { gateways, onChangeGateway, selectedGateway } = this.props;

    if (!gateways || !gateways.available['stripe']) {
      return null;
    }

    const cardElementOptions = {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      }
    }

    return (
      <div className="borderbottom border-color-gray500">
        <label
          onClick={() => onChangeGateway('stripe')}
          className="p-3 d-flex align-items-center cursor-pointer"
        >
          <Radiobox
            checked={selectedGateway === 'stripe'}
            className="mr-3"
          />
          <p className="font-weight-medium">Credit/debit card (via Stripe)</p>
        </label>

        { selectedGateway === 'stripe' && (
          <div className="pl-5 pr-3 pb-3 ml-2">
            <CardElement options={cardElementOptions} />
          </div>
        ) }
      </div>
    );
  }

  /**
   * Render the payment view, including payment options for each supported gateway
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        <p className="font-size-subheader font-weight-semibold mb-3">
          Payment Detail
        </p>
        <div className="border border-color-gray400 mb-5">
          { this.renderTestGateway() }
          { this.renderStripe() }
          { /* todo support other gateways here */ }
        </div>
      </>
    );
  }
}

PaymentDetails.propTypes = {
  gateways: PropTypes.object,
  onChangeGateway: PropTypes.func,
  selectedGateway: PropTypes.string,
}
