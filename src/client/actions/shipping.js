import Api from '../utils/Api';

export function UPDATE_STATE(key, value) {
    return {
      type: 'UPDATE_STATE',
    };
}

export function setShippingDetail(detail, error = null) {
    return {
        type: 'SET_SHIPPING_DETAIL',
        detail,
        error,
    };
}

export function getShippingDetail(id) {
    const shippingPath = `${process.env.SERVER_PATH}/shipping`;
    const path = `${shippingPath}/${id}`;

    return dispatch => {
        // now make API request
        Api.get({
          path,
        })
          .then((res) => {
            dispatch(setShippingDetail(res));
          })
          .catch((err) => {
            dispatch(setShippingDetail(null, err));
          });
    };
}

export function inputShippingId(id) {
    return {
        type: 'INPUT_SHIPPING_CODE',
        id,
    };
}