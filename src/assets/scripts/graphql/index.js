import axios from "axios";

const accessToken = '5faedf107830c19f8524029d5d85e9b8';
const store = document.firstElementChild.dataset.shop;
const locale = document.firstElementChild.lang;

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': accessToken,
  'Accept': 'application/json',
  'Accept-Language': locale,
};

const sendQuery = (query, variables = {}) => {
  const body = JSON.stringify({
    query,
    variables,
  });

  return axios({
    headers,
    method: 'post',
    data: body,
    url: `https://${store}.myshopify.com/api/2020-07/graphql`,
  })
}

export default sendQuery;
