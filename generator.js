// Fungsi untuk membuat screenshot WhatsApp
function createWhatsAppScreenshot(data) {
    const container = document.getElementById('screenshotResult');
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create WhatsApp interface
    const whatsappUI = document.createElement('div');
    whatsappUI.className = 'whatsapp-interface';
    whatsappUI.style.cssText = `
        width: 100%;
        height: 100%;
        background: #128c7e;
        border-radius: 40px;
        overflow: hidden;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    // Status bar
    const statusBar = document.createElement('div');
    statusBar.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 14px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.1);
    `;
    
    statusBar.innerHTML = `
        <span>${data.phoneTime}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>${data.simName}</span>
            <span>${data.batteryLevel}%</span>
        </div>
    `;
    
    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        background: #128c7e;
        padding: 60px 20px 20px;
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    header.innerHTML = `
        <div style="width: 40px; height: 40px; background: white; border-radius: 50%;"></div>
        <div>
            <div style="font-weight: 600; font-size: 16px;">WhatsApp</div>
            <div style="font-size: 12px; opacity: 0.8;">terhubung • telepon</div>
        </div>
    `;
    
    // Chat area
    const chatArea = document.createElement('div');
    chatArea.style.cssText = `
        background: #e5ddd5;
        height: calc(100% - 140px);
        padding: 20px;
        overflow-y: auto;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2390a4ae' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    `;
    
    // Split chat text into messages
    const messages = data.chatText.split('\n').filter(msg => msg.trim());
    
    messages.forEach((message, index) => {
        const isUser = index % 2 === 0; // Alternate between user and other
        
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            background: ${isUser ? '#dcf8c6' : 'white'};
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 12px;
            max-width: 80%;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            ${isUser ? 'margin-left: auto;' : ''}
            position: relative;
        `;
        
        messageDiv.innerHTML = `
            <div style="font-size: 14px; line-height: 1.4;">${message}</div>
            <div style="text-align: ${isUser ? 'right' : 'left'}; font-size: 11px; color: #666; margin-top: 4px;">
                ${data.phoneTime}
            </div>
        `;
        
        chatArea.appendChild(messageDiv);
    });
    
    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
        background: #f0f0f0;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid #ddd;
    `;
    
    inputArea.innerHTML = `
        <div style="flex: 1; background: white; border-radius: 20px; padding: 8px 16px; color: #666; font-size: 14px;">
            Ketik pesan
        </div>
        <div style="width: 40px; height: 40px; background: #128c7e; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
            ➤
        </div>
    `;
    
    // Assemble the interface
    whatsappUI.appendChild(statusBar);
    whatsappUI.appendChild(header);
    whatsappUI.appendChild(chatArea);
    whatsappUI.appendChild(inputArea);
    
    container.appendChild(whatsappUI);
}

// Fungsi untuk mendownload gambar
function downloadScreenshot() {
    const element = document.getElementById('screenshotResult');
    
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `whatsapp-screenshot-${new Date().getTime()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Fungsi untuk berbagi gambar
function shareScreenshot() {
    const element = document.getElementById('screenshotResult');
    
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
    }).then(canvas => {
        canvas.toBlob(blob => {
            if (navigator.share && navigator.canShare({ files: [new File([blob], 'screenshot.png', { type: 'image/png' })] })) {
                navigator.share({
                    files: [new File([blob], 'whatsapp-screenshot.png', { type: 'image/png' })],
                    title: 'WhatsApp Screenshot',
                    text: 'Check out this WhatsApp screenshot I created!'
                });
            } else {
                // Fallback: download
                downloadScreenshot();
            }
        });
    });
}

// Load data saat halaman dimuat
window.addEventListener('load', function() {
    const generatorData = sessionStorage.getItem('generatorData');
    const userTCR = sessionStorage.getItem('userTCR');
    
    if (!generatorData) {
        // Redirect ke dashboard jika tidak ada data
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Tampilkan sisa TCR
    document.getElementById('remainingTCR').textContent = userTCR;
    
    // Parse data dan buat screenshot
    const data = JSON.parse(generatorData);
    createWhatsAppScreenshot(data);
    
    // Setup event listeners untuk tombol
    document.getElementById('downloadBtn').addEventListener('click', downloadScreenshot);
    document.getElementById('shareBtn').addEventListener('click', shareScreenshot);
});
