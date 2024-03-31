// Redux slice (modalSlice.js)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  type: '',
  title:'',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
        state.opened = true;
        state.type = action.payload.type;
        state.title = action.payload.title;
        },
    closeModal: state => {
      state.opened = false;
      state.type = '';
      state.title = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
