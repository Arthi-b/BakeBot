document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;
            window.location.href = `/${target}.html`;
        });
    });

    // Check button functionality
    const checkButton = document.getElementById('check-button');
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            const textarea = document.querySelector('textarea');
            const ingredients = textarea.value.split('\n').filter(ing => ing.trim() !== '');
            const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
            
            if (ingredients.length === 0) {
                alert('Please enter at least one ingredient');
                return;
            }

            checkButton.disabled = true;
            checkButton.textContent = 'Analyzing...';

            fetch("/predict", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: ingredients,
                    desired_texture: currentPage
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const resultDiv = document.querySelector('.result');
                if (data.error) {
                    resultDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
                } else {
                    resultDiv.innerHTML = `<p>${data.analysis}</p>`;
                }
                resultDiv.style.display = 'block';
            })
            .catch(error => {
                const resultDiv = document.querySelector('.result');
                resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                resultDiv.style.display = 'block';
            })
            .finally(() => {
                checkButton.disabled = false;
                checkButton.textContent = 'CHECK';
            });
        });
    }
});