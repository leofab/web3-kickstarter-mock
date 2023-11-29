import React, { Component } from 'react';
import Header from '../../../components/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Link from "../../../routes";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {GridColumn, GridRow} from "semantic-ui-react";
import Campaign from "../../../campaign";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import web3 from "../../../web3";
class RequestsIndex extends Component {

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
            }
        ]

        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Header>
                <Grid>
                    <GridRow>
                        <GridColumn>
                            <h1>Campaign {this.props.address}</h1>
                            {this.renderCards()}
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Button
                                content={"Adicionar Request"}
                                icon={"add circle"}
                                primary={true}
                                floated={"top"}
                                onClick={() => {
                                    Link.Router.pushRoute(`/campaigns/${this.props.address}/requests/new`);
                                }}
                            />
                        </GridColumn>
                    </GridRow>
                </Grid>

            </Header>
        );
    }
}

export default RequestsIndex;