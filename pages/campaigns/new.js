import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  state = { minContribution: '' };

  handleChange = event => {
    this.setState({ minContribution: event.target.value });
  };

  render() {
    return (
      <Layout>
        <h1>Create a Campaign</h1>

        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              onChange={this.handleChange}
              value={this.state.minContribution}
              label="wei"
              labelPosition="right"
            />
            <Button primary>Create</Button>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
