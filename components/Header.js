import React from "react";
import { Menu, Container } from "semantic-ui-react";
import {Link} from "../routes";

const Header = ({ children }) => {
    return (
        <Container>
        <Menu style={{ marginTop: "10px" }}>

            <Menu.Item>
                <Link route={"/"}>
                    CampanhaCoin
                </Link>
            </Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item>
                    <Link route={"/"}>
                        Campanhas
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link route={"/campaigns/new"}>
                        +
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
            {children}
        </Container>
    );
};

export default Header;