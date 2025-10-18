# lab6-components
COMP 305 Fall 2025

# Lab 6: Component-Based Thinking

## Overview
This project explores component-based architecture by building the same chat interface using four different approaches: a static HTML/CSS prototype, DOM manipulation with vanilla JavaScript, progressive enhancement with Web Components, and a fully encapsulated Web Component with Shadow DOM. The purpose is to understand the trade-offs between different architectural patterns and learn when to use each approach.

## Live Demos
- [Main Index]()
- [Prototype: Pure HTML/CSS]()
- [Approach 1: DOM Manipulation]()
- [Approach 2: Progressive Enhancement]()
- [Approach 3: Web Component (Shadow DOM)]()

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Web Components API (Custom Elements, Shadow DOM)
- ES6 Modules

## Approach Explanations

### Prototype: Pure HTML/CSS
**Goal:** Create a static mockup to establish the visual design before adding functionality.

- **Structure:** Static message bubbles hardcoded in HTML
- **Styling:** Global CSS with flexbox for layout
- **Functionality:** None - purely presentational
- **Key Learning:** Separating design from functionality allows focus on UI without worrying about behavior

### Approach 1: DOM Manipulation
**Goal:** Add interactivity using vanilla JavaScript and standard DOM methods.

- **Structure:** Basic HTML container with JavaScript dynamically creating message elements
- **Implementation:** Uses `querySelector()`, `createElement()`, and `appendChild()`
- **Event Handling:** Form submission and Enter key listeners
- **Key Learning:** Direct DOM manipulation is fundamental but can become difficult to maintain as complexity grows

### Approach 2: Progressive Enhancement (Web Component)
**Goal:** Create a custom element that enhances existing semantic HTML with JavaScript.

- **Structure:** Semantic HTML inside `<simple-chat>` tag, enhanced by JavaScript
- **Styling:** Global CSS (no Shadow DOM)
- **Encapsulation:** Behavior encapsulated, styles global
- **Accessibility:** HTML content visible even if JavaScript fails to load
- **Key Learning:** Progressive enhancement prioritizes accessibility by starting with working HTML and layering on functionality

### Approach 3: Web Component with Shadow DOM
**Goal:** Create a fully encapsulated custom element with isolated styles.

- **Structure:** Empty `<chat-interface>` tag, all content created via JavaScript
- **Styling:** Encapsulated styles inside Shadow DOM using `:host` selector
- **Encapsulation:** Both styles and behavior completely isolated
- **Implementation:** Uses `attachShadow()` and `shadowRoot.querySelector()`
- **Key Learning:** Shadow DOM provides true encapsulation, making components portable and reusable

## Key Reflections

### Complexity
- **Prototype:** Simplest - just HTML and CSS
- **DOM Manipulation:** Moderate - standard JavaScript patterns
- **Progressive Enhancement:** Moderate - requires understanding Web Components API
- **Shadow DOM:** Most complex - adds encapsulation layer with Shadow DOM

### Reusability
- **Prototype:** Not reusable - static mockup only
- **DOM Manipulation:** Low - tightly coupled to page structure
- **Progressive Enhancement:** Moderate - custom element but global styles
- **Shadow DOM:** High - completely self-contained and portable

### Encapsulation
- **Prototype:** None
- **DOM Manipulation:** None - all styles and behavior are global
- **Progressive Enhancement:** Partial - behavior encapsulated, styles global
- **Shadow DOM:** Complete - both styles and behavior isolated

### Accessibility
- **Prototype:** Excellent - semantic HTML always visible
- **DOM Manipulation:** Good - HTML structure present, enhanced with JS
- **Progressive Enhancement:** Excellent - works without JavaScript
- **Shadow DOM:** Poor - requires JavaScript to render anything

### Maintainability
- **Prototype:** Easy to update visuals but not functional
- **DOM Manipulation:** Can become messy as complexity grows
- **Progressive Enhancement:** Good - clear separation of markup and behavior
- **Shadow DOM:** Excellent - self-contained, easy to debug and update

## Challenges Encountered

### ES6 Module Loading Issues
**Problem:** The provided `eliza.js` uses ES6 module syntax (`export function`), which requires `type="module"` in script tags. Modules don't work with the `file://` protocol due to CORS restrictions.

**Solution:**
- For Progressive Enhancement: Removed `export` keyword to use as regular script
- For Shadow DOM: Used ES6 modules with `import` statement, requires local server

**Limitation:** Shadow DOM approach won't work if opened directly as a file - must be served through web server or GitHub Pages

### Event Listener Setup Timing
**Problem:** Form submission was causing page reloads because event listeners weren't attaching properly in custom elements.

**Solution:**
- Ensured `connectedCallback()` runs after DOM is ready
- Used `e.preventDefault()` and `e.stopPropagation()` to prevent default form behavior
- Added explicit button click handlers in addition to form submission handlers

### Shadow DOM Scope Isolation
**Problem:** Shadow DOM completely isolates styles, making it impossible to share CSS between approaches.

**Solution:**
- Duplicated styles inside Shadow DOM component
- Used `:host` selector to style the custom element itself
- Learned this isolation is a feature, not a bug - prevents style conflicts

### Element Selection Differences
**Problem:** Confusion between `querySelector()` vs `shadowRoot.querySelector()` when working on different approaches.

**Solution:**
- Clearly distinguished regular DOM vs Shadow DOM approaches
- Added console logs during development for debugging
- Created consistent patterns for each approach

## Implementation Details

### Eliza.js Integration
The Eliza pattern matching module provides conversational responses based on keyword matching:
- **Greetings:** "hello", "hi", "hey"
- **Questions:** "who", "what", "where", "when", "why", "how"
- **Farewells:** "bye", "goodbye"
- **Pattern matching:** "I am", "I feel", "I think"
- **Default responses:** Reflective statements when no pattern matches

### Browser Compatibility
- All approaches use modern JavaScript (ES6+)
- Custom Elements API requires modern browsers (Chrome 54+, Firefox 63+, Safari 10.1+, Edge 79+)
- Shadow DOM is well-supported in all modern browsers
- No polyfills included - assumes modern browser environment

## Next Steps
- Add TypeScript for better type safety
- Implement proper state management for message history
- Add accessibility features (ARIA labels, screen reader support)
- Create more sophisticated Eliza implementation with context awareness
- Add message timestamps and user avatars
- Implement message persistence (localStorage or backend API)
- Create animation improvements and loading states
- Build a component library with multiple reusable chat-related components

## Key Takeaways

1. **Progressive Enhancement vs Graceful Degradation:** PE starts with HTML and adds JS; GD assumes JS is available. PE is better for accessibility, GD is better for encapsulation.

2. **Shadow DOM Trade-offs:** Complete style isolation is powerful for component libraries but requires JavaScript and may conflict with assistive technologies.

3. **Component-Based Thinking:** Breaking UI into self-contained pieces improves maintainability and reusability but adds complexity.

4. **Module Systems Matter:** ES6 modules provide cleaner code organization but require tooling (servers, bundlers) that traditional scripts don't.

5. **Web Standards Evolution:** Web Components represent a standardized approach without requiring frameworks, but they're not always the right choice for every situation.

## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for
details.

## Author
Chloe Ogamba

## References
- [MDN Web Components Documentation](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements v1 Specification](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [Shadow DOM v1 Specification](https://dom.spec.whatwg.org/#shadow-trees)
- [Progressive Enhancement - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- [ELIZA - Wikipedia](https://en.wikipedia.org/wiki/ELIZA)
- [Web Components API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)