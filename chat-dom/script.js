/**
 * Chat Application - DOM Manipulation Approach
 * Handles chat functionality using vanilla JavaScript and DOM manipulation
 */

import { getBotResponse } from './eliza.js';

// Debug flag for development logging
const DEBUG = true;

/**
 * Logs debug messages to console if DEBUG mode is enabled
 * @param {string} msg - The message to log
 */
function log(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}

// Get references to DOM elements
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const chatForm = document.getElementById('chatForm');

/**
 * Adds a new message to the chat window
 * @param {string} text - Message text
 * @param {boolean} isUser - True if message is from user, false if from bot
 */
function addMessage(text, isUser) {
    log(`Adding message: ${text}, isUser: ${isUser}`);

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Auto-scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Processes user message and generates bot response
 * @param {string} message - User message text
 */
function processMessage(message) {
    log(`Processing message: ${message}`);

    // Add user's message immediately
    addMessage(message, true);

    // Get bot response
    const response = getBotResponse(message);
    log(`Bot response: ${response}`);

    // Delay bot reply for realism
    setTimeout(() => addMessage(response, false), 500);
}

/**
 * Handles form submission when user sends a message
 * @param {Event} e - Form submission event
 */
function handleSubmit(e) {
    e.preventDefault();
    log('Form submitted');
    
    const message = messageInput.value.trim();
    log(`Message value: "${message}"`);
    
    if (message === '') {
        log('Empty message, returning');
        return;
    }

    processMessage(message);

    messageInput.value = '';
    messageInput.focus();
}

/**
 * Initializes chat app
 */
function init() {
    log('Initializing chat application');
    
    // Check if elements exist
    if (!messagesContainer) {
        console.error('messagesContainer not found!');
        return;
    }
    if (!chatForm) {
        console.error('chatForm not found!');
        return;
    }
    if (!messageInput) {
        console.error('messageInput not found!');
        return;
    }
    
    log('All DOM elements found');
    
    // Add initial bot message
    addMessage("Hello! I'm here to chat with you. How can I help you today?", false);
    
    // Add event listener for form submission
    chatForm.addEventListener('submit', handleSubmit);
    log('Event listener attached');
    
    messageInput.focus();
}

// Initialize when DOM is ready
// Note: type="module" scripts are deferred by default, so DOM is already loaded
init();
