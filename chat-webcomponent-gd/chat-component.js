/**
 * ChatInterface Web Component with Shadow DOM
 * 
 * This component demonstrates full encapsulation using Shadow DOM.
 * Key characteristics:
 * - Uses Shadow DOM for complete style and markup isolation
 * - All HTML structure is generated via JavaScript
 * - Styles are encapsulated and don't leak out
 * - Can inherit CSS custom properties from the document
 * - Component is completely self-contained and reusable
 */

import { elizaResponse } from './eliza.js';

/**
 * ChatInterface custom element class
 * Extends HTMLElement to create a fully encapsulated web component
 */
class ChatInterface extends HTMLElement {
/**
* Constructor - called when element is created
* Attaches Shadow DOM for encapsulation
*/
    constructor() {
        super();
        
        // Debug flag for development logging
        this.debug = false;
        
        // Attach Shadow DOM with 'open' mode
        // 'open' mode allows external JavaScript to access shadowRoot if needed
        this.attachShadow({ mode: 'open' });
    }
    
    /**
     * connectedCallback - lifecycle method
     * Called when element is added to the DOM
     * This is where we create the component's structure
     */
    connectedCallback() {
        this.log('ChatInterface component connected');
        
        // Render the component's HTML and CSS
        this.render();
        
        // Set up event listeners after rendering
        this.setupEventListeners();
        
        // Add initial greeting after a brief delay
        setTimeout(() => {
            this.addMessage("Hello! I'm here to chat with you. How can I help you today?", false);
        }, 100);
    }

/**
* Renders the complete component structure within Shadow DOM
* Creates all HTML elements and embedded styles
*/
    render() {
        // Set innerHTML of shadowRoot to create the component's structure
        // Template literal allows us to write HTML/CSS as a string
        this.shadowRoot.innerHTML = `
            <style>
                /* Reset styles within Shadow DOM */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                /* 
                 * :host selector styles the custom element itself
                 * This is the container for our entire component
                 * Can use CSS custom properties from the document via var()
                 */
                :host {
                    display: block;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    height: 700px;
                    display: flex;
                    flex-direction: column;
                }
                
                /* Header section with gradient */
                .chat-header {
                    background: linear-gradient(135deg, #5fa3d0 0%, var(--chat-primary-color, #4a90e2) 100%);
                    color: white;
                    padding: 24px;
                    text-align: center;
                }
                
                .chat-header h1 {
                    font-size: 28px;
                    margin-bottom: 8px;
                }
                
                .subtitle {
                    font-size: 14px;
                    opacity: 0.9;
                }
                
                /* Scrollable messages container */
                .messages-container {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: var(--chat-bg, #f5f5f5);
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                /* Individual message wrapper */
                .message {
                    display: flex;
                    animation: fadeIn 0.3s ease-in;
                }
                
                /* Fade-in animation for new messages */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Bot messages aligned to left */
                .message.bot {
                    justify-content: flex-start;
                }
                
                /* User messages aligned to right */
                .message.user {
                    justify-content: flex-end;
                }
                
                /* Message bubble content */
                .message-content {
                    max-width: 70%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    line-height: 1.4;
                    word-wrap: break-word;
                }
                
                /* Bot message styling - uses CSS custom property */
                .message.bot .message-content {
                    background: var(--chat-bot-bg, #e9ecef);
                    color: #333;
                    border-bottom-left-radius: 4px;
                }
                
                /* User message styling - uses CSS custom property */
                .message.user .message-content {
                    background: var(--chat-user-bg, #4a90e2);
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                
                /* Input area at bottom */
                .input-area {
                    display: flex;
                    padding: 16px;
                    background: white;
                    border-top: 1px solid var(--chat-border, #e0e0e0);
                    gap: 12px;
                }
                
                /* Text input field */
                .input-area input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #ddd;
                    border-radius: 24px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color 0.3s;
                }
                
                /* Input focus state - uses CSS custom property */
                .input-area input:focus {
                    border-color: var(--chat-primary-color, #4a90e2);
                }
                
                /* Send button */
                .input-area button {
                    padding: 12px 24px;
                    background: var(--chat-primary-color, #4a90e2);
                    color: white;
                    border: none;
                    border-radius: 24px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.1s;
                }
                
                /* Button hover state - uses CSS custom property */
                .input-area button:hover {
                    background: var(--chat-primary-dark, #357abd);
                }
                
                /* Button active/click state */
                .input-area button:active {
                    transform: scale(0.98);
                }
                
                /* Custom scrollbar styling for webkit browsers */
                .messages-container::-webkit-scrollbar {
                    width: 8px;
                }
                
                .messages-container::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                
                .messages-container::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
                
                .messages-container::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            </style>
            
            <!-- Component HTML structure -->
            <div class="chat-container">
                <header class="chat-header">
                    <h1>Chat Assistant</h1>
                    <p class="subtitle">Approach 3: Web Component (Shadow DOM)</p>
                </header>
                
                <div class="messages-container">
                    <!-- Messages will be added here dynamically -->
                </div>
                
                <form class="input-area">
                    <input type="text" placeholder="Type a message..." autocomplete="off">
                    <button type="submit">Send</button>
                </form>
            </div>
        `;
    }
    
/**
* Sets up event listeners for the chat interface
* Must use shadowRoot to query elements within Shadow DOM
*/
    setupEventListeners() {
        this.log('Setting up event listeners');
        
        // Query elements within Shadow DOM using shadowRoot
        const form = this.shadowRoot.querySelector('.input-area');
        const input = this.shadowRoot.querySelector('.input-area input');
        
        // Validate that elements were found
        if (!form || !input) {
            console.error('Could not find form or input in Shadow DOM');
            return;
        }
        
        // Store references for use in other methods
        this.form = form;
        this.input = input;
        this.messagesContainer = this.shadowRoot.querySelector('.messages-container');
        
        // Handle form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Focus on input field
        this.input.focus();
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
   
}

customElements.define('chat-interface', ChatInterface);