import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import * as jose from 'jose';

class Server2 {
    constructor(port) {
        this.port = port;

        this.express = express;
        this.app = this.express();
        this.cors = cors;
        this.passport = passport;
        this.session = session;
        this.jose = jose;

        // Middleware pour parse JSON bodies
        this.app.use(this.express.json());

        //allow cors
        this.app.use(this.cors())

        // Use session middleware
        this.app.use(this.session({ secret: 'this is a secret', resave: false, saveUninitialized: false }));
          
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
          });

          // Initialize Passport and restore authentication state, if any, from the session.
          this.app.use(this.passport.initialize());
          this.app.use(this.passport.session());

          this.passport.serializeUser(function(user, done) {
            done(null, user.id);
          });

          this.passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });

          // Definir les routes
          this.app.get('/', (req, res) => {
            res.send('Hello, world!');
          });

          this.app.post('/login', async (req, res) => {
            try {
                const jwtToken = await createJWT();
                res.json({ token: jwtToken });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        
        this.app.use('/protected2', async (req, res) => {
            const authHeader = req.headers.authorization;
            console.log('authHeader', authHeader);
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Unauthorized2' });
            }
        
            const token = authHeader.split(' ')[1];
            try {
                // Verify and decode JWT token here
                // Example:
                const decodedToken = await this.jose.jwtDecrypt(token, this.jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'));
                console.log(decodedToken);
                res.json({ message: 'Protected route accessed successfully!' });
            } catch (error) {
                console.error(error);
                res.status(402).json({ error: 'Unauthorized' });
            }
        });
    }
}

export default Server2;


