import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  console.log(refs.form.elements.delay.value);
  console.log(refs.form.elements.state.value);

  const delay = refs.form.elements.delay.value;
  const state = refs.form.elements.state.value;

  const resultPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'rejected') {
        reject(delay);
      } else {
        resolve(delay);
      }
    }, delay);
  });

  resultPromise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}
