import {mapInit} from './map.js';
import {fetchData} from './data.js';
import {showMessage} from './modal.js';
import {addFilterListeners} from './filter-handlers.js';
import {inactiveStatePage, addFormInputsListeners, addResetButtonListener, setUserFormSubmit} from './form.js';

const processData = async () => {
  try {
    inactiveStatePage();
    mapInit();
    const data = await fetchData();
    setUserFormSubmit(data);
    addFormInputsListeners();
    addFilterListeners(data);
    addResetButtonListener(data);
  } catch (err) {
    showMessage('При загрузке данных с сервера произошла ошибка запроса');
  }
};

processData();
