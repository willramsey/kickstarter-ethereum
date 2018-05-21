import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import getCampaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = getCampaign(address);
    const numRequests = await campaign.methods.getRequestsCount().call();
    const numApprovers = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      new Array(Number(numRequests)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      }),
    );

    return { campaign, address, requests, numApprovers };
  }

  renderRows() {
    const { campaign, address, requests, numApprovers } = this.props;

    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          campaign={campaign}
          address={address}
          request={request}
          numApprovers={numApprovers}
        />
      );
    });
  }

  render() {
    const { address } = this.props;
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;
