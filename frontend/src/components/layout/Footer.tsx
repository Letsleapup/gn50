const Footer: React.FC = () => {
  return (
    <footer className="relative w-screen left-[calc(-50vw+50%)] text-[#ffffff] bg-black border-t border-[#323232]">
      <div className="max-w-[1920px] mx-auto pt-[60px] pb-[80px] px-5 md:px-8 lg:px-[311px]">
        <p className="font-bold text-[22px] leading-[30px] tracking-[-0.55px] opacity-100">
          (주)렛츠립업
        </p>
        <div className="flex flex-wrap gap-[12px] text-[15px] leading-[30px] tracking-[-0.38px]">
          <div>주소 : 제주특별자치도 제주시 일주동로 324, 2층</div>
          <div>대표자 : 김희영 </div>
          <div>사업자 등록번호 : 899-87-03465</div>
        </div>
        <p className="text-[15px] leading-[30px] tracking-[-0.38px]">
          &copy; 렛츠립업. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
