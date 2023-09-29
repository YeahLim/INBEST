import { Link } from "react-router-dom";
import temp_logo from "../../asset/image/temp_logo.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiLogOut } from "react-icons/fi";
import { AiFillProfile } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import ProfileUpdate from "../account/page/ProfileUpdate";
import { useState } from "react";
import userStore from "../../store/userStore";
import { logout } from "../../api/account";
import { getUserInfo } from "../../api/account";
import { GetUserInfo } from "../../type/Accounts";
import PasswordUpdate from "../account/page/PasswordUpdate";
import bell from "../../asset/image/bell.png";
import login from "../../asset/image/login.png";
import HeaderAlarmItem from "./HeaderAlarmItem";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  const [myInfo, setMyInfo] = useState<GetUserInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const accessToken = userStore((state) => state.accessToken);
  const userInfo = userStore((state) => state.userInfo);
  const { setAccessToken, setUserInfo, setRefreshToken } = userStore();
  return (
    <header className="w-full h-[8vh] flex justify-evenly items-center bg-gray-50  bg-opacity-90">
      <Link to="/">
        <img className="h-[8vh] " src={temp_logo} />
      </Link>
      <div className="flex items-center justify-center gap-16">
        <Link to="/invest" className=" text-center text-md">
          모의 투자
        </Link>
        <a className=" text-center text-md">랭킹</a>
        <Link to={"/community"} className=" text-center text-md">
          게시판
        </Link>
        <a className=" text-center text-md">금융 상품 추천</a>
        <a className=" text-center text-md">금융 사전</a>
        <a className=" text-center text-md">관리자 페이지</a>
      </div>
      {!accessToken && (
        <>
          <Link to="/login">
            <div className=" flex items-center justify-center gap-2">
              <img src={login} width={40} alt="" />
              <p className=" font-bold text-xl">로그인</p>
            </div>
          </Link>
        </>
      )}
      {accessToken && (
        <div className=" flex items-center justify-between">
          <Menu as="div" className="relative inline-block text-left me-10">
            <div style={{ width: "64px", height: "64px" }} className="flex justify-center items-center">
              <Menu.Button
                as="img"
                src={userInfo?.profileImgSearchName}
                className="rounded-full hover:cursor-pointer shadow-md"
                width={50}
                height={50}
                alt="userImage"
              />
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" z-20 absolute -right-1  mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          " px-4 py-2  flex items-center"
                        )}
                      >
                        <AiFillProfile />

                        <span className="ms-3">마이페이지</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={async () => {
                          try {
                            const res = await getUserInfo(userInfo!.seq);
                            setMyInfo(res.UserInfo);
                            console.log(myInfo);
                            setShowModal(true);
                            console.log(res);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          " px-4 py-2 flex items-center cursor-pointer"
                        )}
                      >
                        <BsPencilSquare />
                        <span className="ms-3">
                          <button>회원정보수정</button>
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => {
                          setShowPasswordModal(() => true);
                        }}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          " px-4 py-2 flex items-center cursor-pointer"
                        )}
                      >
                        <RiLockPasswordLine />
                        <span className="ms-3">
                          <button>비밀번호 변경</button>
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={async () => {
                          try {
                            await logout();
                            setAccessToken(null);
                            setRefreshToken(null);
                            setUserInfo(null);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "px-4 py-2 flex items-center text-red-500 hover:cursor-pointer z-30 cursor-pointer"
                        )}
                      >
                        <FiLogOut />
                        <span className="ms-3">로그아웃</span>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu as="div" className="relative inline-block text-left me-10">
            <Menu.Button as="img" src={bell} className="cursor-pointer" width={45} />

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" z-20 absolute -left-6  mt-4 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <HeaderAlarmItem />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
      <ProfileUpdate myInfo={myInfo} showModal={showModal} setShowModal={setShowModal} />
      <PasswordUpdate showModal={showPasswordModal} setShowModal={setShowPasswordModal} />
    </header>
  );
};
export default Header;