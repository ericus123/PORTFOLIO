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

export const downloadFile = (url) => {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.download = url.split("/").pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const LinkTo = (link) => {
  window.location.replace(link);
};
