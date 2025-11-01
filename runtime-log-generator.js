const fs = require('fs');
const path = require('path');

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

// Fungsi utama
function main() {
    const today = new Date().toISOString().split('T')[0];
    
    console.log(`[IQC Generator] Token baru dibuat (${today})`);
    
    // Generate tokens
    const newTokens = generateDailyTokens();
    
    // Simpan ke tokens.json
    fs.writeFileSync(path.join(__dirname, 'tokens.json'), JSON.stringify(newTokens, null, 2));
    
    // Log tokens ke console
    newTokens.forEach(token => {
        console.log(token.token);
    });
    
    console.log(`Total ${newTokens.length} token.`);
    
    // Reset used.json
    fs.writeFileSync(path.join(__dirname, 'used.json'), JSON.stringify([], null, 2));
    
    console.log('Used tokens reset.');
}

// Jalankan fungsi utama
main();

// Jika dijalankan sebagai script langsung
if (require.main === module) {
    main();
}
