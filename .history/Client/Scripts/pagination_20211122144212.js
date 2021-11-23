// DOM Elements
            const list = document.querySelector('.list');
            const currPage = document.querySelector('#current-page');
            const totalPages = document.querySelector('#total-pages');
            const buttonPrev = document.querySelector('#prev-page');
            const buttonNext = document.querySelector('#next-page');

            const items = [
                { title: 'Item 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 5', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 6', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 7', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 8', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 9', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 10', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 11', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
                { title: 'Item 12', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cum?' },
            ];
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