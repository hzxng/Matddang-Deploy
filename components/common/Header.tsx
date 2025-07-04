"use client";

import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/images/logo.svg";
import LogoWhite from "@/assets/images/logo-white.svg";
import CloseIcon from "@/assets/images/close.svg";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "../login/LoginModal";
import { useUserStore } from "@/store/UserStore";
import ChevronDown from "@/assets/images/chevron-down.svg";
import { useLoginModalStore } from "@/store/useLoginModalStore";
import { useTokenStore } from "@/store/useTokenStore";
import AddLocationModal from "../location/AddLocationModal";
import { useAddLocationModal } from "@/store/useAddLocationModal";

export default function Header() {
  const { isLogin, name, clearUser } = useUserStore();
  const { clearToken } = useTokenStore();
  const { isOpen } = useLoginModalStore();
  const { isOpen: modalOpen, title, modalClose } = useAddLocationModal();
  const [loginModal, setLoginModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const pathname = usePathname();
  const isLoginHidden = pathname === "/typetest";
  const isGuide = pathname === "/guide";
  const router = useRouter();

  return (
    <div
      className={`min-w-[1007px] relative z-20 h-[65px] px-[50px] pt-[14px] pb-[12px] flex justify-center ${
        isGuide ? "bg-guide-green" : "border-b-[1px] bg-white border-b-gray-300"
      }`}
    >
      <div className="max-w-[1440px] w-full flex justify-between items-center">
        <Image
          src={isGuide ? LogoWhite : Logo}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        {!isLoginHidden &&
          (isLogin ? (
            <div className="flex gap-[24px] font-semibold">
              <button
                className={`w-[103px] text-center cursor-pointer typo-sub-head-sb ${
                  pathname === "/compare-properties"
                    ? "text-primary"
                    : isGuide
                    ? "text-white"
                    : "text-gray-1300"
                }`}
                onClick={() => router.push("/compare-properties")}
              >
                매물비교
              </button>
              <div className="relative">
                <button
                  className="flex gap-[5px] items-center bg-gray-100 border-[1px] border-gray-500 h-[40px] rounded-[8px] py-[8px] px-[12px] cursor-pointer"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  <span className="typo-body-1-b text-nowrap text-black">
                    {name}님
                  </span>
                  <Image
                    src={ChevronDown}
                    alt=""
                    width={14}
                    className="w-[14px] h-auto"
                  />
                </button>
                {openMenu && (
                  <div
                    className="flex flex-col w-[158px] rounded-[15px] absolute top-[48px] right-0 bg-white"
                    style={{
                      boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <button
                      className="py-[16px] typo-sub-head-sb text-black cursor-pointer border-b-[1px] border-b-gray-400"
                      onClick={() => router.push("/mypage")}
                    >
                      마이페이지
                    </button>
                    <button
                      className="py-[16px] typo-sub-head-sb text-black cursor-pointer"
                      onClick={() => {
                        clearUser();
                        clearToken();
                        window.location.replace("/");
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-[14px] items-center">
              {pathname === "/" && showTooltip && (
                <div className="login-tooltip">
                  <span className="typo-body-1-m text-gray-1100">
                    로그인하면 나의 농작유형별 매물을 추천받을 수 있어요!
                  </span>
                  <Image
                    src={CloseIcon}
                    alt="close"
                    width={12}
                    className="cursor-pointer w-[12px] h-auto"
                    onClick={() => setShowTooltip(false)}
                  />
                </div>
              )}
              <button
                className="bg-primary text-white font-semibold text-[18px] text-nowrap w-[96px] h-[37px] rounded-lg cursor-pointer"
                onClick={() => setLoginModal(true)}
              >
                로그인
              </button>
            </div>
          ))}
        {(loginModal || isOpen) && (
          <LoginModal onClose={() => setLoginModal(false)} />
        )}

        {modalOpen && <AddLocationModal title={title} onClose={modalClose} />}
      </div>
    </div>
  );
}
