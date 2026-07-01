document.addEventListener('DOMContentLoaded', function() {  
  // Считаем количество проэктов. //
  class PortfolioCounter {
    constructor() {
        this.updateAllCounts();
        // Добавляем наблюдатель за изменениями DOM
        this.setupMutationObserver();
    }

    setupMutationObserver() {
      const observer = new MutationObserver((mutations) => {
          let shouldUpdate = false;
          
          mutations.forEach((mutation) => {
              if (mutation.type === 'childList') {
                  // Проверяем, были ли добавлены/удалены элементы портфолио
                  const addedNodes = Array.from(mutation.addedNodes);
                  const removedNodes = Array.from(mutation.removedNodes);
                  
                  const portfolioItemsChanged = addedNodes.some(node => 
                      node.classList && node.classList.contains('hero__right-item')
                  ) || removedNodes.some(node => 
                      node.classList && node.classList.contains('hero__right-item')
                  );
                  
                  if (portfolioItemsChanged) {
                      shouldUpdate = true;
                  }
              }
          });
          
          if (shouldUpdate) {
              this.updateAllCounts();
          }
      });

      // Наблюдаем за контейнером с элементами портфолио
      const portfolioContainer = document.querySelector('.hero__right-list');
      if (portfolioContainer) {
          observer.observe(portfolioContainer, {
              childList: true,
              subtree: true
          });
      }
  }

    updateAllCounts() {
        // Считаем элементы по типам
        const greenCount = document.querySelectorAll('.hero__right-item.green').length;
        const redCount = document.querySelectorAll('.hero__right-item.red').length;
        const blueCount = document.querySelectorAll('.hero__right-item.blue').length;
        const totalCount = greenCount + redCount + blueCount;

        // Обновляем общее количество
        const totalElement = document.querySelector('.hero__right-span');
        if (totalElement) {
            totalElement.textContent = `(${totalCount})`;
        }

        // Обновляем лейблы - ИСПРАВЛЕННАЯ ЧАСТЬ
        // Находим элементы count-badge по их ID
        const greenBadge = document.querySelector('#labelgreen .count-badge');
        const redBadge = document.querySelector('#labelred .count-badge');
        const blueBadge = document.querySelector('#labelblue .count-badge');

        console.log('Найдены элементы:', {
            greenBadge: greenBadge,
            redBadge: redBadge, 
            blueBadge: blueBadge
        });

        if (greenBadge) {
            greenBadge.textContent = `(${greenCount})`;
        } else {
            console.log('❌ Не найден greenBadge');
        }
        
        if (redBadge) {
            redBadge.textContent = `(${redCount})`;
        } else {
            console.log('❌ Не найден redBadge');
        }
        
        if (blueBadge) {
            blueBadge.textContent = `(${blueCount})`;
        } else {
            console.log('❌ Не найден blueBadge');
        }

        console.log('📊 Автоматический подсчёт:');
        console.log(`🟢 Лёгких: ${greenCount}`);
        console.log(`🔴 Средних: ${redCount}`);
        console.log(`🔵 Сложных: ${blueCount}`);
        console.log(`📦 Всего: ${totalCount}`);
    }
}

  // Создаем глобальную переменную для доступа из консоли
  window.portfolioCounter = new PortfolioCounter();


  
  // Модальное окно для нескольких окон. Модалка не прокручиваеться.//
  const activeClass = "modal-active";
  const buttons = document.querySelectorAll(".modalBtn-js");

  for (let button of buttons) {
    modalEvent(button);
  }
  
  function closeModal (modal) {
	 modal.classList.remove(activeClass);
	 document.body.style.overflow  = '';
  }
	  
  function modalEvent(button) {
    button.addEventListener("click", (e) => {//(e) - дефолт - чтобы при нажитие на модального окна, модалка не улетала вверх.
      e.preventDefault();

      const trigger = button.getAttribute("data-modal-trigger");
      const modal = document.querySelector(`[data-modal=${trigger}]`);
      const modalContent = modal.querySelector(".modal-container");
      const close = modal.querySelector(".modal-close");
           
      /* --Cтили body при открытие модального окна-- */
      modal.classList.add('modal-active');		 
      if (modal.classList.contains(activeClass)) {
        document.body.style.overflow  = 'hidden';
      }

      close.addEventListener("click", () =>  {
		 closeModal (modal); 
	  });
      modal.addEventListener("click", () => {
		 closeModal (modal); 
	  });
      modalContent.addEventListener("click", (e) => e.stopPropagation());
      
    });
  };


    // Скрипт добавляет дочерний элемент .under-construction-text
    document.querySelectorAll('.under-construction').forEach(function(parent) {
        if (!parent.querySelector('.under-construction-text')) {
        var child = document.createElement('div');
        child.className = 'under-construction-text';
        child.textContent = 'В разработке';
        parent.appendChild(child);
        }
    });


  
});