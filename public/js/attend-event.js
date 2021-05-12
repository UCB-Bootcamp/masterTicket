// NOT CONNECTED TO FRONT END
async function attendClickHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];

    const response = await fetch('/api/posts/attend', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

