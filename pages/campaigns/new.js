import React, { Component } from 'react';
import Header from '../../components/Header';
import { Form, Button, Input, Message } from 'semantic-ui-react';

class CampaignNew extends Component {
    render() {
        return (
            <Header>
                <h1>Create a new Campaign</h1>
                <Form>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input label="wei" labelPosition="right" />
                    </Form.Field>
                    <Button primary>Create!</Button>
                </Form>
            </Header>
        );
    }
}

export default CampaignNew;