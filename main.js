document.addEventListener('DOMContentLoaded', function () {
    const itemTableBody = document.getElementById('itemTableBody');

    // Fetch items from item.json
    fetch('item.json')
        .then(response => response.json())
        .then(data => {
            // Clear the current table
            itemTableBody.innerHTML = '';

            // Display each item in the table
            data.forEach(item => {
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

                itemTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});
