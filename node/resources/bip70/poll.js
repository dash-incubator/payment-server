
const poll = async function(url, success, platform = false) {
    setTimeout(async () => {
        let response = await fetch(url, {
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }

                return {};
            });

        if (response.complete || false) {
            if (platform) {
                console.log(response);
            }
            else {
                window.location.replace(success);
            }
        }

        poll(url, success);
    }, (10 * 1000));
}


export default poll;
