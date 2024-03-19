const form = document.getElementById('form');
const result = document.getElementById('result');
form.addEventListener('submit', function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                alert("Message sent successfully");
            } else {
                console.log(response);
                alert("404:An error occured");
            }
        })
        .catch(error => {
            console.log(error);
            alert("404:An error occured");
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 2000);
        });
});