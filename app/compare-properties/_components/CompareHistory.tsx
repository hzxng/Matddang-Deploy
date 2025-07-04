import ArrowRight from "@/assets/images/arrow-right-white.svg";
import { TEMP_HISTORY } from "@/constants/compareHistory";
import { getCompareHistory } from "@/services/getCompareHistory";
import { useTokenStore } from "@/store/useTokenStore";
import { CompareHistoryType, Property } from "@/types/property";
import { formatKoreanUnit } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function CompareHistory() {
  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["compareHistory"],
    queryFn: () => getCompareHistory(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const history: CompareHistoryType[] = data?.data || [];

  return (
    <div className="grid grid-cols-2 gap-[30px]">
      {TEMP_HISTORY.map((history, i) => (
        <div key={i} className="flex flex-col">
          <div className="h-[38px] bg-primary flex items-center justify-between rounded-t-[8px] py-[7px] px-[11px]">
            <span className="typo-body-1-m text-white">
              {history.compareTime}
            </span>
            <Image src={ArrowRight} alt="right" className="cursor-pointer" />
          </div>
          <div className="flex gap-[12px] items-start bg-gray-200 py-[16px] px-[14px] rounded-b-[8px]">
            <PropertyItem data={history.sale1.sale[0]} />
            <span className="text-[16px] h-full flex items-center font-bold text-primary">
              VS
            </span>
            <PropertyItem data={history.sale2.sale[0]} />
          </div>
        </div>
      ))}
      {history.length &&
        history.map((history, i) => (
          <div key={i} className="flex flex-col">
            <div className="h-[38px] bg-primary flex items-center justify-between rounded-t-[8px] py-[7px] px-[11px]">
              <span className="typo-body-1-m text-white">
                {history.compareTime}
              </span>
              <Image src={ArrowRight} alt="right" className="cursor-pointer" />
            </div>
            <div className="flex gap-[12px] items-start bg-gray-200 py-[16px] px-[14px] rounded-b-[8px]">
              <PropertyItem data={history.sale1.sale[0]} />
              <span className="text-[16px] h-full flex items-center font-bold text-primary">
                VS
              </span>
              <PropertyItem data={history.sale2.sale[0]} />
            </div>
          </div>
        ))}
    </div>
  );
}

function PropertyItem({ data }: { data: Property }) {
  return (
    <div className="w-[140px] flex flex-col gap-[12px]">
      <div className="w-[140px] h-[140px] rounded-[9px] flex justify-center items-center bg-gray-400 overflow-hidden">
        <Image
          src={data.imgUrl}
          alt="img"
          width={140}
          height={140}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col">
          <span className="typo-body-1-b text-black">
            {data.saleCategory} {formatKoreanUnit(data.price)}
          </span>
          <span className="typo-sub-title-m text-black">
            {data.area}평 / {data.saleAddr}
          </span>
        </div>
        <div className="w-fit bg-primary-light py-[6px] px-[10px] rounded-[4px] typo-body-2-b text-primary border-[1px] border-primary">
          {data.landType}
        </div>
      </div>
    </div>
  );
}
