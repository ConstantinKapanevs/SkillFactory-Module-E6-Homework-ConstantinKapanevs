const url = "http://127.0.0.1:8000/api"
const urlUsers = "http://127.0.0.1:8000/api/users"
const urlChatUsers = "http://127.0.0.1:8000/api/chatusers"
const urlRooms = "http://127.0.0.1:8000/api/rooms"
const urlMessages = "http://127.0.0.1:8000/api/messages"

const aside = document.querySelector('.aside');
const nav = document.querySelector('.nav');
window.localStorage.setItem('messageTarget', 'Всех')


let getCurrentUser = function () {
    const request = new XMLHttpRequest();
    request.open('get', urlChatUsers, true);
    request.send();

    request.onload = function () {
        let myData = JSON.parse(request.response);
        let currentUserId = myData[0]['id'];
        let currentUser = myData[0]['name']['username'];
        let currentUserAvatar = myData[0]['avatar'];
        let currentUserElement = document.createElement('div');
        let currentUserAvatarElement = document.createElement('img');
        window.localStorage.setItem('currentUser', currentUserId);
        currentUserElement.setAttribute('class', 'author');
        currentUserAvatarElement.setAttribute('class', 'avatar');
        currentUserAvatarElement.setAttribute('src', currentUserAvatar);
        currentUserElement.innerHTML = `Текущий пользователь: ${currentUser}`;
        nav.prepend(currentUserAvatarElement);
        nav.prepend(currentUserElement);
    }
}

let getAllRooms = function () {
    // Очистка боковой панели от старой информации
    document.querySelectorAll('.rooms').forEach(elem => elem.remove());
    const request = new XMLHttpRequest();
    request.open('get', urlRooms, true);
    request.send();

    request.onload = function () {
        let myData = JSON.parse(request.response);
        for (i of myData) {
            let chatRoom = i['name'];
            window.localStorage.setItem(i['name'], i['id'])
            let roomElement = document.createElement('div');
            let roomButton = document.createElement('button');
            roomElement.setAttribute('class', 'rooms');
            roomButton.className = 'room-btn';
            roomButton.id = i['id'];
            roomButton.setAttribute('onclick', 'enterButton(event)');
            roomElement.innerHTML = chatRoom;
            roomButton.innerHTML = 'Enter';
            aside.appendChild(roomElement);
            roomElement.appendChild(roomButton);
        }
    }
}

let enterButton = function (event) {
    let currentRoomId = event.currentTarget.id;
    let currentRoomName = event.currentTarget.parentElement.firstChild.textContent;
    window.localStorage.setItem('currentRoomId', currentRoomId);
    window.localStorage.setItem('currentRoomName', currentRoomName);
    window.location.href = '/html/room.html'
}

let getData = function () {
    getAllRooms();
    getCurrentUser();
}


document.addEventListener('DOMContentLoaded', getData);
window.localStorage.removeItem('currentRoom')










