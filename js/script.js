window.addEventListener('DOMContentLoaded', async () => {
  const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader')

  // Loader
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }, 2000)

  // Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide')
      item.classList.remove('show', 'fade')
    })

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent()
          showTabContent(idx)
        }
      })
    }
  })

  // Timer
  const deadline = '2022-08-11'
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds
    const timer = Date.parse(endtime) - Date.parse(new Date())

    if (timer <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24))
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24)
      minutes = Math.floor((timer / 1000 / 60) % 60)
      seconds = Math.floor((timer / 1000) % 60)
    }

    return { timer, days, hours, minutes, seconds }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updatClock, 1000)

    updatClock()

    function updatClock() {
      const t = getTimeRemaining(endtime)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.timer <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock('.timer', deadline)


  // Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  function closeModal() {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
  }

  function openModal() {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
  }

  modalTrigger.forEach((item) => {
    item.addEventListener('click', openModal)
  })

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal()
    }
  })

  const modalTimerId = setTimeout(openModal, 5000)

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll)
    }
  }
  window.addEventListener('scroll', showModalByScroll)

  // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.classes = classes
      this.parent = document.querySelector(parentSelector)
      this.transfer = 11000
      this.changeToUZS()
    }

    changeToUZS() {
      this.price = this.price * this.transfer
    }

    render() {
      const element = document.createElement('div')

      if (this.classes.length === 0) {
        this.element = 'menu__item'
        element.classList.add(this.element)
      } else {
        this.classes.forEach((classname) => element.classList.add(classname))
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
        </div>
      `

      this.parent.append(element)
    }
  }

  async function getResources(url) {
    const res = await fetch(url);
    return await res.json();
  }
    
  getResources('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, price }) => {
      new MenuCard(img, altimg, title, price, '.menu .container').render()
    })
  })

  // Forms
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    bindPostData(form)
  })

  const msg = {
    loading: 'Loading...',
    success: "Thank's for submiting our form",
    failure: 'Something went wrong!',
  }

  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, price }) => {
      new MenuCard(img, altimg, title, price, '.menu .container').render()
    })
  })


  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      form.style.textAlign = 'center';

      // Loading...
      const statusMessage = document.createElement('span');
      statusMessage.classList.add('loading');
      form.append(statusMessage)

      const request = new XMLHttpRequest()
      request.open('POST', 'server.php')
      
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      const obj = { x: 10, y: 20 }
      console.log(Object.entries(obj))

      postData('http://localhost:3000/request', json)
        .then((data) => {
        console.log(data)
        showMsgModal(msg.success)
        statusMessage.remove()
        })
        .catch(() => {
        showMsgModal(msg.failure);
        })
        .finally(() => {
        form.reset()
      })

      request.addEventListener('load', () => {
        if (request.status == 200) {
          showMsgModal(msg.success)
          form.reset()
          setTimeout(() => {
            statusMessage.remove()
          }, 2000);
        } else {
          showMsgModal(msg.failure)
        }
      })
    })
  }

  

  function showMsgModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    const msgModal = document.createElement('div')
    msgModal.classList.add('modal__dialog')
    msgModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `

    document.querySelector('.modal').append(msgModal);
    setTimeout(() => {
      msgModal.remove()
      prevModalDialog.classList.add('show')
      prevModalDialog.classList.remove('hide')
      closeModal()
    }, 4000);
  }

  /* fetch('http://localhost/serial/menu')
    .then(data => data.json())
    .then(res => console.log(res)) */


  // Sliders
  const slides = document.querySelectorAll('.offer__slide'),
    nextSlide = document.querySelector('.offer__slider-next'),
    prevSlide = document.querySelector('.offer__slider-prev'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total');
  
  let slideIdx = 1;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`
  } else {
    total.textContent = slides.length;
  }

  showSlides(showSlides);

  function showSlides(idx) {
    if (idx > slides.length) {
      slideIdx = 1;
    }
    if (idx < 1) {
      slideIdx = slides.length;
    }
    slides.forEach(item => item.style.display = 'none');
    slides[slideIdx - 1].style.display = 'block';

    if (slides.length < 10) {
      current.textContent = `0${slideIdx}`
    } else {
      current.textContent = slideIdx;
    }
  };

  function plusSlides(idx) {
    showSlides(slideIdx += idx)
  }
  nextSlide.addEventListener('click', () => {
    plusSlides(1)
  })
  prevSlide.addEventListener('click', () => {
    plusSlides(-1)
  })
})
