import "./reviewTemplate.js";

$(function () {
  $(".communication").on("click", (e) => {
    $(".communication, .modal").toggleClass("active");
    if (e.currentTarget.innerText === "Связаться")
      e.currentTarget.firstElementChild.innerText = "";
    else e.currentTarget.firstElementChild.innerText = "Связаться";
  });
  const setGridLength = (classItem, classList, property) => {
    const items = Array.from(document.querySelectorAll(classItem));
    const itemsLength = Math.round(items.length / 2);
    document.querySelector(classList).style.setProperty(property, itemsLength);
  };
  setGridLength(
    ".footer_directions_list-item",
    ".footer_directions_list",
    "--directions"
  );
  setGridLength(".footer_about_list-item", ".footer_about_list", "--abouts");

  let reviewButton = $(".review-button");
  let template = getTemplate();
  let reviewList = $(".content-bottom-inner");
  reviewButton.on("click", () => {
    let reviewCounter = $(".review-counter");
    let reviewRemainig = parseInt($(".review-counter").text());
    for (let i = 0; i < 5; i++) {
      reviewList.append(template);
    }
    reviewCounter = reviewCounter.html(reviewRemainig - 5);
    parseInt($(".review-counter").text()) == 0
      ? reviewButton.remove()
      : console.log(false);
  });
});
