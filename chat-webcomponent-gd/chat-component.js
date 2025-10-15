/**
 * ChatInferface Web Component with Shadow DOM
 * 
 * This componenet demonstrates full encapsulation using Shadow DOM
 * Key Characteristics:
 * - Uses Shadow DOM for complete style and markup isolation
 * - All HTML structure is generated via JavaScript
 * - Styles are encapsulated and don't leak out
 * - Can inherit CSS custom properties from the document
 * - Component is completely self-contained and reusable
 */

import { elizaResponse} from './eliza.js';

/**
 * ChatInterface custom element class
 * Extends HTMLElement to create a fully encapsulated web component
 */

class ChatInferface extends HTMLElement {
    constructor() {
        super();

        this.debug = false;

        this.attachShadow({mode: 'open'})
    }
}

/**
 * connectedCallback - lifecycle method
 * Called when element is added to the DOM
 * This is where we create the component's structure
 */

connectedCallback() {
    this.log('ChatInferface component connected');

    this.render();

    this.setupEventListerners();
    setTimeout (() => {
        this.addMessage ("Hello! I'm here to chat with you. How can I help you today?", false);

    }, 100);
}

 /**
* Renders the complete component structure within Shadow DOM
* Creates all HTML elements and embedded styles
*/



