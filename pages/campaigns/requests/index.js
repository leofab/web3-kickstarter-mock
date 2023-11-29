import React, { Component } from 'react';
import Header from '../../../components/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Link from "../../../routes";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {GridColumn, GridRow, TableBody, TableHeader, TableRow} from "semantic-ui-react";
import Campaign from "../../../campaign";
import Table from "semantic-ui-react/dist/commonjs/collections/Table";
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

    render() {
        return (
            <Header>
                <Grid>
                    <GridRow>
                        <GridColumn width={14}>
                            <h3>Requests for Campaign nø  {this.props.address}</h3>
                        </GridColumn>
                        <GridColumn width={2}>
                            <Button
                                content={"Add Request"}
                                icon={"add circle"}
                                primary={true}
                                floated={"right"}
                                onClick={() => {
                                    Link.Router.pushRoute(`/campaigns/${this.props.address}/requests/new`);
                                }}
                            />
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Table singleLine>
                                <TableHeader>
                                    <TableRow>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Complete</Table.HeaderCell>
                                        <Table.HeaderCell>Value</Table.HeaderCell>
                                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.props.requests.map((request, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <Table.Cell>{request.description}</Table.Cell>
                                                <Table.Cell>{request.complete}</Table.Cell>
                                                <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
                                                <Table.Cell>{request.recipient}</Table.Cell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </GridColumn>
                    </GridRow>
                </Grid>

            </Header>
        );
    }
}

export default RequestsIndex;