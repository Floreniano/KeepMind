$(document).ready(function () {
  const animateElements = document.querySelectorAll('.animate');
  window.addEventListener('scroll', animScroll);
  function animScroll() {
    addClassAnim(animateElements, 'animate-active');
  }
  function addClassAnim(array, className) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const elementHeight = element.offsetHeight;
      const elementOffset = offset(element).top;
      const animStart = 3;
      let elementPoint = window.innerHeight - elementHeight / animStart;
      if (elementHeight > window.innerHeight) {
        elementPoint = window.innerHeight - window.innerWidth / animStart;
      }
      if (
        pageYOffset > elementOffset - elementPoint &&
        pageYOffset < elementOffset + elementHeight
      ) {
        element.classList.add(className);
      } else {
        if (element.classList.contains('animate-repeat')) {
          element.classList.remove(className);
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animScroll();

  function initSlider() {
    const titles = Array.from(document.querySelectorAll('.h2'));
    let titlesText = [''];
    titles.forEach((item) => titlesText.push(item.attributes.pagination_title.value));
    let swiper = new Swiper('.swiper', {
      direction: 'vertical',
      slidesPerView: 1,
      simulateTouch: false,
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicMainBullets: 2,
        renderBullet: function (index, className) {
          return (
            '<div class="' +
            className +
            '">' +
            '<div class="pagination-text">' +
            titlesText[index] +
            '</div>' +
            '</div>'
          );
        },
      },
      mousewheel: {
        releaseOnEdges: true,
        sensitivity: 0.8,
      },
      hashNavigation: {
        watchstate: true,
      },
      freeMode: false,
      slidesPerView: 'auto',
    });

    // Элементы исчезновения
    const animateHidden = Array.from(document.querySelectorAll('.animate-h'));

    const swiperItems = Array.from(document.querySelectorAll('.swiper-slide'));
    document.querySelector('.counter_slide-total').innerHTML = `0${swiperItems.length - 1}`;

    // Первая загрузка для ПК
    if (window.innerWidth > 1200) {
      const swipeSlide = swiperItems.find((item) => item.classList.contains('swiper-slide-active'));
      const body = document.body;
      const swiperPagination = document.querySelector('.swiper-pagination');
      const counterSlide = document.querySelector('.counter_slide');
      const contentFixed = document.querySelector('.content-fixed');
      if (!swipeSlide.classList.contains('swiper-main')) {
        contentFixed.classList.remove('none');
        swiperPagination.classList.remove('none');
        counterSlide.classList.add('show');
        body.classList.remove('first-screen-view');
        body.classList.add('content-view');

        // Счетчик слайдов
        let counter = -1;
        for (let i = 0; i < swiperItems.length; i++) {
          const element = swiperItems[i];
          counter++;
          if (element.classList.contains('swiper-slide-active')) {
            break;
          }
        }
        document.querySelector('.counter_slide-current').innerHTML = `0${counter}`;
      }
      if (swipeSlide.classList.contains('back_darkblue')) {
        const header = document.querySelector('.header');
        const logo = document.querySelector('.header_logo-img');
        const logoFixed = document.querySelector('.content-fixed-kkep-img');

        header.classList.add('white');
        swiperPagination.classList.add('white');
        logo.src = './assets/SVG/logo_2.svg';
        contentFixed.classList.add('white');
        logoFixed.classList.add('white');
      }
    }

    swiper.on('slideNextTransitionStart', function () {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      const swipeSlide = swiperItems.find((item) => item.classList.contains('swiper-slide-active'));

      // Элементы
      const body = document.body;
      const swiperPagination = document.querySelector('.swiper-pagination');
      const counterSlide = document.querySelector('.counter_slide');
      const contentFixed = document.querySelector('.content-fixed');

      if (swipeSlide.ariaLabel[0] === `2`) {
        animateHidden.forEach((item) => {
          item.classList.add('animate-hidden');
        });

        // Задержка скролла слайда
        let currentTransform = swiperWrapper.style.transform;
        swiperWrapper.style.transform = 'translate3d(0px, 0px, 0px)';
        setTimeout(() => (swiperWrapper.style.transform = currentTransform), 1000);
        setTimeout(() => {
          body.classList.add('content-view');
          body.classList.remove('first-screen-view');
          counterSlide.classList.add('show');
          swiperPagination.classList.remove('none');
          contentFixed.classList.remove('none');
        }, 1000);
      }
    });

    swiper.on('slideChangeTransitionStart', function () {
      // Счетчик слайдов
      let counter = -1;
      for (let i = 0; i < swiperItems.length; i++) {
        const element = swiperItems[i];
        counter++;
        if (element.classList.contains('swiper-slide-active')) {
          break;
        }
      }
      document.querySelector('.counter_slide-current').innerHTML = `0${counter}`;

      // Текущий слайд
      const swipeSlide = swiperItems.find((item) => item.classList.contains('swiper-slide-active'));
      // Элементы
      const body = document.body;
      const swiperPagination = document.querySelector('.swiper-pagination');
      const counterSlide = document.querySelector('.counter_slide');
      const contentFixed = document.querySelector('.content-fixed');

      // Элементы для изменения цветов
      const header = document.querySelector('.header');
      const logo = document.querySelector('.header_logo-img');
      const logoFixed = document.querySelector('.content-fixed-kkep-img');

      // Скрол на первый слайд
      if (swipeSlide.ariaLabel[0] === `1`) {
        body.classList.add('first-screen-view');
        body.classList.remove('content-view');
        swiperPagination.classList.add('none');
        counterSlide.classList.remove('show');
        contentFixed.classList.add('none');
        animateHidden.forEach((item) => {
          item.classList.remove('animate-hidden');
        });
        $('.adaptive_menu, .adaptive_back').removeClass('active');
      }

      if (swipeSlide.classList.contains('back_darkblue') && window.innerWidth > 1200) {
        setTimeout(() => {
          header.classList.add('white');
          swiperPagination.classList.add('white');
          logo.src = './assets/SVG/logo_2.svg';
          contentFixed.classList.add('white');
          logoFixed.classList.add('white');
        }, 400);
      } else {
        header.classList.remove('white');
        swiperPagination.classList.remove('white');
        logo.src = './assets/SVG/logo_1.svg';
        contentFixed.classList.remove('white');
        logoFixed.classList.remove('white');
      }
    });
  }

  if (window.innerWidth > 1200) {
    initSlider();
  }

  $('.slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    infinite: true,
    prevArrow: "<button type='button' class='slick-arrow slick-prev'></button>",
    nextArrow: "<button type='button' class='slick-arrow slick-next'></button>",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          draggable: true,
        },
      },
    ],
  });

  $('.adaptive_menu').on('click', () => {
    $('.adaptive_menu, .adaptive_back').toggleClass('active');
  });

  $('.adaptive_nav-link').on('click', function (e) {
    e.preventDefault();
    $('.adaptive_nav-item').removeClass('active');
    e.currentTarget.offsetParent.classList.add('active');
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top - 60,
      },
      800,
    );
  });

  $('.communication').on('click', (e) => {
    $('.communication, .modal').toggleClass('active');
    if (e.currentTarget.innerText === 'Связаться') e.currentTarget.firstElementChild.innerText = '';
    else e.currentTarget.firstElementChild.innerText = 'Связаться';
  });

  $('.btn_hover').hover(
    function () {
      $(this)[0].offsetParent.classList.add('hover');
    },
    function () {
      $(this)[0].offsetParent.classList.remove('hover');
    },
  );
  $('.tabs_list-item').click(function (e) {
    e.preventDefault();

    $('.tabs_list-item').removeClass('tabls_list-item-active');
    $('.tabs_content-item').removeClass('tabs_content-item-active');

    $(this).addClass('tabls_list-item-active');
    $($(this).attr('href')).addClass('tabs_content-item-active');
  });
  $('.tabs_list-item:first').click();

  const setGridLength = (classItem, classList, property) => {
    const items = Array.from(document.querySelectorAll(classItem));
    const itemsLength = Math.round(items.length / 2);
    document.querySelector(classList).style.setProperty(property, itemsLength);
  };
  setGridLength('.tabs_list-item', '.tabs_list', '--columns');
  setGridLength('.footer_directions_list-item', '.footer_directions_list', '--directions');
  setGridLength('.footer_about_list-item', '.footer_about_list', '--abouts');
});
