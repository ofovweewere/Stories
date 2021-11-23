// DOM Elements

            const list = document.querySelector('.list');
            const currPage = document.querySelector('#current-page');
            const totalPages = document.querySelector('#total-pages');
            const buttonPrev = document.querySelector('#prev-page');
            const buttonNext = document.querySelector('#next-page');
            let apiRequest = new XMLHttpRequest();
            apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e'); 
             apiRequest.send();
            const items = name;
            let currentPage = 1;
            let currentIndex = 0;
            const itemsPerPage = 5;

            const numPages = Math.ceil(items.length / itemsPerPage);

            // Functions
            const createListItem = (item) => `<li class="list-item"><h4 class="item-title">${item.title}</h4><p>${item.description}</p></li>`;

            const nextPage = () => {
                if (currentPage === numPages) return;

                currentPage++;
                currentIndex = (currentPage - 1) * itemsPerPage;
                let newIndex = currentIndex + itemsPerPage;
                list.innerHTML = items
                    .slice(currentIndex, newIndex)
                    .map((item) => createListItem(item))
                    .join('');
                currPage.innerHTML = currentPage;
            };

            const prevPage = () => {
                if (currentPage === 1) return;

                currentPage--;
                currentIndex = (currentPage - 1) * itemsPerPage;
                let newIndex = currentIndex + itemsPerPage;
                list.innerHTML = items
                    .slice(currentIndex, newIndex)
                    .map((item) => createListItem(item))
                    .join('');
                currPage.innerHTML = currentPage;
            };

            const init = () => {
                currPage.innerHTML = currentPage;
                totalPages.innerHTML = numPages;

                list.innerHTML = items
                    .slice(0, itemsPerPage)
                    .map((item) => createListItem(item))
                    .join('');
            };

            // Event Listeners
            buttonPrev.addEventListener('click', prevPage);
            buttonNext.addEventListener('click', nextPage);

            init();