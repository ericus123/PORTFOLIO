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

const salt = process.env.NEXT_PUBLIC_HASH_SECRET;
export const cipher = () => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return (text) =>
    text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};
export const decipher = () => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return (encoded) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
};

export const slicedString = (str, len, dots) => {
   const sliced = str.substr(0,len);
  return dots && sliced.concat(" ...") || sliced;
};