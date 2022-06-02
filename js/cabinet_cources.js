$(document).ready(function () {
  $('.cards_list-item').hover(
    function () {
      $(this)[0].classList.add('hover');
    },
    function () {
      $(this)[0].classList.remove('hover');
    },
  );
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
  setGridLength('.footer_directions_list-item', '.footer_directions_list', '--directions');
  setGridLength('.footer_about_list-item', '.footer_about_list', '--abouts');
});
