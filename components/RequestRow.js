import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import getCampaign from '../ethereum/campaign';

class RequestRow extends Component {
  handleApprove = async () => {
    const { id, address } = this.props;
    const campaign = getCampaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  };

  handleFinalize = async () => {
    const { id, address } = this.props;
    const campaign = getCampaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
  };

  render() {
    const { request, id, address, numRequests, numApprovers } = this.props;

    const { Row, Cell } = Table;
    const readyToFinalize = request.approvalCount > numApprovers / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {numApprovers}
        </Cell>
        <Cell>
          {!request.complete && (
            <Button color="green" basic onClick={this.handleApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {!request.complete && (
            <Button color="teal" basic onClick={this.handleFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
