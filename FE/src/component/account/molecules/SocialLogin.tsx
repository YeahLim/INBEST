import naverLogin from "../../../asset/image/네이버로그인.png";
import kakaoLogin from "../../../asset/image/카카오로그인.png";

const SocialLogin = () => {
  return (
    <div className="grid grid-cols-2 w-10/12 gap-3">
      <div className="flex  items-center">
        <img src={naverLogin} className="cursor-pointer" alt="네이버 로그인" />
      </div>
      <a
        // href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
        //   import.meta.env.VITE_APP_KAKAO_API_KEY
        // }&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}`}
        href={"http://j9d110.p.ssafy.io:8102/oauth2/authorization/kakao"}
      >
        <div className="flex items-center bg-kakao rounded-md">
          <img src={kakaoLogin} className="cursor-pointer w-full" alt="카카오 로그인" />
        </div>
      </a>
    </div>
  );
};

export default SocialLogin;
