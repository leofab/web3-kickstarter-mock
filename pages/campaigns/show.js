import React, {Component, useState} from 'react';
import Header from '../../components/Header';
import Campaign from '../../campaign';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        }
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