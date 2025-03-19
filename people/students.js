

// Function to filter students based on selected program and admission year
function filterStudents() {
    // Get the selected program and entered year
    const programSelect = document.getElementById('programSelect');
    const yearInput = document.getElementById('yearInput');
    const selectedProgram = programSelect.value;
    const enteredYear = yearInput.value.trim();

    // Get all student rows
    const studentRows = document.querySelectorAll('#studentsTable tbody tr');

    // Loop through each student row and display/hide based on filter criteria
    studentRows.forEach(row => {
        const program = row.querySelector('.program').textContent;
        const year = row.querySelector('.batch').textContent;

        // Check if the row matches the selected filters
        const matchesProgram = selectedProgram === '-Any-' || program === selectedProgram;
        const matchesYear = enteredYear === '' || year.startsWith(enteredYear); // Allow partial match

        // Display the row if both criteria match, otherwise hide it
        row.style.display = (matchesProgram && matchesYear) ? '' : 'none';
    });
}

// Attach the filter function to the select and input elements
document.addEventListener('DOMContentLoaded', () => {
    const programSelect = document.getElementById('programSelect');
    const yearInput = document.getElementById('yearInput');

    programSelect.addEventListener('change', filterStudents);
    yearInput.addEventListener('input', filterStudents); // Trigger filtering as user types
});
