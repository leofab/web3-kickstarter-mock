import React, {Component} from 'react';
import Header from '../../../components/Header';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../../campaign';
import web3 from '../../../web3';
import {Router} from '../../../routes';

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            manager: summary[4],
            address: address
        };
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { address, manager } = this.props;
        const { description, value, recipient } = this.state;
        const campaign = Campaign(address);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({ loading: true, errorMessage: '' })
        try{
            if(manager.toLowerCase() !== accounts[0].toLowerCase()){
                const err = 'Only the manager can create a request';
                this.setState({ loading: false, errorMessage: err, value: '' })
                throw new Error('Only the manager can approve a request');
            }
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
                from: accounts[0]
            });
            this.setState({ loading: false, errorMessage: '', value: '' })
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (err) {
            this.setState({ loading: false, errorMessage: err.message, value: '' });
            console.log(err);
        }finally {
            this.setState({ loading: false})
        }
    }

    render() {
        const hasError = !!this.state.errorMessage;
        return (
            <Header>
                <h1>Campanha {this.props.address}</h1>
                {hasError && <Message error header="Oops!" content={this.state.errorMessage} />}
            <h3>Request New</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({recipient: event.target.value})}
                        />
                    </Form.Field>
                    <Button primary loading={this.state.loading}>Submit</Button>
                </Form>
            </Header>
        );
    }
}

export default RequestNew;