const token = dfvzaifhzeiugfbiegn;

const secret = ytvzefhzeufvbzefh;

if (token === secret) {
    console.log('Token is equal to secret');
} else {
    console.log('Token is not equal to secret');
}

if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized2' });
}

token = authHeader.split(' ')[1];
try {
    const decodedToken = await jose.jwtDecrypt(token, jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'));
    console.log(decodedToken);
    res.json({ message: 'Protected route accessed successfully!' });
} catch (error) {
    console.error(error);
    res.status(402).json({ error: 'Unauthorized' });
}