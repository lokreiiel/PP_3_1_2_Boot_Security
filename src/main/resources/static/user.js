const users = 'http://localhost:8080/api/user';
let result = '';
const tableUser = (users) => {

    let allRole = '';
    users.roles.forEach(role => allRole += role.name.replace('ROLE_', '') + ' ');
    result += `<tr>
                        <td>${users.id}</td>
                        <td>${users.firstName}</td>
                        <td>${users.lastName}</td>
                        <td>${users.age}</td>
                        <td>${users.email}</td>
                        <td>${allRole}</td>
                   </tr>`

    document.getElementById('userOne-table').innerHTML = result;

}

fetch(users)
    .then(response => response.json())
    .then(data => tableUser(data))
