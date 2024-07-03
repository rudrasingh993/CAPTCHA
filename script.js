document.addEventListener("DOMContentLoaded", function() {
    function getRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function getRandomOperator() {
        const operators = ['+', '-', '*', '/'];
        return operators[Math.floor(Math.random() * operators.length)];
    }

    function generateCaptcha() {
        const num1 = getRandomNumber();
        const num2 = getRandomNumber();
        const operator = getRandomOperator();
        let question, answer;

        switch (operator) {
            case '+':
                question = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case '-':
                question = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;
            case '*':
                question = `${num1} * ${num2}`;
                answer = num1 * num2;
                break;
            case '/':
                question = `${num1} / ${num2}`;
                answer = (num1 / num2).toFixed(2); // Keeping two decimal points for division
                break;
        }

        return { question, answer };
    }

    function displayNextCaptcha() {
        const captcha = generateCaptcha();
        document.getElementById("captcha-question").innerHTML = captcha.question;
        document.getElementById("captcha-answer").value = '';
        document.getElementById("captcha-answer").dataset.answer = captcha.answer;
    }

    function normalizeAnswer(answer) {
        return answer.replace(/\s+/g, '').toLowerCase();
    }

    document.getElementById("captchaForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const answer = normalizeAnswer(document.getElementById("captcha-answer").value);
        const correctAnswer = normalizeAnswer(document.getElementById("captcha-answer").dataset.answer);

        if (answer === correctAnswer || Math.abs(answer - correctAnswer) < 0.01) { // Allow minor numerical discrepancies
            Swal.fire({
                icon: 'success',
                title: 'Correct!',
                text: 'You solved the CAPTCHA!',
                onClose: () => {
                    displayNextCaptcha();
                    document.getElementById("videoContainer").style.display = 'none'; // Hide video container on correct answer
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong answer. Please try again!'
            });
            document.getElementById("videoContainer").style.display = 'block';
            document.getElementById("errorVideo").play();
        }
    });

    document.getElementById("captcha-answer").addEventListener("input", function() {
        document.getElementById("videoContainer").style.display = 'none'; // Hide video container while retrying
    });

    displayNextCaptcha();
});
