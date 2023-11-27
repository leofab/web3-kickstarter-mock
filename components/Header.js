import React from "react";
import { Menu, Container } from "semantic-ui-react";

const Header = ({ children }) => {
    return (
        <Container>
        <Menu style={{ marginTop: "10px" }}>
            <Menu.Item>CampanhaCoin</Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item>Campaigns</Menu.Item>
                <Menu.Item>+</Menu.Item>
            </Menu.Menu>
        </Menu>
            {children}
        </Container>
    );
};

export default Header;