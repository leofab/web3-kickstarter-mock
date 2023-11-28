import React, { Component } from 'react';
import Header from '../../../components/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Link from "../../../routes";
class RequestsIndex extends Component {

    static async getInitialProps(props) {
        const address = props.query.address;
        return { address: address };

    }
    render() {
        return (
            <Header>
            <h3>Requests List</h3>
                <Button
                    content={"Adicionar Request"}
                    icon={"add circle"}
                    primary={true}
                    floated={"top"}
                    onClick={() => {
                        Link.Router.pushRoute(`/campaigns/${this.props.address}/requests/new`);
                    }}
                />
            </Header>
        );
    }
}

export default RequestsIndex;