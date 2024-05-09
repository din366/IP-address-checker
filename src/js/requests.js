import axios from 'axios';

export const request = async (ip) => {
    const res = await axios
      .get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2qXV1hWus5ZJDnviwGnyPXBF9d7p4&ipAddress=${ip}`)
      .then(res => res.data)
      .catch(err => {throw new Error(err.message)});
    return res;
}