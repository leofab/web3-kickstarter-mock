import React, {Component, useState} from 'react';
import Header from '../../components/Header';
import Campaign from '../../campaign';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import web3 from '../../web3';
import Contribute from "../../components/Contribute";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
class CampaignShow extends Component {

    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(address);
        return {
            minimumContribution: summary[0].toString(),
            balance: summary[1].toString(),
            requestsCount: summary[2].toString(),
            approversCount: summary[3].toString(),
            manager: summary[4],
            address: address
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            address
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.',
                style: { overflowWrap: 'break-word'}
            }
        ];

        return <Card.Group items={items} />;

    }
    render() {
        return (
            <Header>
                <h1>Campaign {this.props.address}</h1>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <h3>Detalhes da Campanha</h3>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h3>Contribuir</h3>
                            <Contribute address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Header>
        );
    }
}

export default CampaignShow;