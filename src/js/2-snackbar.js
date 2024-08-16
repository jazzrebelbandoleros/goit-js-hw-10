import iziToast from 'izitoast';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
delayInput.setAttribute('step', '1000');
delayInput.setAttribute('value', '1000');
form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value.trim());
  const shouldResolve =
    event.target.elements.state.value === 'fulfilled' ? true : false;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(value => {
      iziToast.success({
        icon: '',
        title: '',
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        icon: '',
        title: '',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });

  event.target.reset();
}
