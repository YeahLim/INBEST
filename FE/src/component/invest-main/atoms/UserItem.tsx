import { IoIosAddCircleOutline } from "react-icons/io";
import { SearchUser } from "../../../type/Group";
interface Props {
  nickname: string;
  profileImg: string;
  dispatch: React.Dispatch<{ type: "ADD_INVITE"; payload: SearchUser }>;
  payload: SearchUser;
}

const UserItem = ({ nickname, profileImg, dispatch, payload }: Props) => {
  return (
    <div className=" flex items-center m-2 mt-4">
      <img src={profileImg} width={40} />
      <p>{nickname}</p>

      <span
        onClick={() =>
          dispatch({
            type: "ADD_INVITE",
            payload,
          })
        }
      >
        <IoIosAddCircleOutline color="#6CE061" size="32" />
      </span>
    </div>
  );
};
export default UserItem;
