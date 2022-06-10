export async function request(url, method, body = null, formData = false) {
  try {
    if (!formData) {
      // const token = localStorage.getItem('token');
      const response = await fetch(`https://www.keep-mind.ru/zNHQH2fR3avX9VGdal59/api/${url}`, {
        method,
        body: body === null ? null : JSON.stringify(body),
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } else {
      fetch(`https://www.keep-mind.ru/zNHQH2fR3avX9VGdal59/api/${url}`, {
        body: body,
        method: method,
      });
    }
  } catch (error) {
    return console.warn('ERROR ', error);
  }
}
export default request;
