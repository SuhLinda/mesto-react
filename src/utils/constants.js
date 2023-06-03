//config для класса FormValidator
const validatorConfig = {
  popUpFieldsetInput: '.popup__fieldset-input',//сам инпут
  popupFieldsetInputInactive: 'popup__fieldset-input_inactive',
  popUpFieldsetError: '.popup__fieldset-error',//скрыть ошибку
  errorClass: 'popup__fieldset-error_active',//добавить ошибку
  inputErrorClass: 'popup__fieldset-input_type_error',//добавим красный border
  buttonSave: '.popup__button-save',//кнопка сохранить
  buttonInactiveClass: 'popup__button-save_inactive',//неактивный save
}

export {
  validatorConfig
}