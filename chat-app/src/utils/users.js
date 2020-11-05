const users = [

];
// addUser, removeUser, getUser, getUsersInRoom
const addUser = ({id, username, room}) => {
    // clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        };
    }

    // Store user 
    const user = {id, username, room}
    users.push(user);
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

addUser({
    id: 01,
    username: 'abu',
    room: 'general'
});
addUser({
    id: 02,
    username: 'abu2',
    room: 'general'
});
addUser({
    id: 03,
    username: 'abu3',
    room: 'general1'
});

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter((user) => user.room === room)
}

//const user = getUser(02)
//const userList = getUsersInRoom('general1')
//
//console.log(user);
//console.log(userList);

//console.log(users);

//const removedUser = removeUser(01)

//const res = addUser({
//    id: 01,
//    username: 'Abu',
//    room: 'general'
//});
//
//console.log(res);
//console.log(removedUser);
//console.log(users);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}