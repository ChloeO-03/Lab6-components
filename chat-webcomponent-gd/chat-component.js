import { getBotResponse } from '../chat-dom/eliza.js';

class ChatInterface extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          height: 600px;
          width: 100%;
          max-width: 600px;
          min-height:80vh;
        }

        .chat-header {
          background: linear-gradient(135deg, #5b9dd9 0%, #6ba5e0 100%);
          color: white;
          padding: 20px;
          text-align: center;
        }

        .chat-header h1 {
          margin: 0 0 8px 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .chat-header .subtitle {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.95;
          font-weight: 400;
        }

        .messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: #f5f5f7;
        }

        .message {
          padding: 10px 16px;
          border-radius: 16px;
          max-width: 70%;
          line-height: 1.5;
          word-wrap: break-word;
          font-size: 0.95rem;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.bot {
          align-self: flex-start;
          background: #e8e8ed;
          color: #333;
        }

        .message.user {
          align-self: flex-end;
          background: #5b9dd9;
          color: white;
        }

        .input-area {
          display: flex;
          padding: 15px 20px;
          background: white;
          border-top: 1px solid #e0e0e0;
          gap: 10px;
          align-items: center;
        }

        .input-area input {
          flex: 1;
          padding: 10px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 25px;
          font-size: 0.95rem;
          font-family: sans-serif;
          outline: none;
          transition: border-color 0.2s;
          color: #333;
          background: white;
        }

        .input-area input::placeholder {
          color: #a0a0a0;
        }

        .input-area input:focus {
          border-color: #5b9dd9;
        }

        .input-area button {
          padding: 10px 20px;
          background: #5b9dd9;
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: sans-serif;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          white-space: nowrap;
        }

        .input-area button:hover {
          background: #4a8bc7;
        }

        .input-area button:active {
          transform: scale(0.98);
        }

        .messages::-webkit-scrollbar {
          width: 8px;
        }

        .messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages::-webkit-scrollbar-thumb {
          background: #d0d0d5;
          border-radius: 4px;
        }

        .messages::-webkit-scrollbar-thumb:hover {
          background: #b0b0b5;
        }
      </style>

      <div class="chat-header">
        <h1>Chat Assistant</h1>
        <p class="subtitle">Approach 3: Graceful Degradation</p>
      </div>
      
      <div class="messages">
        <div class="message bot">Hello! I'm here to chat with you. How can I help you today?</div>
      </div>
      
      <form class="input-area">
        <input type="text" placeholder="Type a message..." aria-label="Message input">
        <button type="submit">Send</button>
      </form>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector('.input-area');
    const input = this.shadowRoot.querySelector('input');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSendMessage();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSendMessage();
      }
    });
  }

  handleSendMessage() {
    const input = this.shadowRoot.querySelector('input');
    const message = input.value.trim();
    if (message === '') return;

    this.addMessage(message, false);
    input.value = '';

    setTimeout(() => {
      const response = getBotResponse(message);
      this.addMessage(response, true);
    }, 300);
  }

  addMessage(text, isBot) {
    const messagesContainer = this.shadowRoot.querySelector('.messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isBot ? 'message bot' : 'message user';
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

customElements.define('chat-interface', ChatInterface);
