import React, { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import $ from 'jquery'; // Import jQuery
import 'semantic-ui-css/semantic.min.css';

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

// import React, { useEffect } from 'react';
// import $ from 'jquery'; // Import jQuery
// import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
//
// const SucessfulMessageComponent = ({ showMessage, messageText }) => {
//     useEffect(() => {
//         if (showMessage) {
//             // Load CSS files dynamically
//             const linkSemanticCss = document.createElement('link');
//             linkSemanticCss.rel = 'stylesheet';
//             linkSemanticCss.type = 'text/css';
//             linkSemanticCss.href = '/path/to/semantic.min.css';
//             document.head.appendChild(linkSemanticCss);
//
//             const linkAlertsCss = document.createElement('link');
//             linkAlertsCss.rel = 'stylesheet';
//             linkAlertsCss.type = 'text/css';
//             linkAlertsCss.href = '../suialert/dist/semantic-ui-alerts.css';
//             document.head.appendChild(linkAlertsCss);
//
//             // Load JavaScript files dynamically
//             const scriptJQuery = document.createElement('script');
//             scriptJQuery.src = '../suialert/js/jquery-3.0.0.min.js';
//             document.body.appendChild(scriptJQuery);
//
//             const scriptSemantic = document.createElement('script');
//             scriptSemantic.src = '../suialert/css/semantic.min.js';
//             document.body.appendChild(scriptSemantic);
//
//             const scriptAlerts = document.createElement('script');
//             scriptAlerts.src = '../suialert/dist/semantic-ui-alerts.js';
//             document.body.appendChild(scriptAlerts);
//
//             // Handle loading complete event for the scripts
//             scriptAlerts.onload = () => {
//                 // Use $.suiAlert when the alerts script is loaded
//                 $.suiAlert({
//                     title: 'Success Message',
//                     description: messageText,
//                     type: 'success',
//                     time: '3',
//                     position: 'top-right',
//                 });
//             };
//
//             return () => {
//                 // Clean up by removing dynamically added elements to avoid memory leaks
//                 document.head.removeChild(linkSemanticCss);
//                 document.head.removeChild(linkAlertsCss);
//                 document.body.removeChild(scriptJQuery);
//                 document.body.removeChild(scriptSemantic);
//                 document.body.removeChild(scriptAlerts);
//             };
//         }
//     }, [showMessage, messageText]);
//
//     return null; // This component doesn't render anything directly
// };
//
// export default SucessfulMessageComponent;

