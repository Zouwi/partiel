fetch('http://localhost:3000/protected', { // replace with your server URL
method: 'POST',
headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
}
})
.then(response => response.json())
.then(data => {
console.log("infos", data);
const protectedDataDiv = document.getElementById('protected-data');
    protectedDataDiv.innerHTML = `
        <p>Login: ${data.login}</p>
        <p>Password: ${data.password}</p>
    `;

})
.catch((error) => {
console.error('Error:', error);
});