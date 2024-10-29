// Define playlist URLs globally
const playlistUrls = {
    lofi: 'https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM',
    allSongs: 'https://open.spotify.com/embed/playlist/57qZG76cEzwPsScPdrKCFX?utm_source=generator',
    classical: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWEJlAGA9gs0'
};

// Function to change playlist
function changePlaylist() {
    // Get current playlist from localStorage or default to 'lofi'
    let currentPlaylist = localStorage.getItem('currentPlaylist') || 'lofi';

    // Determine next playlist
    let nextPlaylist;
    switch(currentPlaylist) {
        case 'lofi':
            nextPlaylist = 'allSongs';
            break;
        case 'allSongs':
            nextPlaylist = 'classical';
            break;
        case 'classical':
            nextPlaylist = 'lofi';
            break;
        default:
            nextPlaylist = 'lofi';
    }

    // Update localStorage
    localStorage.setItem('currentPlaylist', nextPlaylist);

    // Get the iframe element
    const spotifyPlayer = document.getElementById('spotifyPlayer');

// Update the iframe source
if (spotifyPlayer) {
spotifyPlayer.src = playlistUrls[nextPlaylist];
}
}
// Theme functionality
function toggleTheme() {
    
const body = document.body;
if (body.classList.contains('dark-theme')) {
body.classList.remove('dark-theme');
body.classList.add('transparent-theme');
localStorage.setItem('theme', 'transparent');
} else if (body.classList.contains('transparent-theme')) {
body.classList.remove('transparent-theme');
localStorage.setItem('theme', 'light');
} else {
body.classList.add('dark-theme');
localStorage.setItem('theme', 'dark');
}
}

// Load saved theme preference
window.addEventListener('load', () => {
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
document.body.classList.add('dark-theme');
} else if (savedTheme === 'transparent') {
document.body.classList.add('transparent-theme');
}


// Function to load saved music preference
function loadMusicPreference() {
const savedPlaylist = localStorage.getItem('currentPlaylist') || 'lofi';
const spotifyPlayer = document.getElementById('spotifyPlayer');
if (spotifyPlayer) {
spotifyPlayer.src = playlistUrls[savedPlaylist];
}
}

document.addEventListener('DOMContentLoaded', function() {
    loadMusicPreference();
});

});


// Save and Load Timers
let timers = [];
let timerIdCounter = 0;


function saveTimers() {
const timerData = [];
document.querySelectorAll('.timer-container').forEach((container, index) => {
const timerId = container.id.split('-')[1];
const hours = document.getElementById(`hours-${timerId}`).value;
const minutes = document.getElementById(`minutes-${timerId}`).value;
const seconds = document.getElementById(`seconds-${timerId}`).value;

timerData.push({
    id: timerId,
    hours: parseInt(hours) || 0,
    minutes: parseInt(minutes) || 0,
    seconds: parseInt(seconds) || 0,
    remainingSeconds: timers[timerId] ? timers[timerId].remainingSeconds : 0
});
});
localStorage.setItem('timers', JSON.stringify(timerData));
}




function addNewTimer(hours = 0, minutes = 0, seconds = 0, remainingSeconds = 0) {
    const timerId = timerIdCounter++;
    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer-container';
    timerContainer.id = `timer-${timerId}`;


    timerContainer.innerHTML = `
<div class="timer-inputs">
    <div>
        <label for="hours-${timerId}">Hours</label>
        <input type="number" id="hours-${timerId}" class="timer-input" min="0" max="23" value="${hours}">
    </div>
    <div>
        <label for="minutes-${timerId}">Minutes</label>
        <input type="number" id="minutes-${timerId}" class="timer-input" min="0" max="59" value="${minutes}">
    </div>
    <div>
        <label for="seconds-${timerId}">Seconds</label>
        <input type="number" id="seconds-${timerId}" class="timer-input" min="0" max="59" value="${seconds}">
    </div>
</div>
<div class="timer-display">${formatTime(remainingSeconds)}</div>
<div style="text-align: center;">
    <button onclick="startTimer(${timerId})">Start</button>
    <button onclick="stopTimer(${timerId})">Stop</button>
    <button onclick="resetTimer(${timerId})">Reset</button>
    <button class="remove-timer" onclick="removeTimer(${timerId})">Remove</button>
</div>
`;




    document.getElementById('timersContainer').appendChild(timerContainer);
    timers[timerId] = {
        interval: null,
        remainingSeconds: remainingSeconds
    };
    saveTimers();
}





function loadTimers() {
const savedTimers = JSON.parse(localStorage.getItem('timers')) || [];
document.getElementById('timersContainer').innerHTML = ''; // Clear existing timers
timers = []; // Reset timers array
timerIdCounter = 0; // Reset counter


savedTimers.forEach(timer => {
addNewTimer(
    timer.hours,
    timer.minutes,
    timer.seconds,
    timer.remainingSeconds
);
});
}






function removeTimer(timerId) {
    stopTimer(timerId);
    const timerElement = document.getElementById(`timer-${timerId}`);
    timerElement.remove();
    delete timers[timerId];
    saveTimers();
}


function startTimer(timerId) {
    if (!timers[timerId].interval) {
        if (timers[timerId].remainingSeconds === 0) {
            const hours = parseInt(document.getElementById(`hours-${timerId}`).value) || 0;
            const minutes = parseInt(document.getElementById(`minutes-${timerId}`).value) || 0;
            const seconds = parseInt(document.getElementById(`seconds-${timerId}`).value) || 0;


            timers[timerId].remainingSeconds = hours * 3600 + minutes * 60 + seconds;
        }


        if (timers[timerId].remainingSeconds > 0) {
            timers[timerId].interval = setInterval(() => {
                timers[timerId].remainingSeconds--;
                updateTimerDisplay(timerId);


                if (timers[timerId].remainingSeconds === 0) {
                    stopTimer(timerId);
                    //alert(`Timer ${timerId + 1} finished!`);
                }
            }, 1000);
        }
    }
}


function stopTimer(timerId) {
    clearInterval(timers[timerId].interval);
    timers[timerId].interval = null;
}


function resetTimer(timerId) {
    stopTimer(timerId);
    timers[timerId].remainingSeconds = 0;
    document.getElementById(`hours-${timerId}`).value = '0';
    document.getElementById(`minutes-${timerId}`).value = '0';
    document.getElementById(`seconds-${timerId}`).value = '0';
    updateTimerDisplay(timerId);
}


function updateTimerDisplay(timerId) {
    const timerContainer = document.getElementById(`timer-${timerId}`);
    const timerDisplay = timerContainer.querySelector('.timer-display');
    timerDisplay.textContent = formatTime(timers[timerId].remainingSeconds);
    saveTimers();
}


function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


// Task list functionality
function addTask(text = '') {
const taskList = document.getElementById('taskList');
const div = document.createElement('div');
div.className = 'task-item';
div.draggable = true;

// Add drag event listeners
div.addEventListener('dragstart', handleDragStart);
div.addEventListener('dragend', handleDragEnd);
div.addEventListener('dragover', handleDragOver);
div.addEventListener('drop', handleDrop);

const checkbox = document.createElement('div');
checkbox.className = 'checkbox';
checkbox.onclick = function() {
completeTask(div, checkbox);
};

const taskText = document.createElement('span');
taskText.className = 'task-text priority-low';
taskText.textContent = text || document.getElementById('newTask').value;
if (!text) document.getElementById('newTask').value = '';

taskText.addEventListener('dblclick', () => startEditing(taskText));
taskText.addEventListener('contextmenu', (e) => {
e.preventDefault();
startEditing(taskText);
});

const prioritySelector = document.createElement('select');
prioritySelector.className = 'priority-selector';
prioritySelector.innerHTML = `
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low" selected>Low</option>
`;
prioritySelector.onchange = function() {
changePriority(taskText, this.value);
};

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.className = 'delete-button';
deleteButton.onclick = function() {
deleteTask(div);
};

div.appendChild(checkbox);
div.appendChild(taskText);
div.appendChild(prioritySelector);
div.appendChild(deleteButton);
taskList.appendChild(div);
saveTasks();
}

// Drag and drop functionality
let draggedItem = null;

function handleDragStart(e) {
draggedItem = this;
this.classList.add('dragging');
e.dataTransfer.effectAllowed = 'move';
e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
this.classList.remove('dragging');
draggedItem = null;
}

function handleDragOver(e) {
if (e.preventDefault) {
e.preventDefault();
}

const taskItem = e.target.closest('.task-item');
if (taskItem && taskItem !== draggedItem) {
const taskList = document.getElementById('taskList');
const items = [...taskList.querySelectorAll('.task-item')];
const draggedIndex = items.indexOf(draggedItem);
const droppedIndex = items.indexOf(taskItem);

if (draggedIndex < droppedIndex) {
    taskItem.parentNode.insertBefore(draggedItem, taskItem.nextSibling);
} else {
    taskItem.parentNode.insertBefore(draggedItem, taskItem);
}
}

return false;
}

function handleDrop(e) {
if (e.stopPropagation) {
e.stopPropagation();
}
saveTasks();
return false;
}

function startEditing(taskText) {
const currentText = taskText.textContent;
const currentPriority = taskText.className.split(' ')[1];

const input = document.createElement('input');
input.type = 'text';
input.value = currentText;
input.className = `task-edit-input ${currentPriority}`;

function finishEditing() {
const newText = input.value.trim();
if (newText) {
    taskText.textContent = newText;
}
taskText.className = `task-text ${currentPriority}`;
input.replaceWith(taskText);
saveTasks();
}

input.addEventListener('blur', finishEditing);
input.addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
    finishEditing();
}
});

taskText.replaceWith(input);
input.focus();
input.select();
}

function changePriority(taskText, priority) {
taskText.className = `task-text priority-${priority}`;
saveTasks();
}

function completeTask(taskItem, checkbox) {
taskItem.style.transition = 'opacity 0.5s';
taskItem.style.opacity = '0';
playCompleteEndSound();

setTimeout(() => {
taskItem.remove();
saveTasks();
}, 500);
}

function playCompleteEndSound() {
    const sound = document.getElementById('completeEndSound');
    sound.currentTime = 0; // Reset the sound to start
    sound.play().catch(e => {
        console.error('Error playing timer end sound:', e);
    });
}
function deleteTask(taskItem) {
taskItem.remove();
saveTasks();
}

function saveTasks() {
const tasks = Array.from(document.querySelectorAll('.task-item')).map(task => ({
text: task.querySelector('.task-text').textContent,
priority: task.querySelector('.priority-selector').value,
completed: task.querySelector('.checkbox').classList.contains('checked')
}));

localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
try {
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
document.getElementById('taskList').innerHTML = '';

savedTasks.forEach(task => {
    addTask(task.text);
    const lastTask = document.querySelector('.task-item:last-child');
    if (lastTask) {
        const prioritySelector = lastTask.querySelector('.priority-selector');
        prioritySelector.value = task.priority;
        changePriority(lastTask.querySelector('.task-text'), task.priority);
        
        if (task.completed) {
            lastTask.querySelector('.checkbox').classList.add('checked');
        }
    }
});
} catch (error) {
console.error('Error loading tasks:', error);
}
}

// Add event listener for the Enter key on the input field
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('newTask').addEventListener('keypress', function(e) {
if (e.key === 'Enter' && this.value.trim() !== '') {
    addTask();
}
});

loadTasks();
});





// Initialize the page
// Event listeners for auto-saving
document.addEventListener('DOMContentLoaded', function() {
loadTimers();


// Add event listener for timer changes
document.getElementById('timersContainer').addEventListener('change', function(e) {
if (e.target.classList.contains('timer-input')) {
    saveTimers();
}
});


});



// Utility function to verify localStorage
function verifyLocalStorage() {
const savedData = localStorage.getItem('categories');
console.log('Current localStorage categories:', savedData);
return JSON.parse(savedData);
}


//Loading Notes
function saveNotes() {
    const notes = document.getElementById('notes').value;
    localStorage.setItem('notes', notes);
}


function loadNotes() {
    const savedNotes = localStorage.getItem('notes') || '';
    document.getElementById('notes').value = savedNotes;
}


document.getElementById('notes').addEventListener('input', saveNotes);  // Save notes on every input


function startTimer(timerId) {
    if (!timers[timerId].interval) {
        if (timers[timerId].remainingSeconds === 0) {
            const hours = parseInt(document.getElementById(`hours-${timerId}`).value) || 0;
            const minutes = parseInt(document.getElementById(`minutes-${timerId}`).value) || 0;
            const seconds = parseInt(document.getElementById(`seconds-${timerId}`).value) || 0;


            timers[timerId].remainingSeconds = hours * 3600 + minutes * 60 + seconds;
        }


        if (timers[timerId].remainingSeconds > 0) {
            timers[timerId].interval = setInterval(() => {
                timers[timerId].remainingSeconds--;
                updateTimerDisplay(timerId);


                if (timers[timerId].remainingSeconds === 0) {
                    stopTimer(timerId);
                    playTimerEndSound();
                    //alert(`Timer ${timerId + 1} finished!`);
                }
            }, 1000);
        }
    }
}


// Add new function to play timer end sound
function playTimerEndSound() {
    const sound = document.getElementById('timerEndSound');
    sound.currentTime = 0; // Reset the sound to start
    sound.play().catch(e => {
        console.error('Error playing timer end sound:', e);
    });
}




// Load saved tasks on page load
window.onload = function () {
    // loadTasks();
    // Load timers, tasks, and notes from localStorage
    loadTimers();
    // loadCategories();
    loadNotes();
    // Add this to your window.onload function
    window.addEventListener('load', loadMusicPreference);
}



