import React, { Component } from 'react';
import Layout from '../../components/Layout';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    console.log('address', address);
    return { address };
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
