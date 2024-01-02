document.addEventListener("DOMContentLoaded", function () {
  // Checkbox'ları dinleme
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      filterProducts();
    });
  });


  function updateCheckboxStatus() {
    const selectedFilters = getSelectedFilters();
  
    checkboxes.forEach(function (checkbox) {
      const [category, value] = checkbox.id.split('-');
  
      
      const potentialFilters = { ...selectedFilters, [category]: [value] };
      const products = document.querySelectorAll('.product');
      let isPotentialEmpty = true;
  
      products.forEach(function (product) {
        const productFilters = getProductFilters(product);
  
        if (matchesFilters(productFilters, potentialFilters)) {
          isPotentialEmpty = false;
        }
      });
  
      checkbox.disabled = isPotentialEmpty;
    });
  }
  
  
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      
      if (!this.checked) {
        checkboxes.forEach(function (otherCheckbox) {
          otherCheckbox.disabled = false;
        });
      } else {
        
        updateCheckboxStatus();
      }

      filterProducts();
    });
  });
  

  // Ürünleri filtreleme
  function filterProducts() {
    const selectedFilters = getSelectedFilters();
    const products = document.querySelectorAll('.product');

    products.forEach(function (product) {
      const productFilters = getProductFilters(product);

      if (matchesFilters(productFilters, selectedFilters)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
        const checkboxStatus = updateCheckboxStatus()
      }
    });
  }


  
  // Sidebardaki seçili filtreleri al
  function getSelectedFilters() {
    const selectedFilters = {};
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        const [category, value] = checkbox.id.split('-');
        if (!selectedFilters[category]) {
          selectedFilters[category] = [];
        }
        selectedFilters[category].push(value);
      }
    });
    return selectedFilters;
  }

  // Ürünün özelliklerini alma
  function getProductFilters(product) {
  const productFilters = {};
  const filterCategories = ['marka', 'ram', 'eb', 'it'];

  filterCategories.forEach(function (category) {
    const filterElement = product.querySelector(`.${category}`);
    if (filterElement) {
      const value = filterElement.getAttribute('value');
       if (!productFilters[category]) {
         productFilters[category] = [];
       }
      productFilters[category].push(value);
    }
  });

  return productFilters;
}


  // Ürünün filtrelerinin seçili filtrelerle eşleşip eşleşmediğini kontrol et
  function matchesFilters(productFilters, selectedFilters) {
    for (const category in selectedFilters) {
      if (!productFilters[category] || !arrayContainsArray(selectedFilters[category], productFilters[category])) {
        return false;
      }
    }
    return true;
  }

  // Bir dizinin diğer diziyi içerip içermediğini kontrol et
  function arrayContainsArray(superset, subset) {
    return subset.every(function (value) {
      return superset.indexOf(value) >= 0;
    });
  }

  
});
