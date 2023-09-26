import { formatNumberToDollar } from "../../util/formatMoney";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import IncreaseIcon from "./IncreaseIcon";
import DecreaseIcon from "./DecreaseIcon";

interface Props {
  title: string;
  stockList: {
    code: string;
    name: string;
    price: number;
    percentage: number;
    favorite: boolean;
  }[];
  setCompanyCode: React.Dispatch<React.SetStateAction<string>>;
}

const StockList = ({ title, stockList, setCompanyCode }: Props) => {
  return (
    <div className=" shadow-component flex flex-col p-4 gap-2 w-1/3">
      <h4>{title}</h4>
      <div className=" flex justify-between border-y-2 ">
        <p className=" w-24 text-center font-semiBold">이름</p>
        <p className=" w-40 text-center font-semiBold">가격</p>
        <p className=" w-20 text-center font-semiBold">관심 주식</p>
      </div>
      <div className=" flex flex-col gap-2">
        {stockList.map((stock, index) => (
          <div
            className=" flex justify-between cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 items-center py-1 rounded-md transition-colors duration-300"
            key={index}
            onClick={() => setCompanyCode(stock.code)}
          >
            <p className=" w-24 text-center">{stock.name}</p>
            <div className=" flex w-40 items-center justify-center">
              <p className=" text-center">{formatNumberToDollar(stock.price)}</p>
              {stock.percentage >= 0 ? (
                <IncreaseIcon number={stock.percentage} />
              ) : (
                <DecreaseIcon number={stock.percentage} />
              )}
            </div>
            {stock.favorite ? (
              <AiFillStar
                className=" w-20"
                style={{
                  color: "#FFD700",
                }}
              />
            ) : (
              <AiOutlineStar className=" w-20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default StockList;