<script>
    import mapboxgl from "mapbox-gl";
    import { onMount } from "svelte";

    export let locations = []; // Array of garage sale data (with lat, lng, title, etc.)
    export let featuredIds = []; // IDs of featured listings

    let mapContainer;

    onMount(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: "mapbox://styles/mapbox/streets-v11", // Map style
            center: [-94.3677, 36.8687], // Default center (Neosho, MO)
            zoom: 12,
            accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        });

        // Add navigation controls (zoom in/out)
        map.addControl(new mapboxgl.NavigationControl());

        // Add markers for each location
        locations.forEach((location) => {
            const isFeatured = featuredIds.includes(location.id);

            const marker = new mapboxgl.Marker({
                color: isFeatured ? "gold" : "blue", // Highlight featured listings
            })
                .setLngLat([location.lng, location.lat])
                .setPopup(
                    new mapboxgl.Popup().setHTML(`
              <h3>${location.title}</h3>
              <p>${location.description}</p>
            `),
                )
                .addTo(map);
        });
    });
</script>

<div bind:this={mapContainer} class="map-container" style="height: 100%;"></div>

<style>
    .map-container {
        width: 100%;
        height: 500px; /* Adjust as needed */
        border-radius: 8px;
        overflow: hidden;
    }
</style>
