$(document).ready(function () {
  $('.slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    infinite: true,
    prevArrow: "<button type='button' class='slick-arrow slick-prev'></button>",
    nextArrow: "<button type='button' class='slick-arrow slick-next'></button>",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          draggable: true,
        },
      },
    ],
  });
  const setGridLength = (classItem, classList, property) => {
    const items = Array.from(document.querySelectorAll(classItem));
    const itemsLength = Math.round(items.length / 2);
    document.querySelector(classList).style.setProperty(property, itemsLength);
  };
  setGridLength('.footer_directions_list-item', '.footer_directions_list', '--directions');
  setGridLength('.footer_about_list-item', '.footer_about_list', '--abouts');
});
