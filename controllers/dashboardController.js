

// defining the dashboard controller
const dashboardController = (req, res) => {
    try {
        return res.status (200).send (
            `
                <!doctype html>
                <html>
                    <head>
                        <title>Dashboard</title>
                        <meta charset='utf-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    </head>
                    <body>
                        <h3>Email: ${req.user.email}</h3>
                        <h3>Username: ${req.user.username}</h3>
                        <h3>Password Hash: ${req.user.password}</h3>
                    </body>
                </html>
            `
        )
    }
    catch (error) {
        return res.status (401).send (
            `
                <!doctype html>
                <html>
                    <head>
                        <title>Error</title>
                        <meta charset='utf-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    </head>
                    <body>
                        Error: ${error.message}
                    </body>
                </html>
            `
        )
    } 
}

// exporting the dashboard controller
module.exports = {
    dashboardController
}