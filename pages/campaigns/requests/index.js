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
        let requestNum = await campaign.methods.getRequestsCount().call();
        let requests = [];
        for(let i = 0; i < requestNum; i++){
            const request = await campaign.methods.requests(i).call();
            requests.push(request);
        }
        console.log(requests);
        return {
            manager: summary[4],
            address: address,
            requests: requests,
        };
    }
    renderCards() {
        const {
            manager,
            address,
            requests
        } = this.props;

            const items = []

        for (let i = 0; i < requests.length; i++) {
            items.push({
                header: JSON.stringify(requests[i].description),
                meta: 'Complete: ' + requests[i].complete + ' | ' + 'Value: ' + web3.utils.fromWei(requests[i].value, 'ether'),
                description: 'Recipient '+JSON.stringify(requests[i].recipient),
                style: { overflowWrap: 'break-word' }
            })
        }

        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Header>
                <Grid>
                    <GridRow>
                        <GridColumn>
                            <h2>Campaign Requests</h2>
                            <h4>Nø - {this.props.address}</h4>
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