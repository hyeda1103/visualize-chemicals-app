// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론되도록 함
const SEARCH = "dictionay/SEARCH" as const;
const CLOSE = "dictionay/CLOSE" as const;

// 액션 생성함수를 선언
export const handleSearch = (e: any) => ({
  type: SEARCH,
  payload: {
    e,
  },
});

export const handleClose = () => ({
  type: CLOSE,
});

// 모든 액션 객체들에 대한 타입을 생성
type dictionaryAction =
  | ReturnType<typeof handleSearch>
  | ReturnType<typeof handleClose>;

// 리덕스 모듈에서 관리할 상태의 타입 선언
type dictionaryState = {
  search: string;
  close: boolean;
};

// 초기상태를 선언
const initialState: dictionaryState = {
  search: "생리용품",
  close: true,
};

// 리듀서 작성
function dictionary(
  state: dictionaryState = initialState,
  action: dictionaryAction
): dictionaryState {
  switch (action.type) {
    case SEARCH:
      return {
        search: action.payload.e.currentTarget.textContent,
        close: false,
      };
    case CLOSE:
      return {
        search: "생리용품",
        close: !state.close,
      };
    default:
      return state;
  }
}

export default dictionary;
