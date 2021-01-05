import {
  newPost,
  fetchEgas,
  fetchInt,
  sliceEgas,
  sliceIntDocs,
  test,
  postType,
  makeItNull,
  searchEValue,
  searchIValue,
  pendingPost,
  sliceWaitingPost,
  localSliced,
  outSliced

  
} from "../actions/ActionTypes";

const initialState = {
  items: [],
  static: null,
  localdata: [],
  searchEData: [],
  searchIData: [],
  pendingPost: [],
  sliced: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case newPost:
      return {
        ...state,
        items: action.payload,
      };

    case fetchInt:
      return {
        ...state,
        localdata: action.payload.data,
        fLocallength: action.payload.fLength,
        sLocallength: action.payload.sLength,

      };
    case fetchEgas:
      return {
        ...state,
        items: action.payload.data,
        fLength: action.payload.fLength,
        sLength: action.payload.sLength,
      };

    case sliceIntDocs:
      return {
        ...state,
        localSliced: action.payload.data,
        sliced: action.payload.sliced
      };

    case sliceEgas:
      return {
        ...state,
        outSliced: action.payload.data,
        sliced:action.payload.sliced
      };

    case postType:
      return {
        ...state,
        type: action.payload,
      };

    case test:
      return {
        ...state,
        static: action.payload.data,
        sliced: action.payload.sliced
      };

    case searchEValue:
      return {
        ...state,
        searchEData: action.payload.data,
      };
    case searchIValue:
      return {
        ...state,
        searchIData: action.payload.data,
      };

    case pendingPost:
      return {
        ...state,
        pendingPost: action.payload.data,
        pendingLength: action.payload.length
      }

    case sliceWaitingPost:
      return {
        ...state,
        pendingPost: action.payload.data
      }

    default:
      return state;
  }
}
