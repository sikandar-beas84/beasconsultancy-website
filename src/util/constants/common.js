//REACT_ENV=prod
const REACT_ENV = 'prod'
// 
const backend_base_url_dev = 'https://api.beasconsultancy.com/'
const frontend_base_url_dev = 'https://beta.beasconsultancy.com/'
const server_url_dev = 'https://api.beasconsultancy.com/'
const site_url_dev = 'https://beta.beasconsultancy.com/'
const backend_domain_dev = 'api.beasconsultancy.com'
const access_token_dev = 'sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr'
const site_key_dev = '6Lf88DosAAAAACUH_zIYwraKZ8Tev0CIRiHWJw2a'
// 
const backend_base_url_prod = 'https://api.beasconsultancy.com/'
const frontend_base_url_prod = 'https://www.beasconsultancy.com/'
const server_url_prod = 'https://api.beasconsultancy.com/'
const site_url_prod = 'https://www.beasconsultancy.com/'
const backend_domain_prod = 'api.beasconsultancy.com'
const access_token_prod = 'sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr'
const site_key_prod = '6Lf88DosAAAAACUH_zIYwraKZ8Tev0CIRiHWJw2a'
// 
let prodObj = {
    BACKEND_DOMAIN: backend_domain_prod,
    SERVER_URL: server_url_prod,
    SITE_URL: site_url_prod,
    API_BASE_URL: `${backend_base_url_prod}api/`,
    BACKEND_BASE_URL: backend_base_url_prod,
    FRONTEND_BASE_URL: frontend_base_url_prod,
    ACCESS_TOKEN: access_token_prod,
    SITE_KEY: site_key_prod
}
const devObj = {
    BACKEND_DOMAIN: backend_domain_dev,
    SERVER_URL: server_url_dev,
    SITE_URL: site_url_dev,
    API_BASE_URL: `${backend_base_url_dev}api/`,
    BACKEND_BASE_URL: backend_base_url_dev,
    FRONTEND_BASE_URL: frontend_base_url_dev,
    ACCESS_TOKEN: access_token_dev,
    SITE_KEY: site_key_dev
}

const getEnv = () => {
    if (REACT_ENV == 'prod') {
        return prodObj
    } else if (REACT_ENV == 'dev') {
        return devObj
    }
}

module.exports.env = getEnv();