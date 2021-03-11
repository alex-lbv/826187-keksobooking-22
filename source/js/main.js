import {mapInit} from './map.js';
import {fetchData, setUserFormSubmit, addResetButtonListener} from './data.js';
import {showMessage} from './modal.js';
import {addFilterListeners} from './filter-handlers.js';
import {inactiveStatePage, addFormInputsListeners, formOffer} from './form.js';

const processData = async () => {
  try {
    inactiveStatePage();
    mapInit();
    const data = await fetchData();
    setUserFormSubmit(formOffer, data);
    addFormInputsListeners();
    addFilterListeners(data);
    addResetButtonListener(data);
  } catch (err) {
    showMessage('При загрузке данных с сервера произошла ошибка запроса');
  }
};

processData();
