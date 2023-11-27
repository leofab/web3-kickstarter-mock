import React, {Component, useState} from 'react';
import Header from '../../components/Header';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from "../../factory";
import web3 from "../../web3";

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: ''
    };

    onSubmit = async (e) =>{
        e.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            });
        } catch (err) {
            this.setState({ errorMessage: err.message })
            console.log(err);
        }

    }
    render() {
        const hasError = !!this.state.errorMessage;
        return (
            <Header>
                <h1>Create a new Campaign</h1>
                <Form onSubmit={this.onSubmit} error={hasError}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContribution: event.target.value})}/>
                    </Form.Field>
                    {hasError && <Message error header="Oops!" content={this.state.errorMessage} />}
                    <Button primary>Create!</Button>
                </Form>
            </Header>
        );
    }
}

export default CampaignNew;