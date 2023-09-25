import Modal from "react-modal";
import { CONTENT_MODAL_STYLE, OVERLAY_MODAL_STYLE } from "../../../constant/MODAL_STYLE";
import InitGroup from "../molecules/InitGroup";
import SettingPeriod from "../molecules/SettingPeriod";
import { useCreateModal } from "./useCreateModal";
import ProgressCircle from "../molecules/ProgressCircle";
import group from "../../../asset/image/group.png";
import SettingSeedMoney from "../molecules/SettingSeedMoney";
import SettingInvite from "../molecules/SettingInvite";
import { GROUP_CREATE_STEP_MAP } from "../../../constant/GROUP_CREATE_STEP_MAP";
import SettingTitle from "../molecules/SettingTitle";
import modalStore from "../../../store/modalStore";
import Complete from "../molecules/Complete";
import complete from "../../../asset/image/complete.png";

const CreateModal = () => {
  const { onNextStep, groupSetting, dispatch, step, resetStepAndGroupSetting, createGroupMutation } = useCreateModal();
  const { modalType, closeModal } = modalStore();

  const CreateModalStepComponent = [
    <InitGroup onNextStep={onNextStep} resetStepAndGroupSetting={resetStepAndGroupSetting} />,
    <SettingPeriod
      onNextStep={onNextStep}
      period={groupSetting.period}
      dispatch={dispatch}
      resetStepAndGroupSetting={resetStepAndGroupSetting}
    />,
    <SettingSeedMoney
      onNextStep={onNextStep}
      seedMoney={groupSetting.seedMoney}
      dispatch={dispatch}
      resetStepAndGroupSetting={resetStepAndGroupSetting}
    />,
    <SettingInvite
      onNextStep={onNextStep}
      resetStepAndGroupSetting={resetStepAndGroupSetting}
      inviteUsers={groupSetting.invitedUsers}
      dispatch={dispatch}
    />,
    <SettingTitle
      resetStepAndGroupSetting={resetStepAndGroupSetting}
      dispatch={dispatch}
      title={groupSetting.title}
      createGroupMutation={createGroupMutation}
      groupSetting={groupSetting}
    />,
    <Complete resetStepAndGroupSetting={resetStepAndGroupSetting} />,
  ];

  return (
    <Modal
      isOpen={modalType === "createGroup"}
      ariaHideApp={false}
      onRequestClose={() => {
        closeModal();
        resetStepAndGroupSetting();
      }}
      closeTimeoutMS={300}
      style={{
        content: {
          ...CONTENT_MODAL_STYLE,
          width: "500px",
          height:
            step === GROUP_CREATE_STEP_MAP.INVITE_USER
              ? "700px"
              : step === GROUP_CREATE_STEP_MAP.COMPLETE_GROUP
              ? "350px"
              : "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
        },
        overlay: OVERLAY_MODAL_STYLE,
      }}
    >
      {step === GROUP_CREATE_STEP_MAP.INIT_GROUP ? (
        <img src={group} width={120} />
      ) : step === GROUP_CREATE_STEP_MAP.COMPLETE_GROUP ? (
        <img src={complete} width={120} />
      ) : (
        <ProgressCircle step={step} />
      )}

      {CreateModalStepComponent[step]}
    </Modal>
  );
};

export default CreateModal;
