import React, {Component, useState} from 'react';
import Header from '../../components/Header';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from "../../factory";
import web3 from "../../web3";

import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (e) =>{
        e.preventDefault();
        this.setState({ loading: true, errorMessage: '' })
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampanha(this.state.minimumContribution).send({
                from: accounts[0]
            });
            await Router.pushRoute('/?success=true');
        } catch (err) {
            this.setState({ loading: false, errorMessage: err.message })
            console.log(err);
        }finally {
            this.setState({ loading: false })
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
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Header>
        );
    }
}

export default CampaignNew;