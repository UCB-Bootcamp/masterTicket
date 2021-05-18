

const getEventImage = (eventTitle) => {
	const ticketmasterApiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${env.TICKETMASTER_API_KEY}&keyword=${eventTitle}`;
	fetch(ticketmasterApiUrl).then(function(response){
		response.json().then(function(data){
			let eventImage = data._embedded.events[0].images[0].url;
            //console.log(eventImage);
            return eventImage;
		})
	})
};

getEventImage();