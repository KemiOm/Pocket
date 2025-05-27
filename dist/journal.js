document.getElementById('journalForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the input values
  const date = document.getElementById('date').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const reflection = document.getElementById('reflection').value;

  // Create a new journal entry element
  const entry = document.createElement('div');
  entry.className = 'post-it'; // Add post-it class for styling
  entry.innerHTML = `
      <h2>Date: ${date}</h2>
      <p>Amount: $${amount}</p>
      <p>Category: ${category}</p>
      <p>Reflection: ${reflection ? reflection : 'N/A'}</p>
      <button onclick="this.parentElement.remove();">Delete</button> <!-- Optional delete button -->
  `;

  // Append the new entry to the journal entries section
  document.getElementById('journalEntries').appendChild(entry);

  // Clear the form inputs
  this.reset();
});
