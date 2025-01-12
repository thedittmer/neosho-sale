<svelte:head>
    <title>Neosho City Wide Garage Sale | Coming Soon</title>
    <meta
        name="description"
        content="The official website for the Neosho City Wide Garage Sale is under construction. Check back soon for updates and details about this exciting community event!"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Neosho City Wide Garage Sale Team" />
    <meta
        property="og:title"
        content="Neosho City Wide Garage Sale | Coming Soon"
    />
    <meta
        property="og:description"
        content="Discover everything about the Neosho City Wide Garage Sale! Our new website is coming soon to help you explore, list, and participate in this annual event."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://neosho.sale/" />
    <meta property="og:image" content="/placeholder-image.jpg" />
    <!-- Replace with your logo or image -->
</svelte:head>

<div class="container">
    <h1>Neosho City Wide Garage Sale</h1>
    <p>This website is under construction!</p>
    <p>
        We're working hard to bring you a new platform to explore and
        participate in Neosho's annual city-wide garage sale.
    </p>
    <p class="highlight">
        Mark your calendars and get ready for an exciting community event!
    </p>
    <button
        onclick={(window.location =
            "https://neoshocc.com/annual-city-wide-events")}>Learn More</button
    >
</div>

<style>
	body {
		margin: 0;
		font-family: 'Arial', sans-serif;
		background-color: #f9f9f9;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
	}

	.container {
		padding: 20px;
		max-width: 600px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		background-color: #fff;
	}

	h1 {
		font-size: 2.5rem;
		color: #2c3e50;
		margin-bottom: 10px;
	}

	p {
		font-size: 1.2rem;
		line-height: 1.6;
		margin-bottom: 15px;
	}

	p.highlight {
		color: #e74c3c;
		font-weight: bold;
	}

	a {
		color: #3498db;
		text-decoration: none;
		font-weight: bold;
	}

	a:hover {
		text-decoration: underline;
	}

	button {
		background-color: #3498db;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1rem;
        margin-top:10px
        transition : background-color .3s ease 
    }
	button:hover {
		 background-color:#2978b5
}
</style>
