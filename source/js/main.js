import {mapInit} from './map.js';
import {fetchData, setUserFormSubmit} from './data.js';
import {showMessage} from './modal.js';
import {addFilterListeners} from './filter-handlers.js';
import {inactiveStatePage, addFormInputsListeners, formOffer} from './form.js';

const processData = async () => {
  try {
    inactiveStatePage();
    mapInit();
    setUserFormSubmit(formOffer);
    const data = await fetchData();
    addFormInputsListeners();
    addFilterListeners(data);
  } catch (err) {
    showMessage('При загрузке данных с сервера произошла ошибка запроса');
  }
};

processData();
