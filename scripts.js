
async function getStats() {
    const username = document.getElementById('username').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    const platform = 'psn'; // Change this based on the platform (e.g., 'psn' for PlayStation, 'xbl' for Xbox)
    const apiKey = 'e56358df-1f70-4501-a00b-325babe3f344'; // Replace with your actual API key

    try {
        const response = await fetch(`http://localhost:8080/https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${username}`, {
            headers: {
                'TRN-Api-Key': apiKey
            }
        });

        if (response.status === 401) {
            throw new Error('Unauthorized: Invalid API Key');
        }
        if (response.status === 404) {
            throw new Error('User not found');
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayStats(data);
    } catch (error) {
        console.error('Error fetching data:', error); // Log the error to console for debugging
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

function displayStats(data) {
    const resultsDiv = document.getElementById('results');
    const userData = data.data;

    resultsDiv.innerHTML = `
        <h2>${userData.platformInfo.platformUserHandle}</h2>
        <p>Level: ${userData.segments[0].stats.level.displayValue}</p>
        <p>Rank Score: ${userData.segments[0].stats.rankScore.displayValue}</p>
        <p>Wins: ${userData.segments[0].stats.wins.displayValue}</p>
        <p>Kills: ${userData.segments[0].stats.kills.displayValue}</p>
    `;
}
