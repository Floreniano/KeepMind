$(document).ready(function () {
  $('.slider').slick({
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
  $('.communication').on('click', (e) => {
    $('.communication, .modal').toggleClass('active');
    if (e.currentTarget.innerText === 'Связаться') e.currentTarget.firstElementChild.innerText = '';
    else e.currentTarget.firstElementChild.innerText = 'Связаться';
  });
  const setGridLength = (classItem, classList, property) => {
    const items = Array.from(document.querySelectorAll(classItem));
    const itemsLength = Math.round(items.length / 2);
    document.querySelector(classList).style.setProperty(property, itemsLength);
  };
  setGridLength('.tabs_list-item', '.tabs_list', '--columns');

  $('.tabs_list-item').click(function (e) {
    e.preventDefault();

    $('.tabs_list-item').removeClass('tabls_list-item-active');
    $('.tabs_content-item').removeClass('tabs_content-item-active');

    $(this).addClass('tabls_list-item-active');
    $($(this).attr('href')).addClass('tabs_content-item-active');
  });
  $('.tabs_list-item:first').click();

  let toggleHeaders = document.querySelectorAll('.course_programs-toggle-header');
  toggleHeaders.forEach((toggleHeaderItem) => {
    toggleHeaderItem.addEventListener('click', () => {
      toggleHeaderItem.classList.toggle('active');
      const toggleItemBody = toggleHeaderItem.nextElementSibling;
      if (toggleHeaderItem.classList.contains('active')) {
        toggleItemBody.style.maxHeight = toggleItemBody.scrollHeight + 'px';
      } else {
        toggleItemBody.style.maxHeight = 0;
      }
    });
  });
});
