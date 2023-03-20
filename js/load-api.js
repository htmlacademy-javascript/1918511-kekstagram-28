const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Routes.GET_DATA}`)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    });
};

const sendData = (onSuccess, onFail, body, finalSubmit) => {
  fetch(`${BASE_URL}${Routes.SEND_DATA}`,
    {
      method: Methods.POST,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не Удалось отправить форму');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму 2');
    })
    .finally(() => {
      finalSubmit();
    });
};


export {getData, sendData};
