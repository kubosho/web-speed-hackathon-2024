import ky from 'ky';

const createKyInstance = () => {
  const instance = ky.create({
    credentials: 'same-origin',
    prefixUrl: process.env['API_URL'] || '/',
    timeout: 10000,
  });

  return instance;
};

export const apiClient = createKyInstance();
