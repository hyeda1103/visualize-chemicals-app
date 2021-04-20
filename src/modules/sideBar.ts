// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론되도록 함
const OPEN = "sidebar/OPEN" as const;

// 액션 생성함수를 선언
export const handleSideBar = () => ({
  type: OPEN,
});

// 모든 액션 객체들에 대한 타입을 생성
type sideBarAction = ReturnType<typeof handleSideBar>;

// 리덕스 모듈에서 관리할 상태의 타입 선언
type sideBarState = {
  open: boolean;
};

// 초기상태를 선언
const initialState: sideBarState = {
  open: false,
};

// 리듀서 작성
function sideBar(
  state: sideBarState = initialState,
  action: sideBarAction
): sideBarState {
  switch (action.type) {
    case OPEN:
      return {
        open: !state.open,
      };
    default:
      return state;
  }
}

export default sideBar;
