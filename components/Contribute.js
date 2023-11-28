import React, {Component, useState} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from "../web3";
import Campaign from "../campaign";
import SucessfulMessageComponent from '../components/SucessfulMessage';
import {Router} from "../routes";

class Contribute extends Component {

    state = {
        value: '',
        minimumContribution: '',
        errorMessage: '',
        loading: false,
        showMessage: false,
        messageText: ''
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { address } = this.props;
        const { value } = this.state;
        this.setState({ loading: true, errorMessage: '' })
        try{
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(address);
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.pushRoute(`/campaigns/${address}/?success=true`);
        } catch (err) {
            this.setState({ loading: false, errorMessage: err.message, value: '' });
            console.log(err);
        }finally {
            this.setState({ loading: false, errorMessage: '', value: '' })
        }
    }
    componentDidMount() {
        // Check if success message needs to be shown after redirect from CampaignNew
        const params = new URLSearchParams(window.location.search);
        if (params.get('success')) {
            // After the navigation, set state to show the message
            this.setState({ showMessage: true, messageText: 'Your contribution was successful!' });

            // Hide the message after a certain time (optional)
            setTimeout(() => {
                this.setState({ showMessage: false, messageText: '' });
            }, 3000); // 3000ms (3 seconds) - adjust the time as needed
        }
    }
    render() {
        const hasError = !!this.state.errorMessage;
        return (
            <Form onSubmit={this.onSubmit}>
                {hasError && <Message error header="Oops!" content={this.state.errorMessage} />}
                <SucessfulMessageComponent showMessage={this.state.showMessage} messageText={this.state.messageText} />
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