import returnIdBlock from "./helpers/checkIdBlock";

const ipBlock = returnIdBlock('#result_ip');
const locationBlock = returnIdBlock('#result_location');
const timezoneBlock = returnIdBlock('#result_timezone');
const ispBlock = returnIdBlock('#result_isp');


export const renderTextData = (data) => {
  console.log(data.location.lat, data.location.lng);

  ipBlock.textContent = data.ip ? data.ip : 'no info';
  locationBlock.textContent = `${data.location.city ? data.location.city : 'no info'} [${data.location.country ? data.location.country : 'no info'}]`;
  timezoneBlock.textContent = data.location.timezone ? data.location.timezone : 'no info';
  ispBlock.textContent = data.isp ? data.isp : 'no info';

  console.log(data.ip)
  console.log(data.isp);
  console.log(data.location.timezone);
  console.log(data.location.city, data.location.country)
}