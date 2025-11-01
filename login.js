// Fungsi untuk membuka WhatsApp
function openWhatsApp() {
    window.open('https://wa.me/6283131871328', '_blank');
}

// Fungsi validasi token
async function validateToken(token) {
    try {
        // Baca file tokens.json
        const response = await fetch('tokens.json');
        const tokens = await response.json();
        
        // Cari token yang sesuai
        const validToken = tokens.find(t => t.token === token && t.used === false);
        
        if (validToken) {
            // Tandai token sebagai digunakan
            await markTokenAsUsed(token);
            return validToken;
        }
        
        return null;
    } catch (error) {
        console.error('Error validating token:', error);
        return null;
    }
}

// Fungsi untuk menandai token sebagai digunakan
async function markTokenAsUsed(token) {
    try {
        // Baca file used.json
        const usedResponse = await fetch('used.json');
        let usedTokens = await usedResponse.json();
        
        // Tambahkan token ke used.json
        usedTokens.push({
            token: token,
            usedAt: new Date().toISOString()
        });
        
        // Update tokens.json - tandai sebagai used
        const tokensResponse = await fetch('tokens.json');
        let tokens = await tokensResponse.json();
        
        tokens = tokens.map(t => {
            if (t.token === token) {
                return { ...t, used: true };
            }
            return t;
        });
        
        // Simpan perubahan (dalam implementasi nyata, ini akan dilakukan di server)
        // Untuk demo, kita simpan di sessionStorage saja
        sessionStorage.setItem('usedTokens', JSON.stringify(usedTokens));
        sessionStorage.setItem('tokens', JSON.stringify(tokens));
        
        return true;
    } catch (error) {
        console.error('Error marking token as used:', error);
        return false;
    }
}

// Event listener untuk form login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const token = document.getElementById('token').value.trim().toUpperCase();
    
    // Validasi input
    if (!username) {
        showError('Nama pengguna harus diisi');
        return;
    }
    
    if (!token || !token.startsWith('TCR-')) {
        showError('Format token tidak valid. Format: TCR-XXXXX-YY');
        return;
    }
    
    // Validasi token
    const tokenData = await validateToken(token);
    
    if (tokenData) {
        // Simpan data user ke sessionStorage
        sessionStorage.setItem('userName', username);
        sessionStorage.setItem('userTCR', tokenData.tcr);
        sessionStorage.setItem('usedToken', token);
        
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
    } else {
        showError('Token tidak valid atau sudah digunakan');
    }
});

// Fungsi untuk menampilkan error
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    // Sembunyikan error setelah 5 detik
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

// Cek jika user sudah login
window.addEventListener('load', function() {
    const userName = sessionStorage.getItem('userName');
    if (userName && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
    }
});
