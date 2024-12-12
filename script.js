const apiUrl = 'https://fakestoreapi.com/products';
let allProducts = [];  // Храним все продукты

// Получаем категории товаров
async function fetchCategories() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    allProducts = products;  // Сохраняем все товары
    const categories = [...new Set(products.map(product => product.category))]; // Получаем уникальные категории

    const categorySelect = document.getElementById('categorySelect');
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
  }
}

// Загружаем продукты выбранной категории
function filterProductsByCategory(category) {
  if (category === '') {
    displayProducts(allProducts);  // Если категория не выбрана, показываем все товары
  } else {
    const filteredProducts = allProducts.filter(product => product.category === category);
    displayProducts(filteredProducts);
  }
}

// Отображаем список продуктов
function displayProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = ''; // Очищаем текущие данные

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('col');

    productElement.innerHTML = `
      <div class="card product-card">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text product-description" id="description-${product.id}" onclick="toggleDescription(${product.id})">${product.description}</p>
          <p class="card-text text-danger">$${product.price}</p>
          <div class="rating">
            <span>&#9733;</span> ${product.rating.rate} (${product.rating.count} reviews)
          </div>
          <button class="buy-button">Купить</button>
        </div>
      </div>
    `;

    productsContainer.appendChild(productElement);
  });
}

// Функция для открытия полного описания
function toggleDescription(productId) {
  const description = document.getElementById(`description-${productId}`);
  description.classList.toggle('full');
}

// Обработчик выбора категории
document.getElementById('categorySelect').addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  filterProductsByCategory(selectedCategory);
});

// Инициализация
fetchCategories();
