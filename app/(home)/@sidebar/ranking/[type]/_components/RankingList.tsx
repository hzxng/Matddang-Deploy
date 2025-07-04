"use client";

import Card from "@/components/common/Card";
import Image from "next/image";
import ArrowLeft from "@/assets/images/arrow-left.svg";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/services/getProperties";
import { Property } from "@/types/property";
import { useEffect, useState } from "react";
import { useListingStore } from "@/store/ListingStore";
import { useMapStore } from "@/store/MapStore";

export default function RankingList() {
  const { type } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { listings, setListings } = useListingStore();
  const { setMode } = useMapStore();

  const [sortBy, setSortBy] = useState("");

  const moveToDetail = (id: number) => {
    router.push(`/listing/${id}?${searchParams.toString()}`);
  };

  const title = {
    popular: "수익형에게 가장 인기 많은 매물",
    distribution: "유통에 유리한 조건을 가진 농지",
    profile: "수익 창출에 유리한 조건을 가진 농지",
  };

  const { data } = useQuery({
    queryKey: ["salesRanking", sortBy],
    queryFn: () => getProperties(sortBy),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.data.content.length) {
      setListings(data.data.content);
      setMode("ranking");
    }
  }, [data, setListings, setMode]);

  useEffect(() => {
    if (type === "popular") {
      setSortBy("liked");
    } else if (type === "distribution") {
      setSortBy("both");
    } else setSortBy("profit");
  }, [type]);

  return (
    <div className="relative">
      <div className="flex items-center gap-[16px] bg-primary-light h-[59px] px-[16px] mb-[8px] border-b-[1px] border-b-gray-300">
        <Image
          src={ArrowLeft}
          alt="left"
          width={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <span className="typo-sub-head-sb">
          {title[type as "popular" | "distribution" | "profile"]}
        </span>
      </div>
      <div className="px-4">
        {listings.map((sale: Property) => (
          <Card
            key={sale.saleId}
            saleId={sale.saleId}
            imageSrc={sale.imgUrl}
            type={sale.saleCategory}
            price={sale.price}
            area={sale.area}
            address={sale.saleAddr}
            kind={sale.landType}
            variant="horizontal"
            crop={sale.mainCrop}
            onClick={() => moveToDetail(sale.saleId)}
            isLiked={sale.isLiked}
          />
        ))}
      </div>
    </div>
  );
}
