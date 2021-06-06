let data = localStorage.getItem('data') || "{}",
    qr = document.getElementById('qr');


async function bip70() {
    data = JSON.parse( data );

    if (!data || (data.expires || 0) <= (Date.now() / 1000)) {
        data = await window.bip70.create({
            pay: [
                {
                    amount: 0.005,
                    address: 'yNgkWeuCEzyH8J7PBB9vYQGspsa81Ajfrs'
                }
            ],
            storage: {
                random: 'Hey Ash this is the full response from Dash Platform',
                timestamp: Date.now()
            }
        });

        localStorage.setItem('data', JSON.stringify(data));
    }

    qr.src = data.qr;

    window.bip70.poll(data.poll, '/unlocked-content', true);
}


bip70();
