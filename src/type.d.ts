interface sideBarState {
  open: boolean;
};

interface sideBarAction {
  type: string;
};

type DispatchType = (args: sideBarAction) => sideBarAction;
