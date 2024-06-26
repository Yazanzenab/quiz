document.addEventListener('DOMContentLoaded', function() {
    const chapterSelect = document.getElementById('chapterSelect');
    const quizContainer = document.getElementById('quizContainer');
    const backButton = document.getElementById('backButton');

    // Populate chapter select options
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = `chapter_${i}.json`;
        option.textContent = `Chapter ${i}`;
        chapterSelect.appendChild(option);
    }

    // Load selected chapter
    chapterSelect.addEventListener('change', function() {
        const selectedChapter = chapterSelect.value;
        if (selectedChapter) {
            fetch(selectedChapter)
                .then(response => response.json())
                .then(data => displayQuestions(data))
                .catch(error => console.error('Error loading chapter:', error));
            chapterSelect.style.display = 'none';
            backButton.style.display = 'block';
        } else {
            quizContainer.innerHTML = '';
        }
    });

    // Display questions and answers
    function displayQuestions(questions) {
        quizContainer.innerHTML = '';

        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            
            const questionText = document.createElement('h2');
            questionText.textContent = `${index + 1}. ${question.question_text}`;
            questionDiv.appendChild(questionText);

            question.answers.forEach(answer => {
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');
                answerDiv.textContent = answer.answer_text;
                
                answerDiv.addEventListener('click', function() {
                    if (answer.is_true) {
                        answerDiv.classList.add('correct');
                    } else {
                        answerDiv.classList.add('incorrect');
                        highlightCorrectAnswer(question.answers);
                    }
                });

                questionDiv.appendChild(answerDiv);
            });

            quizContainer.appendChild(questionDiv);
        });
    }

    // Highlight the correct answer
    function highlightCorrectAnswer(answers) {
        answers.forEach(answer => {
            if (answer.is_true) {
                const answerDivs = document.querySelectorAll('.answer');
                answerDivs.forEach(div => {
                    if (div.textContent === answer.answer_text) {
                        div.classList.add('correct');
                    }
                });
            }
        });
    }

    // Back to chapter selection
    backButton.addEventListener('click', function() {
        chapterSelect.style.display = 'block';
        backButton.style.display = 'none';
        quizContainer.innerHTML = '';
    });
});
