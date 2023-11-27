import React, { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';

const SucessfulMessageComponent = ({ showMessage, messageText }) => {
    const [visible, setVisible] = useState(showMessage);

    useEffect(() => {
        setVisible(showMessage);
        if (showMessage) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000); // 3000ms (3 seconds) - adjust the time as needed
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    return (
        <Message positive hidden={!visible}>
            <Message.Header>{messageText}</Message.Header>
        </Message>
    );
};

export default SucessfulMessageComponent;
