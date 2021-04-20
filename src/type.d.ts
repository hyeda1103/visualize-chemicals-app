type sideBarState = {
  open: boolean;
};

type sideBarAction = {
  type: string;
};

type DispatchType = (args: sideBarAction) => sideBarAction;
