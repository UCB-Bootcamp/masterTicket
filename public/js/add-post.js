// NOT CONNECTED TO FRONT END
async function newFormHandler(event) {
    event.preventDefault();

    const event_title = document.querySelector('input[id="event-title"]').value;
    const venue = document.querySelector('input[id="venue"]').value;
    const city = document.querySelector('input[id="city"]').value;
    const band = document.querySelector('input[id="band"]').value;
    const genre = document.querySelector('input[id="genre"]').value;
    const date = document.querySelector('input[id="date"]').value;
    const staff_pick = document.querySelector('input[id="staff-pick"]').value;
    const event_description = document.querySelector('textarea[id="event-description"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            event_title,
            venue,
            city,
            band,
            genre,
            date,
            staff_pick,
            event_description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        console.log('success');
        // document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};


document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);