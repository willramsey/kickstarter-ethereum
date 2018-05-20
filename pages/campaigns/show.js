import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = getCampaign(address);
    const summary = await campaign.methods.getSummary().call();

    return {
      campaignAddress: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      numRequests: summary[2],
      numApprovers: summary[3],
      managerAddress: summary[4],
    };
  }

  renderCards = () => {
    const {
      minimumContribution,
      balance,
      numRequests,
      numApprovers,
      managerAddress,
    } = this.props;

    const items = [
      {
        header: managerAddress,
        meta: 'Address of Manager',
        description:
          'The manager is the person who created this campaign. They can create requests to withdraw funds.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver.',
      },
      {
        header: numRequests,
        meta: 'Number of Requests',
        description:
          'A request is made by the manager in order to withdraw funds from the contract. Requests must be approved by a majority of the approvers.',
      },
      {
        header: numApprovers,
        meta: 'Number of Approvers',
        description:
          'Approvers are those who have contributed to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The current balance is how much money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  };

  render() {
    const { campaignAddress } = this.props;

    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={campaignAddress} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${campaignAddress}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
