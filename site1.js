import Server from "./server.class.js";

const app = new Server(3000);

// Definir les routes
    app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  this.config.app.post('/login', async (req, res) => {
    try {
        const jwtToken = await createJWT();
        res.json({ token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

this.config.app.post('/protected', async (req, res) => {
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
      const secret = config.jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI');
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