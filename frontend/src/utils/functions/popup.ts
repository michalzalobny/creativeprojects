export function openPopup(url) {
  const height = 585;
  const width = 940;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const params = `
    location=1,status=1, scrollbars=1, resizable=1, directories=1, toolbar=1, titlebar=1,
    width=${width}, height=${height}, top=${top}, left=${left}
  `;

  return window.open(url, null, params);
}
