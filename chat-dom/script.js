/**
 * Chat Application - DOM Manipulation Approach
 * This file handles all the interactive functionality using JavaScript
 * and standard DOM Manipulation
 */

import { elizaResponse} from './eliza.js';

// Debug flag for development loggin
const DEBUG = false;

/**
 * Logs debug messages to console if DEBUG mode is enabled
 * @param{string} msg - The message to log
 */

function log(msg) {
    if(DEBUG) {
        console.log(msg);
    }
}

// Get references to DOM elements that we will manipulate
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const chatForm = document.getElementById('chatForm');

/**
 * Adds a new message to the chat window
 * Creates DOM elements dynamically and appends them to the messages container
 * @param{string} text - the message text to display
 * @param{boolean} isUser - True is message is from user, false if from bot
 */

function addMessage(text,isUser) {
    log(`Adding message: ${text}, isUser: ${isUser}`);

    //Create outer message wrapper div
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    //Create inner content div for the message text
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    //Append content to message wrapper
    messageDiv.appendChild(contentDiv);

    //Add the complete message to the messages container
    messagesContainer.appendChild(messageDiv);

    //Auto-scroll to bottom to show the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight
}


/**
 * Processes a user message and generates a bot response
 * Adds both messages to the chat with appropriate timing
 * @param{string} message - The user's message text
 */

function processMessage(message) {
    log(`Processing message: ${message}`);

    //Add user's message to chat immediately
    addMessage(message,true);

    //Get response from bot using eliza pattern matching
    const response = elizaResponse(message);

    //Add bot response after a short delay to feel more natural
    setTimeout(() => {
        addMessage(response,false);
    }, 500);
}

/**
 * Handles form submission when user sends a message
 * Prevents default frm behavior, validates input, and processes message
 * @param{Event} e - The form submission event
 */

function handleSubmit(e) {
    //Prevent page reload on form submit
    e.preventDefault();

    //Get trimmed message text
    const message = messageInput.ariaValueMax.trim();

    //Don't process empty messages
    if (messages==='') {
        return;
    }

    log(`Sending message: ${message}`);

    //Process the message (add to chat and get response)
    processMessage(message);

    //Clear the input field
    messageInput.value='';

    //Return focus to input for next message
    messageInput.focus();
}

/**
 * Initializes the chat application
 * Sets up event listeners and adds initial bot greeting
 */

function init() {
    log('Initializing chat application');

    //Add initial bot greeting message
    addMessage("Hello! I'm here to chat with you. How can I help you today?", false);

    //Set up form submission handler
    chatForm.addEventListener('submit', handleSubmit);

    messageInput.focus();
}

//Initialize the application when DOM is fully loaded
window.addEventListener('DOMContentLoaded', init);
