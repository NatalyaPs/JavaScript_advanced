// Функция для сохранения отзыва в localstorage
function addReview() {
    const productName = document.getElementById('productName').value;
    const reviewText = document.getElementById('reviewText').value;
    
    // Проверяем, что оба поля заполнены
    if (productName && reviewText) {
        // Создаем новый отзыв с уникальным идентификатором
        const review = {
            id: Date.now(),
            productName: productName,
            reviewText: reviewText
        };

        // Получаем текущие отзывы из localstorage или создаем новый пустой массив
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        // Добавляем новый отзыв в массив
        reviews.push(review);

        // Сохраняем обновленный массив отзывов в localstorage
        localStorage.setItem('reviews', JSON.stringify(reviews));  

        // Очищаем поля формы
        document.getElementById('productName').value = '';
        document.getElementById('reviewText').value = '';

        // Очищаем div с сообщением об ошибке, если такое было
        document.getElementById('error').innerText = '';
    } else {
        // Если какое-либо из полей не заполнено, выводим ошибку пользователю
        document.getElementById('error').innerText = 'Пожалуйста, заполните все поля';
    }
}

// Функция для отображения отзывов на странице просмотра
    function showReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
        // Очищаем div со списком отзывов
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';
    
        // Перебираем отзывы и создаем HTML для каждого
        reviews.forEach(function (review) {
            const reviewDiv = document.createElement("div");
            const productName = document.createElement("h3");
            const reviewText = document.createElement("p");
            const deleteButton = document.createElement("button");
            const showButton = document.createElement("button");

            productName.innerText = review.productName;
            reviewText.innerText = review.reviewText;
            reviewText.style.display = "none";
            deleteButton.innerText = "Удалить";
            showButton.innerText = "Показать отзывы";

            reviewDiv.appendChild(productName);
            reviewDiv.appendChild(reviewText);
            reviewDiv.appendChild(deleteButton);
            reviewDiv.appendChild(showButton);
            reviewsList.appendChild(reviewDiv);

            // Обработчик события для кнопки "Удалить" - со страницы и из localStorage
            deleteButton.addEventListener("click", function () {
                reviewDiv.remove();
                const indexReview = reviews.findIndex(
                    (r) =>
                        r.productName === review.productName &&
                        r.reviewText === review.reviewText
                );
                reviews.splice(indexReview, 1);
                localStorage.setItem("reviews", JSON.stringify(reviews));
            });

            // Обработчик события для кнопки "Показать отзывы"
            showButton.addEventListener("click", function () {
                if (reviewText.style.display === "none") {
                    reviewText.style.display = "block";
                    showButton.innerText = "Скрыть отзывы";
                } else {
                    reviewText.style.display = "none";
                    showButton.innerText = "Показать отзывы";
                }
            });

            //-------------
            // reviewDiv = `
            //     <h3>${productName}</h3>
            //     <p>${reviewText}</p>
            //     <button>${deleteButton}</button>
            // `;

            // reviewsList.insertAdjacentHTML('beforeend', reviewDiv);
            //-------------
        });
    }