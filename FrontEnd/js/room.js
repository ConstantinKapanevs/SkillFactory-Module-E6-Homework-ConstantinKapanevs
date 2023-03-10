const urlChatUsers = "http://127.0.0.1:8000/api/chatusers";
const urlRooms = "http://127.0.0.1:8000/api/rooms";
const aside = document.querySelector('.aside');
const nav = document.querySelector('.nav');
const header = document.querySelector('h2');
const deleteButton = document.querySelector('.delete-room-btn');
const addGuestButton = document.querySelector('.add-room-user-btn');


// const serverUrl = "wss://socketsbay.com/wss/v2/1/demo/";


let getCurrentUser = function () {
    const request = new XMLHttpRequest();
    request.open('get', urlChatUsers, true);
    request.send();

    request.onload = function () {
        let myData = JSON.parse(request.response);
        let currentUser = myData[0]['name']['username'];
        let currentUserAvatar = myData[0]['avatar'];
        let currentUserElement = document.createElement('div');
        let currentUserAvatarElement = document.createElement('img');
        currentUserElement.setAttribute('class', 'author');
        currentUserAvatarElement.setAttribute('class', 'avatar');
        currentUserAvatarElement.setAttribute('src', currentUserAvatar);
        currentUserElement.innerHTML = `Автор чата: ${currentUser}`;
        nav.prepend(currentUserAvatarElement);
        nav.prepend(currentUserElement);
    }
}

let getAllUsers = function () {
    // Очистка боковой панели от списка пользователей
    document.querySelectorAll('.users').forEach(elem => elem.remove())
    const aside = document.querySelector('.aside')

    let request = new XMLHttpRequest();
    request.open('get', urlChatUsers, true)
    request.send()

    request.onload = function () {
        let myData = JSON.parse(request.response);

        for (let i of myData) {
            if (myData.indexOf(i) != 0) {
                let chatUser = i['name'].username;
                let userElement = document.createElement('div');
                let addUserButton = document.createElement('button');
                userElement.setAttribute('class', 'users');
                addUserButton.className = 'add-users-btn';
                addUserButton.setAttribute('onclick', 'addUser(event)')
                userElement.innerHTML = chatUser;
                addUserButton.innerHTML = '+';
                aside.appendChild(userElement);
                userElement.appendChild(addUserButton);
            }
        }
    }
}

const getRoomUsers = function () {
    let userRequest = new XMLHttpRequest();
    userRequest.open('get', urlRooms + '/' + window.localStorage.getItem('currentRoomId'), true);
    userRequest.send();

    userRequest.onload = function () {
        let myData = JSON.parse(userRequest.response);
        let currentChatUsers = myData.users;

        nameRequest = new XMLHttpRequest();
        nameRequest.open('get', urlChatUsers, true)
        nameRequest.send();
        nameRequest.onload = function () {
            myNames = JSON.parse(nameRequest.response);
            for (i of myNames) {
                if (currentChatUsers.includes(i['id'])) {
                    console.log(i['name']['username'])
                    let userElement = document.createElement('div');
                    let removeUserButton = document.createElement('button');
                    let messageUserButton = document.createElement('button');
                    userElement.setAttribute('class', 'users');
                    removeUserButton.className = 'remove-users-btn';
                    removeUserButton.setAttribute('id', i['id'])
                    messageUserButton.className = 'message-users-btn';
                    removeUserButton.setAttribute('onclick', 'removeUser(event)')
                    messageUserButton.setAttribute('onclick', 'messageUser(event)')
                    userElement.innerHTML = i['name']['username'];
                    removeUserButton.innerHTML = '-';
                    messageUserButton.innerHTML = '->';
                    aside.appendChild(userElement);
                    userElement.appendChild(removeUserButton);
                    userElement.appendChild(messageUserButton);
                } else {
                    if (myNames.indexOf(i) != 0) {
                        let chatUser = i['name'].username;
                        let userElement = document.createElement('div');
                        let addUserButton = document.createElement('button');
                        userElement.setAttribute('class', 'users');
                        addUserButton.className = 'add-users-btn';
                        addUserButton.setAttribute('onclick', 'addUser(event)')
                        userElement.innerHTML = chatUser;
                        addUserButton.innerHTML = '+';
                        aside.appendChild(userElement);
                        userElement.appendChild(addUserButton);
                    }
                }
            }
        }
    }
}

const deleteChat = function () {
    let request = new XMLHttpRequest();
    request.open('delete', urlRooms + '/' + window.localStorage.getItem('currentRoomId'), true);
    request.send();
    request.onload = function () {
        window.location.href = "/html/index.html"
    }
}

const addGuest = function () {
    let request = new XMLHttpRequest();
    request.open('put', urlRooms + '/' + window.localStorage.getItem('currentRoomId'), true);
    request.send();
    request.onload = function () {
        window.location.href = "/html/index.html"
    }
}
const messageUser = function (event) {
    window.localStorage.setItem('messageTarget', event.currentTarget.parentElement.firstChild.textContent);
}

const removeUser = function (event) {
    let buttonId = event.currentTarget.id;
    let requestRoom = new XMLHttpRequest();
    requestRoom.open('get', urlRooms + '/' + window.localStorage.getItem('currentRoomId'), true);
    requestRoom.send();
    requestRoom.onload = function () {
        let usersData = requestRoom.response;
        usersData = JSON.parse(usersData);
        let usersList = usersData['users'];

        let requestRoomUpdate = new XMLHttpRequest();
        requestRoomUpdate.open('put', urlRooms + '/' + window.localStorage.getItem('currentRoomId'), true);
        let newUsersList = usersList.filter(function (item) {
            if (item != buttonId) { return item }
        })

        body = {
            "name": window.localStorage.getItem('currentRoomName'),
            "author": window.localStorage.getItem('currentUser'),
            "users": newUsersList

        }
        console.log(body)


    }



}

let getData = function () {
    getCurrentUser();
    getRoomUsers();

}
header.innerHTML = window.localStorage.getItem('currentRoomName')
document.addEventListener('DOMContentLoaded', getData);
deleteButton.addEventListener('click', deleteChat);