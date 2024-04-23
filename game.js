const topics = [
    "Coffee",
    "Mountains",
    "Beaches",
    "Music festivals",
    "Photography",
    "Dancing",
    "Gardening",
    "Books",
    "Cooking",
    "Board games",
    "Puppies",
    "Sunsets",
    "Road trips",
    "Art galleries",
    "Chocolate",
    "Sushi",
    "Yoga",
    "Star-gazing",
    "Waterfalls",
    "Soccer",
    "Volunteering",
    "History",
    "Picnics",
    "Museums",
    "Karaoke",
    "Camping",
    "Ice cream",
    "Hiking",
    "Bicycles",
    "Traveling",
    "Movies",
    "Rainbows",
    "Crafting",
    "Concerts",
    "Barbecue",
    "Bees",
    "Basketball",
    "Snowboarding",
    "Spa days",
    "Sailing",
    "Farmers markets",
    "Chess",
    "Whales",
    "Hot air balloons",
    "Fishing",
    "Thunderstorms",
    "Zip lining",
    "Bird watching",
    "Sculpture",
    "Aquariums",
    "Balloons",
    "Pottery",
    "Singing",
    "Water parks",
    "Juggling",
    "Skateboarding",
    "Baking",
    "Festivals",
    "Comedy shows",
    "Kites",
    "Fireworks",
    "Archery",
    "Astrology",
    "Skydiving",
    "Candles",
    "Carnivals",
    "Puzzles",
    "Magic tricks",
    "Golf",
    "Scuba diving",
    "Tattoos",
    "Zoos",
    "Paragliding",
    "Painting",
    "Lighthouses",
    "Opera",
    "Cacti",
    "Marathons",
    "Origami",
    "Stargazing",
    "Canyons",
    "Wine tasting",
    "Safari",
    "Roller coasters",
    "Tea",
    "Exhibitions",
    "Rock climbing",
    "Bungee jumping",
    "Fireflies",
    "Parades",
    "Champagne",
    "Tropical islands",
    "Massage",
    "Gourmet food"
];

async function getQuestion() {
    const apiKey = "";

    if (!apiKey) {
        alert("No api key!");
        return;
    }

    const userPrompt = 'Lets play "Who wants to become a millionaire?" The topic should be ' + topics[Math.floor(Math.random() * topics.length)] + '! Give me a question and 4 possible answers in this json form: {"question": "", "answers": ["","","",""]}. Always the first must be the correct answer! The theme of the question should be different every time! Give me only ONE question!';
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    // Directly include the current user message in the request body
    const requestBody = {
        messages: [{ role: "user", content: userPrompt }],
        model: "gpt-3.5-turbo",
        temperature: 1,
    };

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            let message = data.choices[0].message.content; // Assuming the API response structure fits this path
            console.log(message);

            handleResponse(message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleResponse(response) {
    const jsonStartIndex = response.indexOf('{');
    const jsonObjectString = response.substring(jsonStartIndex);

    const gameData = JSON.parse(jsonObjectString);

    const question = gameData.question;
    const answers = gameData.answers;

    createQuestion(question, answers);
}