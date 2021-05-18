export default ({ markup, css }) => {
	return `
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src *; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: 'unsafe-inline'; connect-src * 'unsafe-inline'; frame-src *;" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <title> MERN from scrath </title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    height: 110vh;
                }
                #root {
                    height: 100%;
                }
                a{
                    text-decoration: none
                  }
            </style>
            <style id="jss-server-side">${css}</style>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
    </html>

    `
}
