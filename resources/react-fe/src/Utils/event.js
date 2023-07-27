function sub(eventName, listener) {
    document.addEventListener(eventName, listener);
}

function unsub(eventName, listener) {
    document.removeEventListener(eventName, listener);
}

function pub(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { pub, sub, unsub};