import coin from "../../../asset/image/coin.png";
import { formatComma } from "../../../util/formatComma";

interface Props {
  seedMoney: number | undefined;
}

const SeedMoneyTag = ({ seedMoney }: Props) => {
  return (
    <div>
      <div className=" flex items-end">
        <p className=" font-medium text-gray-600">시드머니</p>
        <img src={coin} width={40} />
      </div>
      <p className=" font-bold text-xl">{seedMoney && formatComma(seedMoney)} 원</p>
    </div>
  );
};
export default SeedMoneyTag;