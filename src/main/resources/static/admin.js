const admin = 'http://localhost:8080/api/admin';
editFormSub = document.getElementById('editForm');
deleteFormSub = document.getElementById('deleteForm');
addNewUser = document.getElementById('add')
const modalArt = new bootstrap.Modal(document.getElementById('editModal'))
const modalDel = new bootstrap.Modal(document.getElementById('deleteModal'))
let result = '';


//Таблица всех юзеров

const table = (users) => {
    users.forEach(user => {
        let allRole = '';
        user.roles.forEach(role => allRole += role.name.replace('ROLE_', '') + ' ');
        result += `<tr>
                
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${allRole}</td>
                   
                        <td>
                         <button type="button" class="btn btn-info" data-action="edit" data-toggle="modal"
                             data-target="#editModal" id="editButton" data-uid=${user.id} onclick="editModal(${user.id})">Edit
                         </button>
                         </td>
                         <td>
                         <button type="button" class="btn btn-danger" data-action="delete" data-toggle="modal"
                             data-target="#deleteModal" id="deleteButton" data-uid=${user.id} onclick="deleteModal(${user.id})">Delete
                         </button>
                         </td>
                  
                   </tr>`

    })
    document.getElementById('users-table').innerHTML = result;

}

fetch(admin)
    .then(response => response.json())
    .then(data => table(data))


//Добавить юзера

if (addNewUser) {
    addNewUser.addEventListener('submit', (e) => {
        e.preventDefault()

        const roleId = document.getElementById('addRoles')
        const roles = [];
        for (let i = 0; i < roleId.options.length; i++) {
            if (roleId.options[i].selected) {
                roles.push({
                    id: roleId.options[i].value,
                    name: roleId.options[i].text
                });
            }
        }
        fetch(admin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                age: document.getElementById('age').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                roles: roles

            })
        })
            .then(res => res.json())
            .then(data => {

                const dataArr = [];
                dataArr.push(data)
                table(dataArr)
                addNewUser.reset()
                $('[href="#nav-home"]').tab('show');
            })
    })
}

//Modal edit

function editModal(id) {
    let editForm = document.forms["editForm"];

    fetch(`http://localhost:8080/api/admin/` + id)
        .then(response => {
        response.json()
            .then(u => {
                editForm.elements.id.value = u.id;
                editForm.firstName.value = u.firstName;
                editForm.lastName.value = u.lastName;
                editForm.age.value = u.age;
                editForm.email.value = u.email;
                editForm.password.value = u.password;
                editForm.roles.value = u.roles;

                let rolesAll = [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}];
                let selectElement = document.getElementById('rolesEdit');
                selectElement.innerHTML = '';

                rolesAll.forEach(role => {
                    let option = document.createElement('option');
                    option.value = role.id;
                    option.selected = u.roles.some(usRole => usRole.id === role.id);

                    option.text = role.name === ('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
                    selectElement.appendChild(option);
                });
                modalArt.show()

            })

    })
}


//Edit


editFormSub.addEventListener('submit', (e) => {
    e.preventDefault();
    const roleIdE = document.getElementById('rolesEdit')
    const rolesE = [];
    for (let i = 0; i < roleIdE.options.length; i++) {
        if (roleIdE.options[i].selected) {
            rolesE.push({
                name: roleIdE.options[i].text
            });
        }
    }
    const uid = document.getElementById('idEdit').value
    fetch(`http://localhost:8080/api/admin/${uid}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: uid,
            firstName: document.getElementById('firstNameEdit').value,
            lastName: document.getElementById('lastNameEdit').value,
            age: document.getElementById('ageEdit').value,
            email: document.getElementById('emailEdit').value,
            password: document.getElementById('passwordEdit').value,
            roles: rolesE
        })
    })
        .then(res => res.json())
        .then(() => {
            $('#editModal').modal('hide')
            result = ''
            fetch(admin)
                .then(res => res.json())
                .then(data => table(data))
        })
})


//Modal delete

function deleteModal(id) {
    let deleteForm = document.forms["deleteForm"];
    fetch(`http://localhost:8080/api/admin/` + id)
        .then(response => {
        response.json()
            .then(u => {
                deleteForm.elements.id.value = u.id;
                deleteForm.firstName.value = u.firstName;
                deleteForm.lastName.value = u.lastName;
                deleteForm.age.value = u.age;
                deleteForm.email.value = u.email;
                deleteForm.password.value = u.password;
                deleteForm.roles.value = u.roles;
                let rolesAllD = [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}];

                let selectElementD = document.getElementById('rolesDelete');
                selectElementD.innerHTML = '';
                rolesAllD.forEach(roleD => {
                    let optionD = document.createElement('option');
                    optionD.value = roleD.id;
                    optionD.selected = u.roles.some(usRole => usRole.id === roleD.id);

                    optionD.text = roleD.name === 'ROLE_ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER';
                    selectElementD.appendChild(optionD);
                });
                modalDel.show()
            })
    })
}

//Delete

deleteFormSub.addEventListener('submit', (e) => {
    e.preventDefault();
    const roleId = document.getElementById('rolesDelete')
    const roles = [];
    for (let i = 0; i < roleId.options.length; i++) {
        if (roleId.options[i].selected) {
            roles.push({
                id: roleId.options[i].value,
                name: roleId.options[i].text
            });
        }
    }
    const uid = document.getElementById('idDelete').value
    fetch(`http://localhost:8080/api/admin/${uid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('idDelete').value,
            firstName: document.getElementById('firstNameDelete').value,
            lastName: document.getElementById('lastNameDelete').value,
            age: document.getElementById('ageDelete').value,
            email: document.getElementById('emailDelete').value,
            password: document.getElementById('passwordDelete').value,
            roles: roles
        })
    })
        .then(() => {
            $('#deleteModal').modal('hide')
            result = ''
            fetch(admin)
                .then(res => res.json())
                .then(data => table(data))
        })
})
