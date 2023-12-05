document.addEventListener('DOMContentLoaded', function () {
    const dataTable = document.getElementById('dataTable');
    const searchInput = document.getElementById('searchInput');
    const addForm = document.getElementById('addForm');

    // Sample data
    const data = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        // Add more data as needed
    ];

    // Function to populate the table
    function populateTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );

        // Clear existing rows
        dataTable.querySelector('tbody').innerHTML = '';

        // Populate the table with filtered data
        filteredData.forEach(item => {
            const row = dataTable.insertRow();
            row.innerHTML = `<td>${item.id}</td><td>${item.name}</td>`;
            // Add more cells for additional columns
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', populateTable);

    // Event listener for form submission
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Add form data to the data array
        data.push({
            id: addForm.elements.id.value,
            name: addForm.elements.name.value,
            // Add more properties as needed
        });

        // Repopulate the table
        populateTable();

        // Clear the form
        addForm.reset();
    });

    // Initial table population
    populateTable();
});
