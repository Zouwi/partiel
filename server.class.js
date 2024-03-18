import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import * as jose from 'jose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

class Server {
    constructor(port) {
        this.port = port;

        this.express = express;
        this.app = this.express();
        this.cors = cors;
        this.passport = passport;
        this.session = session;
        this.jose = jose;
        this.secretJwt = new TextEncoder().encode('julien');

        console.log("WOPUF");
        console.log(this.secretJwt);
        console.log("WOPUF");
        const secret2 = this.jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI');
        console.log("WOPUF");
        console.log(secret2);
        console.log("WOPUF");
        //body parser
        this.app.use(bodyParser.json());
        this.app.use(this.express.urlencoded({ extended: true }));

        //allow cors
        this.app.use(this.cors())

        // Use session middleware
        this.app.use(this.session({ secret: secret2, resave: false, saveUninitialized: false }));
          
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
          });

          // Definir les routes
          this.app.get('/', (req, res) => {
            res.send('Hello, world!');
          });

          this.app.post('/login', async (req, res) => {
            if (req.body.login === 'admin' && req.body.password === 'admin')
            {
                try {
                    console.log(req.body);
                    const jwtToken = createJWT();
                    res.json({ token: jwtToken });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal server error' });
                }
            }
            else {
                res.status(401).json({ error: 'Unauthorized' });
            }

            // try {
            //     const jwtToken = await createJWT();
            //     res.json({ token: jwtToken });
            // } catch (error) {
            //     console.error(error);
            //     res.status(500).json({ error: 'Internal server error' });
            // }
        });
        
        this.app.use('/protected', async (req, res) => {
            const authHeader = req.headers.authorization;
            console.log('headers');
            console.log(authHeader);
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        
            //decoupage du token
            const token = authHeader.split(' ')[1];
            console.log('token ' + token);
            try {
                // Verify and decode JWT token here
                // Example:
                // RED JOSE
                console.log('%c JOSE ', 'background: #222; color: #bada55');
                
                //verifier le token avec jsonwebtoken
                const decodedToken = jwt.verify(token, secret2);

                //vérifier le token
                //const decodedToken = this.jose.jwtVerify(token, secret2);
                //const decodedToken = this.jose.jwtDecrypt(token, this.secretJwt);

                //const decodedToken = this.jose.jwtVerify(token, this.secretJwt);
                //console.log(decodedToken);
                if (decodedToken) {

                    //res.body = decodedToken;
                    res.json({ login: "admin", password: "admin" });
                }
            } catch (error) {
                console.error(error);
                res.status(401).json({ error: 'Unauthorized' });
            }
        });

        function createJWT() {
            const payload = {
                // Ajoutez les données que vous souhaitez inclure dans le payload du JWT
                // Par exemple :
                login: 'utilisateur',
                role: 'admin'
            };
        
            // Options du JWT, y compris l'expiration et la clé secrète
            const options = {
                expiresIn: '4h', // Durée de validité du token (4 heures)
                issuer: 'partiel', // Emetteur du JWT
                audience: 'web_app', // Audience du JWT
            };
        
            // Créez le JWT en utilisant la fonction sign() de jsonwebtoken
            const token = jwt.sign(payload, secret2, options);
        
            return token;
        }

        // Fonction pour creer un JWT
        /*async function createJWT() {
            try {
                const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
                    .setProtectedHeader({ alg: 'HS256' }) // Algorithme de signature
                    .setIssuedAt() // Date d'émission (maintenant par défaut)
                    .setIssuer('urn:example:issuer') // Emetteur du JWT
                    .setAudience('urn:example:audience') // Audience du JWT
                    .setExpirationTime('4h') // Date d'expiration (4 heures après l'émission)
                    .sign(secret2); // Clé secrète utilisée pour signer le JWT
        
                return jwt;
            } catch (error) {
                throw error;
            }
        }
      
      function ensureAuthenticated(req, res, next) {
          if (req.isAuthenticated()) { return next(); }
          res.redirect('/login')
        }*/
    }
}

export default Server;


