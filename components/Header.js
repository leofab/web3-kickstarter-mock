import React from "react";
import { Menu, Container } from "semantic-ui-react";
import Head from "next/head";

const Header = ({ children }) => {
    return (
        <Container>
            <Head>
            <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            </Head>
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