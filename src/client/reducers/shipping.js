
const reducers = {
  UPDATE_STATE: ({ ...state }, { key, value }) => {
    const obj = {};
    obj[key] = value;
    return Object.assign({
        ...state,
    }, obj);
  },
  SET_SHIPPING_DETAIL: ({ ...state }, { detail, error }) => {
    return {
        ...state,
        shippingDetail: detail,
        shippingError: error
    };
  },
  INPUT_SHIPPING_CODE: ({ ...state }, { id }) => {
    return {
        ...state,
        shippingId: id,
    };
  },
  SUBMIT_SHIPPING_CODE: ({ ...state }, { id }) => {
    return {
        ...state,
        submitShippingId: id,
    };
  }
};

export default (state = {}, action) =>
  (reducers && reducers[action.type] ? reducers[action.type](state, action) : state);
