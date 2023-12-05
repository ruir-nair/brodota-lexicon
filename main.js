document.addEventListener('DOMContentLoaded', function () {
    const itemTableBody = document.getElementById('itemTableBody');
    const searchBox = document.getElementById('searchBox');

    // Fetch items from 'data/item.json'
    fetch('data/item.json')
        .then(response => response.json())
        .then(data => {
            // Store the original data for filtering
            const originalData = [...data];

            // Clear the current table
            itemTableBody.innerHTML = '';

            // Fetch tier colors from 'data/tier.json'
            fetch('data/tier.json')
                .then(response => response.json())
                .then(tierColors => {
                    // Function to filter the table based on search input
                    const filterTable = () => {
                        const searchTerm = searchBox.value.toLowerCase();

                        const filteredData = originalData.filter(item =>
                            item.name.toLowerCase().includes(searchTerm) ||
                            item.tier.toLowerCase().includes(searchTerm) ||
                            item.effect.toLowerCase().includes(searchTerm)
                        );

                        // Clear the current table
                        itemTableBody.innerHTML = '';

                        // Display each filtered item in the table
                        filteredData.forEach(item => {
                            const row = document.createElement('tr');

                            const nameCell = document.createElement('td');
                            nameCell.textContent = item.name;
                            row.appendChild(nameCell);

                            const tierCell = document.createElement('td');
                            tierCell.textContent = item.tier;
                            row.appendChild(tierCell);

                            const effectCell = document.createElement('td');
                            effectCell.textContent = item.effect;
                            row.appendChild(effectCell);

                            // Set background color based on tier
                            const tierColor = tierColors.find(tier => tier.tier === item.tier)?.color || 'white';
                            row.style.backgroundColor = tierColor;

                            const tierColorCell = document.createElement('td');
                            tierColorCell.textContent = tierColor;
                            row.appendChild(tierColorCell);

                            itemTableBody.appendChild(row);
                        });
                    };

                    // Add event listener for the search box
                    searchBox.addEventListener('input', filterTable);

                    // Initial display
                    filterTable();
                })
                .catch(error => console.error('Error fetching tier colors:', error));
        })
        .catch(error => console.error('Error fetching items:', error));
});
