
// defining the show register Controller
const showregisterController = (req, res) => {
    try {
        return res.status (200).send (
            `
              <!doctype html>
                <html>
                    <head>
                        <title>ShowRegister</title>
                        <meta charset='utf-8'>
                        <meta name='viewport' content='width=device-width,initial-scale=1.0'>
                    </head>
                    <body>
                        <h3>Please Register!</h3>
                        <form method='POST', action='/api/register'>
                            <input type='text' placeholder='username' name='username'>
                            <br>
                            <input type='email' placeholder='email' name='email'>
                            <br>
                            <input type='password' placeholder='password' name='password'>
                            <br>
                            <button type='submit'>register</button>
                        </form>
                        <a href='/api/login'>Login</a>
                    </body>
                </html>
            `
        )
    }
    catch (error) {
        return res.status (400).send (
            `
                <!doctype html>
                <html>
                    <head>
                        <title>Error</title>
                        <meta charset='utf-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    </head>
                    <body>
                        Error ${error.message}
                    </body>
                </html>
            `
        )
    }
}

// exporting the login Controller
module.exports = {
    showregisterController
}