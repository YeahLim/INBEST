import Modal from "react-modal";
import modalStore from "../../../store/modalStore";
import { CONTENT_MODAL_STYLE, OVERLAY_MODAL_STYLE } from "../../../constant/MODAL_STYLE";
import SeedMoneyTag from "../atoms/SeedMoneyTag";
import Period from "../atoms/Period";
import MeanTier from "../atoms/MeanTier";
import JoinBtn from "../atoms/JoinBtn";
import { useQuery } from "react-query";
import { getJoinableGroupDetail } from "../../../api/group";
import spinner from "../../../asset/image/spinner.svg";
import CurJoinPeople from "../atoms/CurJoinPeople";
import default_image from "../../../asset/image/default_image.png";

const QuestionJoinModal = () => {
  const { modalType, closeModal, simulationSeq } = modalStore();
  const { isLoading, data } = useQuery(["detailJoinableGroup", simulationSeq], () => {
    return getJoinableGroupDetail(simulationSeq);
  });

  return (
    <Modal
      isOpen={modalType === "questionJoin"}
      ariaHideApp={false}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      style={{
        content: {
          ...CONTENT_MODAL_STYLE,
          width: "400px",
          height: "570px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
          justifyContent: "space-between",
        },
        overlay: OVERLAY_MODAL_STYLE,
      }}
    >
      {isLoading ? (
        <img src={spinner} className=" my-auto" />
      ) : (
        <>
          <h3>그룹 이름 : {data?.title}</h3>
          <div className=" flex flex-col w-full gap-5">
            <SeedMoneyTag seedMoney={data?.seedMoney} />
            <Period period={data?.period} />
            <MeanTier tier={data?.averageTier} />
            <CurJoinPeople profileImageList={data?.currentMemberImage || [default_image]} />
          </div>
          <JoinBtn />
        </>
      )}
    </Modal>
  );
};
export default QuestionJoinModal;
