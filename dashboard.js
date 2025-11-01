// Fungsi untuk membuka WhatsApp
function openWhatsApp() {
    window.open('https://wa.me/6283131871328', '_blank');
}

// Fungsi untuk mengurangi TCR
function reduceTCR() {
    let userTCR = parseInt(sessionStorage.getItem('userTCR') || '0');
    
    if (userTCR > 0) {
        userTCR--;
        sessionStorage.setItem('userTCR', userTCR.toString());
        return true;
    }
    
    return false;
}

// Event listener untuk form generator
document.getElementById('generatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Cek TCR
    const userTCR = parseInt(sessionStorage.getItem('userTCR') || '0');
    
    if (userTCR <= 0) {
        alert('Token kamu sudah habis. Silakan order token baru.');
        return;
    }
    
    // Kurangi TCR
    if (reduceTCR()) {
        // Simpan data form untuk halaman generate
        const formData = {
            chatText: document.getElementById('chatText').value,
            batteryLevel: document.getElementById('batteryLevel').value,
            simName: document.getElementById('simName').value,
            phoneTime: document.getElementById('phoneTime').value
        };
        
        sessionStorage.setItem('generatorData', JSON.stringify(formData));
        
        // Redirect ke halaman generate
        window.location.href = 'generate.html';
    } else {
        alert('Token kamu sudah habis. Silakan order token baru.');
    }
});

// Load data user saat halaman dimuat
window.addEventListener('load', function() {
    const userName = sessionStorage.getItem('userName');
    const userTCR = sessionStorage.getItem('userTCR');
    
    if (!userName || userTCR === null) {
        // Redirect ke login jika tidak ada data user
        window.location.href = 'index.html';
        return;
    }
    
    // Tampilkan data user
    document.getElementById('userName').textContent = userName;
    document.getElementById('userTCR').textContent = userTCR;
});
