window.addEventListener('DOMContentLoaded', function () {
    // loader
    const elLoader = document.querySelector('.loader');
    setTimeout(() => {
        elLoader.style.opacity = "0";
        setTimeout(() => {
            elLoader.style.display = 'none';
        }, 500)
    }, 2000);
    
    // Tabs
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

    elTabsParent.addEventListener('click', function (event) {
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

    // Timer
    const deadline = '2024-02-11';
    function getTimeRemaining(endTime) {
        const timer = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(timer / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timer / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((timer / 1000 / 60) % 60),
            seconds = Math.floor((timer / 1000) % 60);
        return { timer, days, hours, minutes, seconds };
    }
    
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }
    
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        let timeInterval;

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    
            if (t.timer < 0) {
                clearInterval(timeInterval);
            }
        }

        if (getTimeRemaining(endTime).timer > 0) {
            timeInterval = setInterval(updateClock, 1000);
            updateClock();
        } else {
            days.innerHTML = '00';
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';
        }
    }
    
    // Вызываем функцию setClock для запуска таймера
    setClock('.timer', deadline);

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    
    // xato kod
    /* modalTrigger.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
    }) */

    // My codes )
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId)
    };
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal)
    })
    modalCloseBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    // Close on press ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal()
        }
    });

    // Open modal after #sec siteload 
    // const modalTimerId = setTimeout(openModal, 5000)
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            
            openModal();
            window.removeEventListener('scroll', showModalByScroll, { once: true });
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    const clientHeight = document.documentElement.clientHeight;
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    };

    // Class
    class MenuCard {
        constructor(src, alt, title, descrp, price, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descrp = descrp
            this.price = price
            this.parentSelector = document.querySelector(parentSelector)
            this.transfer = 11000
            this.exchangeToUzb()
        };
        
        exchangeToUzb() {
            this.price * this.transfer
        };

        render() {
            const element = document.querySelector('div');

            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                    ${this.descrp}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
                </div>
            </div>
            `

            this.parentSelector.append(element);
        }
    }
    
    new MenuCard(
        'img/tabs/1.png',
        'usual',
        'Plan "Usual"',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        10,
        '.menu .container'
      ).render()
    
      new MenuCard(
        'img/tabs/2.jpg',
        'plan',
        'Plan “Premium”',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        20,
        '.menu .container',
        'menu__item'
      ).render()
    
      new MenuCard(
        'img/tabs/3.jpg',
        'vip',
        'Plan VIP',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        30,
        '.menu .container',
        'menu__item'
      ).render()
});
