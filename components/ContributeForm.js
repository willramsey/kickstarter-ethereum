import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import getCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = { value: '', isLoading: false, errorMessage: '' };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { address } = this.props;
    const { value } = this.state;

    const campaign = getCampaign(address);

    this.setState({ isLoading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });

      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message.split('\n')[0] });
      console.log('err', err.message);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, errorMessage } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            onChange={this.handleChange}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Uh oh!" content={errorMessage} />
        <Button primary loading={isLoading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
