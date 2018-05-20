import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';

class ContributeForm extends Component {
  state = { value: '', isLoading: false };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            onChange={this.handleChange}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Button primary>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;
