import React, {Component, useState} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from "../web3";
import Campaign from "../campaign";
import {Router} from "../routes";

class Contribute extends Component {

    state = {
        value: '',
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { address } = this.props;
        const { value, minimumContribution, errorMessage } = this.state;
        this.setState({ loading: true, errorMessage: '' })
        try{
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(address);
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.pushRoute(`/campaigns/${address}`);
        } catch (err) {
            this.setState({ loading: false, errorMessage: err.message, value: '' });
            console.log(err);
        }finally {
            this.setState({ loading: false, errorMessage: '', value: '' })
        }
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Button loading={this.state.loading} primary>Contribute!</Button>
            </Form>
        );
    }
}

export default Contribute;