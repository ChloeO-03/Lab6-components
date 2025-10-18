import { getBotResponse } from "../eliza.js";

class SimpleChat extends HTMLElement {
  connectedCallback() {
    // Match your HTML structure
    this.messages = this.querySelector(".messages-container");
    this.form = this.querySelector("form");
    this.input = this.querySelector("input");

    if (!this.messages || !this.form || !this.input) {
      console.error("SimpleChat: missing elements");
      return;
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent page reload

      const text = this.input.value.trim();
      if (!text) return;

      // Show user message
      this.addMessage(text, "user");
      this.input.value = "";
      this.input.focus();

      // Show bot response after a short delay
      setTimeout(() => {
        const reply =
          typeof getBotResponse === "function"
            ? getBotResponse(text)
            : "Sorry, I cannot respond right now.";
        this.addMessage(reply, "bot");
      }, 300);
    });

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.form.dispatchEvent(new Event("submit"));
      }
    });
  }

  addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.innerHTML = `<div class="message-content">${text}</div>`;
    this.messages.appendChild(msg);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
}

customElements.define("simple-chat", SimpleChat);
