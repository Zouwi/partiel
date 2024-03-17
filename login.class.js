class login {
    constructor(){
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            /*VALEURS */
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
        
            /*ENVOI DU JWT */
            fetch('http://localhost:3000/login', { // replace with your server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            })
            .then(response => response.json())
            .then(data => {
                console.log();
                if (data.token) {
                    /* STOCKAGE DU JTW DANS LOCALSTORAGE*/
                    localStorage.setItem('jwt', data.token);
                    console.log('Login successful');
                    window.location.href = '/protected.html';
                } else {
                    console.log('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
}
