import React, { Component } from 'react';
import Header from '../../../components/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Link from "../../../routes";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {GridColumn, GridRow, Message, TableBody, TableHeader, TableRow} from "semantic-ui-react";
import Campaign from "../../../campaign";
import Table from "semantic-ui-react/dist/commonjs/collections/Table";
import web3 from "../../../web3";
import {Router} from "../../../routes";
class RequestsIndex extends Component {

    state= {
        requests: [],
        id: 0,
        errMessage: ''
    }

    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            manager: summary[4],
            approversCount: summary[3].toString(),
            address: address,
            recipient: summary[5]
        };
    }

    async componentDidMount() {
        const campaign = Campaign(this.props.address);
        const requestNum = await campaign.methods.getRequestsCount().call();
        let requests = [];
        for(let i = 0; i < requestNum; i++){
            const request = await campaign.methods.requests(i).call();
            requests.push(request);
        }
        this.setState({requests});
    }

    routeToCampaign = () => {
        Link.Router.pushRoute(`/campaigns/${this.props.address}`);
    }

    onApprove = async (index) => {
        const { manager } = this.props;
        const campaign = Campaign(this.props.address);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const bool = await campaign.methods.contributers(accounts[0]).call();
        console.log(bool)
        this.setState({errMessage: ''});
        try {
            if(!bool){
                let error = 'Only a contributer can approve a request, donate to the Campaign to become a contributer';
                this.setState({errMessage: error});
                throw new Error('Only a contributer can approve a request, donate to the Campaign to become a contributer');
            }
            const requestID = index;
            await campaign.methods.approveRequest(requestID).send({
                from: accounts[0]
            });
            await Router.reload()
        }catch (err){
            this.setState({errMessage: err.message});
        }
    }

    onFinalize = async (index) => {
        const { manager } = this.props;
        const campaign = Campaign(this.props.address);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({errMessage: ''});
        try {
            if(manager.toLowerCase() !== accounts[0].toLowerCase()){
                let error = 'Only the manager can finalize a request';
                this.setState({errMessage: error});
                throw new Error('Only the manager can finalize a request');
            }
            const requestID = index;
            await campaign.methods.finalizeRequest(requestID).send({
                from: accounts[0],
                to: this.props.recipient
            });
            await Router.reload()
        }catch (err){
            this.setState({errMessage: err.message});
        }
    }

    render() {
        const hasError = !!this.state.errMessage;
        return (
            <Header>
                <Grid>
                    <GridRow>
                        <GridColumn width={14}>
                            <h3>Requests for Campaign nø  <a onClick={this.routeToCampaign} > {this.props.address}</a></h3>
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
                            {hasError && <Message error header="Oops!" content={this.state.errMessage} />}
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Table singleLine>
                                <TableHeader>
                                    <TableRow>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Complete</Table.HeaderCell>
                                        <Table.HeaderCell>Value</Table.HeaderCell>
                                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                                        <Table.HeaderCell>Approvers</Table.HeaderCell>
                                        <Table.HeaderCell>Approve</Table.HeaderCell>
                                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.state.requests.map((request, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <Table.Cell>{index+1}</Table.Cell>
                                                <Table.Cell>{request.description}</Table.Cell>
                                                <Table.Cell>{JSON.stringify(request.complete)}</Table.Cell>
                                                <Table.Cell>{web3.utils.fromWei(request.value, 'ether')} eth</Table.Cell>
                                                <Table.Cell>{request.recipient}</Table.Cell>
                                                <Table.Cell>{parseInt(request.approvalCount)}/{this.props.approversCount}</Table.Cell>
                                                <Table.Cell>
                                                    <Button
                                                        color={'green'}
                                                        basic
                                                        onClick={()=>this.onApprove(index)}
                                                    >Approve</Button>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button color={'red'}
                                                            basic
                                                            onClick={()=>this.onFinalize(index)}
                                                    >Finalize</Button>
                                                </Table.Cell>
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