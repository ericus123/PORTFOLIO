export const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
