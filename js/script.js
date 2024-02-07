'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const elTabsParent = document.querySelector('.tabheader');
    const elTabs = document.querySelectorAll('.tabheader__item');
    const elTabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        elTabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        elTabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        elTabsContent[i].classList.add('show', 'fade');
        elTabsContent[i].classList.remove('hide');
        elTabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    elTabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item') && !target.classList.contains('tabheader__item_active')) {
            elTabs.forEach((item, idx) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(idx);
                }
            });
        }
    });
});
