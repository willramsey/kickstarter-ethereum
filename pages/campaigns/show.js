import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import campaignInstance from '../../ethereum/campaign';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = campaignInstance(address);
    const summary = await campaign.methods.getSummary().call();

    return {
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
    ];

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;
