import { SET_LIST_DISPLAY } from "../action/list.action";

const initialState = { showListe: false };

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIST_DISPLAY:
      return { showListe: action.payload };
    default:
      return state;
  }
}
