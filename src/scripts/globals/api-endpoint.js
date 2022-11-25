import firebaseConfig from './firebase-config';

const API_ENDPOINT = {
  HOME_PAGE: `${firebaseConfig.authDomain}`,
  PATROLI: `${firebaseConfig.authDomain}`,
  INKUBASI: `${firebaseConfig.authDomain}`,
  PENANGKARAN: `${firebaseConfig.authDomain}`,
  PERILISAN: `${firebaseConfig.authDomain}`,
};

export default API_ENDPOINT;
