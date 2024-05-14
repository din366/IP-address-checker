import {inputValidation} from "./helpers/inputValidation";
import {request} from "./requests";
import {renderTextData} from "./renderRequestData";
import returnIdBlock from "./helpers/checkIdBlock";
import L from "leaflet";

let timerId = null;
const trottlingWarningBlock = (elem, message) => {
  elem.style.opacity = 1;
  elem.style.bottom = '-40px';
  elem.textContent = message;
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    elem.style.opacity = 0;
    elem.style.bottom = 0;
  }, 3000)
}

export const activateListeners = (mapObject) => {
  const input = returnIdBlock('#input_ip');
  const button = returnIdBlock('#button_ip');
  const warningBlock = returnIdBlock('#input_warning_block');
  const loadingSpinner = returnIdBlock('#request_loading');

  button.addEventListener('click', (e) => {

    if (inputValidation(input.value)) {
      loadingSpinner.style.right = '-40px';

      request(input.value).then(res => {
        renderTextData(res);
        mapObject.setView([res.location.lat, res.location.lng], 13) // ? leaflet map object
        L.marker([res.location.lat, res.location.lng]).addTo(mapObject);
        loadingSpinner.style.right = 0;
      }).catch(err => {
        console.log(err);
        trottlingWarningBlock(warningBlock, 'network error, please try again');
        loadingSpinner.style.right = 0;
      });

    } else {
      trottlingWarningBlock(warningBlock, 'invalid IP address');
    }
  })
}