const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
};

if (localStorage.getItem('feedback-form-state')) {
  formData.email = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ).email;
  formData.message = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ).message;
}

refs.form.elements.email.value = formData.email;
refs.form.elements.message.value = formData.message;

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  if (event.target === refs.form.elements.email) {
    formData.email = event.target.value;
  }
  if (event.target === refs.form.elements.message) {
    formData.message = event.target.value;
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (
    event.target.elements.email.value === '' ||
    event.target.elements.message.value === ''
  ) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    formData.email = '';
    formData.message = '';
    localStorage.removeItem('feedback-form-state');
    event.target.reset();
  }
}
