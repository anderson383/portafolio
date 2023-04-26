
export const convertHtmlToString = (html:string) => {
  const div = document.createElement('div');

  div.innerHTML = html;

  return div.innerText;
};
