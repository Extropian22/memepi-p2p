// At the top of your script, import h and block
const { h, block } = million;

// Define a Million.js block for a single message
const MessageComponent = block(({ msg, currentUserAlias, aiBotAlias, connectedWalletAddress, openTipModal }) => {
    const isMyMessage = msg.sender === currentUserAlias;
    const isAiBotMessage = msg.sender === aiBotAlias;
    const messageClass = isMyMessage ? 'my-message' : (isAiBotMessage ? 'ai-bot-message' : '');
    const timestamp = new Date(msg.timestamp).toLocaleString();

    const tipButton = (msg.sender !== currentUserAlias && msg.sender !== aiBotAlias && currentUserAlias && connectedWalletAddress && !isAiBotMessage)
        ? h('button', { className: 'tip-button', onclick: () => openTipModal(msg.sender) }, 'Tip MEMEPI')
        : null;

    return h('div', { className: `message ${messageClass}` }, [
        h('div', { className: 'message-content' }, [
            h('strong', {}, `${msg.sender}:`),
            ` ${msg.text}`
        ]),
        tipButton,
        h('span', { className: 'timestamp' }, timestamp)
    ]);
});

// Then, in your rendering functions (e.g., initialRenderMessages or appendMessageElement):
function renderMessagesWithMillion() {
    // This is a simplified example. You'd likely maintain a state array of messages
    // and re-render the entire list efficiently with Million.js.
    // Example: Create a parent block to render all messages
    const messagesVNodes = Array.from(messagesMap.values())
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(msg => MessageComponent({ msg: msg, currentUserAlias, aiBotAlias, connectedWalletAddress, openTipModal }));

    // This assumes messagesDiv is the DOM element where you want to render
    million.render(messagesDiv, h('div', {}, messagesVNodes));
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Call renderMessagesWithMillion instead of direct DOM manipulation in your message handling logic.
