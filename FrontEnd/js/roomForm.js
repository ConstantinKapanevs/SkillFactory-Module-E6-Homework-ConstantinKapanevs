const urlRooms = "http://127.0.0.1:8000/api/rooms";
const urlChatUsers = "http://127.0.0.1:8000/api/chatusers";
const nav = document.querySelector('.nav');
const roomForm = document.getElementById('roomForm');
const request = new XMLHttpRequest();

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
        currentUserElement.innerHTML = `Текущий пользователь: ${currentUser}`;
        nav.prepend(currentUserAvatarElement);
        nav.prepend(currentUserElement);
    }
}

let newRoom = function (e) {
    e.preventDefault();
    const request = new XMLHttpRequest();
    let myData = new FormData(roomForm);
    let newRoom = myData.get('name');
    let roomAuthor = window.localStorage.getItem('currentUser');
    let body = {
        "name": newRoom,
        "author": roomAuthor
    }
    body = JSON.stringify(body);

    request.open('post', urlRooms, true);
    request.setRequestHeader("Content-type", "application/json")
    request.send(body);
    request.onload = function () {
        window.location.href = "/html/index.html"
    }
}


document.addEventListener('DOMContentLoaded', getCurrentUser);
roomForm.addEventListener('submit', newRoom);



