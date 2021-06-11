# Dash Payment API

## Install

### Dependencies

* [Docker](https://docs.docker.com/engine/installation/) (v18.06.0+)
* [Docker Compose](https://docs.docker.com/compose/install/) (v1.25.0+)

### Step 1
```console
git clone -b main https://github.com/dash-incubator/payment-server.git
cd payment-server
```

### Step 2
Update `.env.example` and rename to `.env`

### Step 3
```console
docker-compose --env-file ./.env up -d
```

### Step 4
Wait for dashd to sync blockchain, use `/block-height` to monitor progress 

## Paywall Example
`/node/public/index.html` includes a working example of a `dash paywall` the following example can be applied on the frontend or hidden in the backend using nodejs.

```
<script>
    let qr = document.getElementById('qr');

    async function temp() {
        let data = JSON.parse( localStorage.getItem('data') || "{}" );

        if (!data || (data.expires || 0) <= (Date.now() / 1000)) {
            data = await window.bip70.create({
                pay: [
                    {
                        amount: 1,
                        address: 'ycnVmtMhrdJQ3wkEZ6bH19UozEs2YuArPh'
                    },
                    {
                        amount: 0.5,
                        address: 'yT734aAw1CdD7z5PGQKy3SFfpyR8ZBmQyf'
                    }
                ]
            });

            localStorage.setItem('data', JSON.stringify(data));
        }

        qr.src = data.qr;

        window.bip70.poll(data.poll, '/unlocked-content');
    }

    temp();
</script>
```
