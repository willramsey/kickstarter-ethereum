import React, { Component } from 'react';
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

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
      </Layout>
    );
  }
}

export default CampaignShow;
