export function fetchObject(dispatch, data = {}) {
    dispatch({
        type: 'SET_RESPONSE',
        payload: { data, loading: false, error: null }
      })
}
