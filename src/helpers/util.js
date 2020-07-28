export function getFormBody(params) {
  let formBody = [];
  for (let property of params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}
