import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

class server {
    constructor() {
        this.express = express;
        this.app = this.express();
        this.port = 3000;

        // Middleware pour parse JSON bodies
        this.app.use(express.json());

        //allow cors
        this.app.use(cors())

        // Use session middleware
        this.app.use(session({ secret: 'this is a secret', resave: false, saveUninitialized: false }));
          
          this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
          });

          // Initialize Passport and restore authentication state, if any, from the session.
          this.app.use(passport.initialize());
          this.app.use(passport.session());

          passport.serializeUser(function(user, done) {
            done(null, user.id);
          });

          passport.deserializeUser(function(id, done) {
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
        
        this.app.post('/protected', async (req, res) => {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        
            //decoupage du token
            const token = authHeader.split(' ')[1];
            try {
                // Verify and decode JWT token here
                // Example:
                // const decodedToken = await jose.JWT.verify(token, secret);
                // If verification fails, return res.status(401).json({ error: 'Unauthorized' });
                res.json({ message: 'Protected route accessed successfully!' });
            } catch (error) {
                console.error(error);
                res.status(401).json({ error: 'Unauthorized' });
            }
        });

        // Fonction pour creer un JWT
        async function createJWT() {
          try {
              const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI');
              const jwtToken = await new jose.EncryptJWT({ 'urn:example:claim': true })
                  .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
                  .setIssuedAt()
                  .setIssuer('urn:example:issuer')
                  .setAudience('urn:example:audience')
                  .setExpirationTime('4s')
                  .encrypt(secret);
              return jwtToken;
          } catch (error) {
              throw error;
          }
      }
      
      function ensureAuthenticated(req, res, next) {
          if (req.isAuthenticated()) { return next(); }
          res.redirect('/login')
        }
    }
}

export default server;


