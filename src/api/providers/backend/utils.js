import { backend } from './';

const backendApiUtils = ({ getters }) => {
  // backend api request interceptor
  backend.interceptors.request.use((config) => {
    const { params } = config;

    if (params) {
      // get all params of type string
      const stringParams = Object.keys(params).filter(key => typeof params[key] === 'string');

      // replace params with getter when store is available
      stringParams.forEach((key) => {
        const item = params[key],
          getterArray = item.split('getters/'),
          isGetter = getterArray.length > 1;

        if (isGetter) params[key] = getters[getterArray[1]];
      });
    }

    // return the axios config and continue the request
    return config;
  }, null);
};

export default backendApiUtils;
