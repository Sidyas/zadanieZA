"use strict";

let currPage = 0;

// Function, that toggles list
function toggleMenu() {
    let list = document.getElementsByTagName('ul')[0];
    list.classList.toggle('hamburger');
}

// Function, that handles error if the json file is missing or invalid
function handleError(error) {
    let page = document.getElementsByClassName('container')[0];
    page.innerHTML = '';
    console.log(error);
    alert('Invalid/missing json file.');
}

// Updates list styling after switching list item
function updateList(index) {
    document.getElementsByTagName('li')[currPage].className = 'blueBackground';
    document.getElementsByTagName('li')[index].className = 'whiteBackground';
    currPage = index;
}

// Function for updating content on the right side
function updateContent(page) {

    // Reseting content and setting the title
    document.getElementsByClassName('centeredContent')[0].innerHTML = '';
    document.getElementsByTagName('h2')[1].textContent = page.title;

    // Checking, if page contains html
    if (page.html) {
        document.getElementsByClassName('centeredContent')[0].innerHTML += page.html;
    }

    // Checking, if page contains video
    if (page.video) {
        let videoElement = document.createElement('video');
        videoElement.setAttribute('controls', '');

        let sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', page.video);
        sourceElement.setAttribute('type', 'video/mp4');
        videoElement.appendChild(sourceElement);
        document.getElementsByClassName('centeredContent')[0].appendChild(videoElement);
    }
}

// Function, that creates list and creates events on those list items
function createPages(data) {
    const PAGES = data.pages;

    // Iterating pages, creating list items and events accordingly
    PAGES.forEach((page, index) => {
        let listItem = document.createElement('li');
        listItem.className = 'blueBackground';
        let listItemLink = document.createElement('a');
        listItemLink.setAttribute('href', '#');
        listItemLink.addEventListener('click', function(e) {
            e.preventDefault();
            updateContent(page);
            updateList(index);
        })
        let listItemLinkTextNode = document.createTextNode(page.title);
        listItemLink.appendChild(listItemLinkTextNode);
        listItem.appendChild(listItemLink);
        document.getElementsByTagName('ul')[0].appendChild(listItem);

        // Setting initial content page with first item
        if (index == 0) {
            updateContent(page);
            updateList(index);
        }
    });
    
}

// Loading the json file with error handling
fetch('./data.json')
    .then(res => res.json())
    .then(data => createPages(data))
    .catch(error => handleError(error));