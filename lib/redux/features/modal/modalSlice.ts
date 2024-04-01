// Redux slice (modalSlice.js)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  type: '',
  title:'',
  size:'lg'
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
        state.opened = true;
        state.type = action.payload.type;
        state.title = action.payload.title;
        state.size = action.payload.size;
        },
    closeModal: state => {
        state.opened = false;
        state.type = '';
        state.title = '';
        state.size = 'lg';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
