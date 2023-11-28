// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Add any custom meta tags, stylesheets, or scripts */}
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                    />
                    <link rel="stylesheet" type="text/css" href="css/semantic.min.css"/>
                        <script type="text/javascript" src="js/jquery-3.0.0.min.js"></script>
                        <script type="text/javascript" src="js/semantic.min.js"></script>

                        <link rel="stylesheet" type="text/css" href="dist/semantic-ui-alerts.css"/>
                            <script type="text/javascript" src="dist/semantic-ui-alerts.js"></script>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
