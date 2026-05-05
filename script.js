const peer = new Peer({
    config: {
        'iceServers': [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun.cloudflare.com:3478' }
        ],
        'sdpSemantics': 'unified-plan'
    }
});

let activeConn;

peer.on('open', (id) => {
    document.getElementById('my-id').value = id;
    const shareUrl = `${window.location.origin}${window.location.pathname}?join=${id}`;
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, { text: shareUrl, width: 160, height: 160 });
    showStatus("Ready to connect");
});

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const joinId = params.get('join');
    if (joinId) {
        document.getElementById('remote-id').value = joinId;
        showStatus("ID detected! Press 'Establish Connection'.");
    }
});

peer.on('connection', (conn) => {
    activeConn = conn;
    setupConnectionListeners();
    showStatus("Connected to Peer");
    uiConnected();
});

function connectToPeer() {
    const remoteId = document.getElementById('remote-id').value.trim();
    if (!remoteId) return alert("Please enter a valid ID");
    
    activeConn = peer.connect(remoteId, { reliable: true });
    showStatus("Handshaking...");
    
    activeConn.on('open', () => {
        setupConnectionListeners();
        showStatus("Connection Established");
        uiConnected();
    });
    
    activeConn.on('error', (err) => {
        showStatus("Connection Failed");
        console.error(err);
    });
}

function setupConnectionListeners() {
    activeConn.on('data', (data) => {
        if (data.type === 'chat') {
            appendMessage('peer', data.message);
        } else if (data.type === 'file') {
            const blob = new Blob([data.file], { type: data.fileType });
            const url = URL.createObjectURL(blob);
            const btn = document.getElementById('download-btn');
            btn.href = url;
            btn.download = data.fileName;
            btn.style.display = 'block';
            appendMessage('system', "📎 Received: " + data.fileName);
        }
    });

    activeConn.on('close', () => {
        showStatus("Peer disconnected");
        document.getElementById('chat-card').style.display = 'none';
        document.getElementById('file-card').style.display = 'none';
    });
}

function sendChat() {
    const input = document.getElementById('chat-msg');
    const msg = input.value.trim();
    if (!msg || !activeConn) return;

    activeConn.send({ type: 'chat', message: msg });
    appendMessage('me', msg);
    input.value = '';
}

function sendFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (!file || !activeConn) return alert("Select a file first");

    showStatus("Sending file...");
    activeConn.send({
        type: 'file',
        file: file,
        fileName: file.name,
        fileType: file.type
    });
    appendMessage('system', "📤 Sent: " + file.name);
    showStatus("File sent successfully");
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerText = text;
    box.appendChild(msgDiv);
    box.scrollTop = box.scrollHeight;
}

function uiConnected() {
    document.getElementById('chat-card').style.display = 'block';
    document.getElementById('file-card').style.display = 'block';
}

function copyLink() {
    const id = document.getElementById('my-id').value;
    const shareUrl = `${window.location.origin}${window.location.pathname}?join=${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Shareable link copied to clipboard!");
}

function showStatus(msg) {
    document.getElementById('status-text').innerText = "Status: " + msg;
}

document.getElementById('chat-msg').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat();
});