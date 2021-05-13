const getEventImage = (eventTitle) => {
	const ticketmasterApiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${env.TICKETMASTER_API_KEY}&keyword=${eventTitle}`;
	fetch(ticketmasterApiUrl).then(function(response){
		response.json().then(function(data){
			let eventImage = data.results[0].urls.raw;
		})
	})
};

// NOT CONNECTED TO FRONT END
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[id="post-title"]').value;
    const body_content = document.querySelector('textarea[id="post-body"]').value;
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);