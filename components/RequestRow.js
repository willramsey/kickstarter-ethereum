import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
  handleApprove = async () => {
    const { campaign, id } = this.props;

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  };

  handleFinalize = async () => {
    const { campaign, id } = this.props;

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
  };

  render() {
    const { request, id, address, numRequests, numApprovers } = this.props;
    const { Row, Cell } = Table;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {numApprovers}
        </Cell>
        <Cell>
          <Button color="green" basic onClick={this.handleApprove}>
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button color="teal" basic onClick={this.handleFinalize}>
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
