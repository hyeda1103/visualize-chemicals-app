import { combineReducers } from "redux";
import sideBar from "./sideBar";

const rootReducer = combineReducers({
  sideBar,
});

// 루트 리듀서를 내보내기
export default rootReducer;

// 루트 리듀서의 반환값 유추
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내기
export type RootState = ReturnType<typeof rootReducer>;
