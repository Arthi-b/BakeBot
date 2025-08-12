document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;
            window.location.href = `${target}.html`;
        });
    });

    // Check button functionality
    const checkButton = document.getElementById('check-button');
    if (checkButton) {
        checkButton.addEventListener('click', async function() {
            const textarea = document.querySelector('textarea');
            const ingredients = textarea.value.split('\n').filter(ing => ing.trim() !== '');
            const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
            
            if (ingredients.length === 0) {
                alert('Please enter at least one ingredient');
                return;
            }

            checkButton.disabled = true;
            checkButton.textContent = 'Analyzing...';
            
            const resultDiv = document.querySelector('.result');
            resultDiv.style.display = 'none';

            try {
                const response = await fetch("/predict", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ingredients: ingredients,
                        desired_texture: currentPage
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `Server responded with ${response.status}`);
                }

                const data = await response.json();
                resultDiv.innerHTML = `<p>${data.analysis}</p>`;
                resultDiv.style.display = 'block';
                
            } catch (error) {
                console.error('Fetch error:', error);
                resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                resultDiv.style.display = 'block';
            } finally {
                checkButton.disabled = false;
                checkButton.textContent = 'CHECK';
            }
        });
    }
});