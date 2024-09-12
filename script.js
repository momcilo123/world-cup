const pots = {
    pot1: [
        { name: "Brazil", continent: "South America" },
        { name: "Argentina", continent: "South America" },
        { name: "Germany", continent: "Europe" },
        { name: "Spain", continent: "Europe" },
        { name: "Portugal", continent: "Europe" },
        { name: "France", continent: "Europe" },
        { name: "England", continent: "Europe" },
        { name: "Belgium", continent: "Europe" }
    ],
    pot2: [
        { name: "Switzerland", continent: "Europe" },
        { name: "Columbia", continent: "South America" },
        { name: "Uruguay", continent: "South America" },
        { name: "Croatia", continent: "Europe" },
        { name: "Italy", continent: "Europe" },
        { name: "Netherlands", continent: "Europe" },
        { name: "Mexico", continent: "North America" },
        { name: "USA", continent: "North America" }
    ],
    pot3: [
        { name: "Denmark", continent: "Europe" },
        { name: "Morocco", continent: "Africa" },
        { name: "Japan", continent: "Asia" },
        { name: "Australia", continent: "Asia" },
        { name: "Serbia", continent: "Europe" },
        { name: "Senegal", continent: "Africa" },
        { name: "South Korea", continent: "Asia" },
        { name: "Nigeria", continent: "Africa" }
    ],
    pot4: [
        { name: "Iran", continent: "Asia" },
        { name: "Mali", continent: "Africa" },
        { name: "Costa Rica", continent: "North America" },
        { name: "Jamaica", continent: "North America" },
        { name: "Peru", continent: "South America" },
        { name: "Egypt", continent: "Africa" },
        { name: "Thailand", continent: "Asia" },
        { name: "Ukraine", continent: "Europe" }
    ]
};

function drawGroups() {
    const groups = {
        A: [], B: [], C: [], D: [],
        E: [], F: [], G: [], H: []
    };

    const potKeys = Object.keys(pots);

    potKeys.forEach(pot => {
        const shuffledTeams = shuffleArray([...pots[pot]]);
        Object.keys(groups).forEach((group, index) => {
            let teamAdded = false;
            while (!teamAdded) {
                const team = shuffledTeams.pop();
                if (canAddTeam(groups[group], team)) {
                    groups[group].push(team);
                    teamAdded = true;
                } else {
                    shuffledTeams.unshift(team);
                }
            }
        });
    });

    displayGroups(groups);
}


function canAddTeam(group, team) {
    const continentCount = group.reduce((acc, t) => {
        acc[t.continent] = (acc[t.continent] || 0) + 1;
        return acc;
    }, {});
    

    if (continentCount[team.continent] >= 1) {
        if (team.continent === 'Europe' && continentCount['Europe'] < 2) {
            return true;
        }
        return false;
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayGroups(groups) {
    const groupsContainer = document.getElementById('groups');
    groupsContainer.innerHTML = '';

    Object.keys(groups).forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        const groupTitle = document.createElement('h2');
        groupTitle.textContent = `Group ${group}`;
        groupDiv.appendChild(groupTitle);

        const teamsList = document.createElement('ul');
        groups[group].forEach(team => {
            const teamItem = document.createElement('li');
            teamItem.className = 'team';
            teamItem.textContent = team.name;
            teamsList.appendChild(teamItem);
        });
        groupDiv.appendChild(teamsList);
        groupsContainer.appendChild(groupDiv);
    });
}
