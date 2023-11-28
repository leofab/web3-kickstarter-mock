import React from "react";
import factory from "../factory";
import {Button, Card, Menu} from "semantic-ui-react";
import Header from "../components/Header";
import {Router} from "../routes";
import SucessfulMessageComponent from '../components/SucessfulMessage';
import { Link } from '../routes';

class CampaignIndex extends React.Component {
    state ={
        loading: false,
        showMessage: false,
        messageText: ''
    }

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };

    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        View Campaign
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items.reverse()} />;
    }
    handleCreateCampaignClick = async () => {
        this.setState({ loading: true });
        await Router.pushRoute('/campaigns/new');
    };
    componentDidMount() {
        // Check if success message needs to be shown after redirect from CampaignNew
        const params = new URLSearchParams(window.location.search);
        if (params.get('success')) {
            // After the navigation, set state to show the message
            this.setState({ showMessage: true, messageText: 'Your campaign was created successfully!' });

            // Hide the message after a certain time (optional)
            setTimeout(() => {
                this.setState({ showMessage: false, messageText: '' });
            }, 3000); // 3000ms (3 seconds) - adjust the time as needed
        }
    }
    render() {
        return (

            <Header>
                <SucessfulMessageComponent showMessage={this.state.showMessage} messageText={this.state.messageText} />

            <h3>Open Campaigns</h3>
            <Button
                content={"Create Campaign"}
                icon={"add circle"}
                primary={true}
                floated={"right"}
                onClick={this.handleCreateCampaignClick}
                loading={this.state.loading}
            />
            {this.renderCampaigns()}

            </Header>
        );
    }
}

export default CampaignIndex;