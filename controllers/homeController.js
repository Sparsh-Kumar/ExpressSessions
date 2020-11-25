
// defining the home controller
const homeController = (req, res) => {
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
                        <!-- present diffrent set of links depending on the user is logged in or not -->
                        <h1>Welcome to Home</h1>
                        ${req.session.userId ? `
                            <a href='/api/dashboard'>dashboard</a>
                            <form method='POST' action='/api/logout'>
                                <button type='submit'>logout</button>
                            </form>
                        `: `
                            <a href='/api/login'>login</a>
                            <a href='/api/register'>register</a>
                        `}

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
                        <h3 style='color: red'>Error ${error.message} </h2>
                    </body>
                </html>
            `
        )
    }
}

// exporting the home Controller
module.exports = {
    homeController
}