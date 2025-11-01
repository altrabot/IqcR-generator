// Fungsi untuk menghasilkan token acak
function generateRandomToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    
    for (let i = 0; i < 5; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return randomPart;
}

// Fungsi untuk menghasilkan token harian
function generateDailyTokens() {
    const tokens = [];
    
    // 20 token dengan 5 TCR
    for (let i = 0; i < 20; i++) {
        tokens.push({
            token: `TCR-${generateRandomToken()}-05`,
            tcr: 5,
            used: false,
            created: new Date().toISOString()
        });
    }
    
    // 10 token dengan 30 TCR
    for (let i = 0; i < 10; i++) {
        tokens.push({
            token: `TCR-${generateRandomToken()}-30`,
            tcr: 30,
            used: false,
            created: new Date().toISOString()
        });
    }
    
    // 10 token dengan 80 TCR
    for (let i = 0; i < 10; i++) {
        tokens.push({
            token: `TCR-${generateRandomToken()}-80`,
            tcr: 80,
            used: false,
            created: new Date().toISOString()
        });
    }
    
    // 10 token dengan 150 TCR
    for (let i = 0; i < 10; i++) {
        tokens.push({
            token: `TCR-${generateRandomToken()}-150`,
            tcr: 150,
            used: false,
            created: new Date().toISOString()
        });
    }
    
    return tokens;
}

// Fungsi untuk mendapatkan token yang tersedia
async function getAvailableTokens() {
    try {
        const response = await fetch('tokens.json');
        const tokens = await response.json();
        return tokens.filter(token => !token.used);
    } catch (error) {
        console.error('Error fetching tokens:', error);
        return [];
    }
}

// Fungsi untuk memvalidasi token
async function validateToken(token) {
    const tokens = await getAvailableTokens();
    return tokens.find(t => t.token === token);
}

// Export fungsi untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateDailyTokens,
        getAvailableTokens,
        validateToken
    };
}
