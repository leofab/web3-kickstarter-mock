import React, {Component, useState} from 'react';
import Header from '../../components/Header';
import Campaign from '../../campaign';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestsCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4]
        };
    }
    render() {
        return (
            <Header>
            <h1>Campaign Show</h1>
            </Header>
        );
    }
}

export default CampaignShow;