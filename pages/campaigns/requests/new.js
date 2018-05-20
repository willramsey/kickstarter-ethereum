import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import getCampaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    isLoading: false,
    errorMessage: '',
  };

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { value, description, recipient } = this.state;
    const { address } = this.props;

    const campaign = getCampaign(address);

    this.setState({ isLoading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message.split('\n')[0] });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const {
      value,
      description,
      recipient,
      isLoading,
      errorMessage,
    } = this.state;
    const { address } = this.props;

    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Value (ether)</label>
            <Input
              value={value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value={recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Uh Oh!" content={errorMessage} />
          <Button loading={isLoading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
