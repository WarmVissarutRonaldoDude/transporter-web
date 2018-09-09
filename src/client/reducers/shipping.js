
const reducers = {
  UPDATE_STATE: ({ ...state }, { key, value }) => {
    const obj = {};
    obj[key] = value;
    return Object.assign({
        ...state,
    }, obj);
  }
};

export default (state = {}, action) =>
  (reducers && reducers[action.type] ? reducers[action.type](state, action) : state);
