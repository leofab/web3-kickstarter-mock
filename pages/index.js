import React from "react";
import factory from "../factory";
import {Button, Card, Menu} from "semantic-ui-react";
import Header from "../components/Header";

class CampaignIndex extends React.Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };

    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }
    render() {
        return (

            <div>
                <Header />
            <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            <h3>Open Campaigns</h3>
            <Button content={"Create Campaign"} icon={"add circle"} primary={true} floated={"right"} />
            {this.renderCampaigns()}
            </div>
        );
    }
}

export default CampaignIndex;