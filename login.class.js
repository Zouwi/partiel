
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            /*VALEURS */
            const login = document.getElementById('username').value;
            const password = document.getElementById('password').value;

                //create a JSON with login and password*
                const data = { "login": login, "password" : password };
        
            /*ENVOI DU JWT */
            fetch('http://localhost:3000/login', { // replace with your server URL
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    
                },
                body: JSON.stringify(data)                
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.token) {
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
    
