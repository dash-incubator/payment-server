
const create = async function(data) {
    return await fetch('/payment/create', {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }

            return {};
        });
};


export default create;
