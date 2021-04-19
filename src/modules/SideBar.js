const OPEN = "sidebar/OPEN";

export const handleSideBar = () => ({ type: OPEN });

const initialState = {
  open: false,
};

function sidebar(state = initialState, action) {
  switch (action.type) {
    case OPEN:
      return {
        open: !state.open,
      };
    default:
      return state;
  }
}

export default sidebar;
