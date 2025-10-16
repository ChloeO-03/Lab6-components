/**
 * SimpleChat Web Component - Progressive Enhancement Approach
 * 
 * This component demonstrates the progressive enhancement pattern:
 * - Starts with semantic, accessible HTML markup
 * - JavaScript enhances the existing content with interactivity
 * - Works gracefully without JavaScript (shows static HTML)
 * - Does NOT use Shadow DOM (relies on global styles)
 * 
 * Key differences from Shadow DOM approach:
 * - Finds and enhances existing elements rather than creating them
 * - Styles are global and can be affected by external CSS
 * - Better for SEO and accessibility (content visible before JS loads)
 * - Less encapsulation but better progressive enhancement
 */

import {elizaResponse} from './eliza.js';

/**
 * SimpleChat custom element class
 * Extends HTMLElement to create a custom web component
*/

class SimpleChat extends HTMLElement {
    /**
     * Constructor - called when element is created
     * Sets up initial state before element is added to DOM
     */

    constructor() {
        super();
    }
    /**
     * connectedCallback - Web Components lifecycle method
     * Called automatically when element is added to the DOM
     * This is where we enhance the existing markup with JavaScript
     */

    connectedCallback() {
        this.log('SimpleChat component connected')

        this.messageContainer = this.querySelector('.messages-container');
        this.form = this.querySelector('.input-area');
        this.input = this.querySelector('.input-area input');
        this.button = this.querySelector('input-area button');

        // Validate that required elements exist in the HTML
        if(!this.messageContainer || !this.form || !this.input) {
            console.error('Required elements not found in SimpleChat');
            return;
        }
        this.setupEventListeners();

        this.input.focus();
    }

    setupEventListeners() {
        this.log('Set up event listeners');

        const form = this.shadowRoot.querySelector('.input-area');
        const input = this.shadowRoot.querySelector('.inpt-area input')

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        this.input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter' && !e.shiftkey) {
                e.preventDefault();
                this.handleSubmit();
            }
        });
    }
/**
* Handles form submission when user sends a message
* Gets input, validates, adds to chat, and generates response
*/
    handleSubmit() {
        // Get trimmed message text
        const message = this.input.value.trim();
        
        // Ignore empty messages
        if (message === '') {
            return;
        }
        
        this.log(`Sending message: ${message}`);
        
        // Add user message to chat
        this.addMessage(message, true);
        
        // Clear input field
        this.input.value = '';
        
        // Return focus to input
        this.input.focus();
        
        // Get bot response and add after delay for natural feel
        setTimeout(() => {
            const response = elizaResponse(message);
            this.addMessage(response, false);
        }, 500);
    }
    /**
* Adds a new message to the chat
* Creates DOM elements within the Shadow DOM 
* @param {string} text - The message text to display
* @param {boolean} isUser - True if message is from user, false if from bot
*/

    addMessage(text,user) {
        this.log(`Adding message: ${text}, isUser: ${isUser}`);

        // Create message wrapper div
        messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

        // Create message content div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;

        // Append content to message wrapper
        messageDiv.appendChild(contentDiv);

        this.messagesContainer.appendChild(messageDiv);

        this.messagesContainer.appendChild(messageDiv);

        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    }
/**
* Logs debug messages if debug mode is enabled
* Helps with development and troubleshooting
* 
* @param {string} msg - The message to log
*/

    log(msg) {
        if(this.debug) {
            console.log(`[ChatInterface] ${msg}`);
        }
    }

/**
* disconnectedCallback - Web Components lifecycle method
* Called when element is removed from DOM
* Use this to clean up event listeners or resources
*/

    disconnectedCallback() {
        this.log('SimpleChat component disconnected');
    }
   
}

customElements.define('simple-chat', SimpleChat);


        



