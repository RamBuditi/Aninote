# Aninote - Productivity Dashboard

## Description

Aninote is a single-page web application designed as a personal productivity dashboard. It combines essential tools like multiple timers, a dynamic to-do list, a notes section, and integrated Spotify music playlists, all within a clean user interface. It heavily utilizes browser `localStorage` to persist user data and preferences across sessions.

## Features

*   **Multiple Timers:**
    *   Add multiple independent countdown timers.
    *   Set hours, minutes, and seconds for each timer.
    *   Start, stop, reset, and remove individual timers.
    *   Visual display updates in real-time.
    *   Audio alert (`sao_menu.mp3`) plays upon timer completion.
*   **Dynamic To-Do List:**
    *   Add new tasks with text input.
    *   Mark tasks as complete (with visual feedback and removal).
    *   Delete tasks individually.
    *   Edit existing task text (double-click or right-click).
    *   Assign priority levels (High, Medium, Low) affecting visual style.
    *   Drag-and-drop reordering of tasks.
    *   Audio alert (`saosound.mp3`) plays upon task completion.
*   **Notes Section:**
    *   A simple textarea for jotting down notes.
*   **Spotify Integration:**
    *   Embeds a Spotify playlist using an `iframe`.
    *   Button to cycle through predefined playlists (Lofi, All Songs, Classical).
*   **Persistence:**
    *   All timers (set times, remaining time), tasks (text, priority, order), notes content, current theme, and selected Spotify playlist are saved to the browser's `localStorage`.
    *   Data and preferences are automatically loaded when the page is reopened.
*   **Theme Switching:**
    *   Toggle between Light, Dark, and Transparent themes for the user interface.

## Technologies Used

*   **Frontend:** HTML, CSS, JavaScript (Vanilla)
*   **Persistence:** Browser `localStorage` API
*   **Music:** Spotify Embedded Player (`iframe`)
*   **Styling:** Basic CSS, class-based theme switching.

## How to Use

1.  Simply open the `index.html` file in a modern web browser that supports HTML5, CSS3, and JavaScript or vist https://rambuditi.github.io/Aninote/
2.  Interact with the different sections:
    *   Add timers and control them using the buttons.
    *   Add, manage, prioritize, and reorder tasks in the To-Do list.
    *   Type notes into the Notes textarea.
    *   Use the "Switch Playlist" button to change the music.
    *   Use the "Toggle Theme" button to change the appearance.
3.  All your changes (tasks, timer states, notes, theme, playlist) will be automatically saved in your browser's local storage and will be present the next time you open the file in the same browser.

<!-- Optional: Add screenshots here -->
<!--
## Screenshots

(Add screenshots of the application interface here)
-->
