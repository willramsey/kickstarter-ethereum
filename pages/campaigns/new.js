import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minContribution: '',
    errorMessage: '',
    isLoading: false,
  };

  handleChange = event => {
    this.setState({ minContribution: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minContribution).send({
        from: accounts[0],
      });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Create a Campaign</h1>

        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              onChange={this.handleChange}
              value={this.state.minContribution}
              label="wei"
              labelPosition="right"
            />
          </Form.Field>
          <Message error header="Uh oh!" content={this.state.errorMessage} />
          <Button primary loading={this.state.isLoading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
