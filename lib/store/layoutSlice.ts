import { createAppSlice } from "../hooks";

interface State {
  isMagicEnabled: boolean;
}

const InitialState: State = {
  isMagicEnabled: true,
};

export const Slice = createAppSlice({
  name: 'layout',
  initialState: InitialState,

  reducers: (create) => ({
    toggleMagic: create.reducer((state) => {
      state.isMagicEnabled = !state.isMagicEnabled;
    }),
  }),

  selectors: {
    isMagicEnabled: (state) => state.isMagicEnabled,
  }
});

export const { toggleMagic } = Slice.actions;
export const { isMagicEnabled } = Slice.selectors;
