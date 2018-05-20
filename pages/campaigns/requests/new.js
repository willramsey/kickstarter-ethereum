import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import getCampaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = { value: '', description: '', recipient: '' };

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  render() {
    const { value, description, recipient } = this.state;
    const { address } = this.props;

    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form>
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

          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
