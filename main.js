document.addEventListener('DOMContentLoaded', function () {
    const addItemForm = document.getElementById('addItemForm');
    const itemList = document.getElementById('itemList');
    const username = 'ruir-nair';
    const repo = 'brodota-lexicon';
    const token = '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';

    addItemForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemName = document.getElementById('itemName').value;

        // Add item to GitHub repository using GitHub API
        addItemToGitHub(itemName);

        // Clear the form
        addItemForm.reset();

        // Update the displayed items
        displayItemsFromGitHub();
    });

    // Function to add item to GitHub repository using GitHub API
    function addItemToGitHub(itemName) {

        const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/item.json`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const content = JSON.parse(atob(data.content));
            content.push(itemName);

            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Add item to item.json',
                    content: btoa(JSON.stringify(content, null, 2)),
                    sha: data.sha,
                }),
            });
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    // Function to display items from GitHub repository using GitHub API
    function displayItemsFromGitHub() {
        const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/item.json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const content = JSON.parse(atob(data.content));

                // Clear the current list
                itemList.innerHTML = '';

                // Display each item
                content.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    itemList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Initial display
    displayItemsFromGitHub();
});
