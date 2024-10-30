const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-[#ffffff] w-full bg-black border-t">
      <div className="container mx-auto px-4">
        <p className="font-bold text-[22px] leading-[30px] tracking-[-0.55px] opacity-100">
          (주) 렛츠립업
        </p>
        <div className="flex flex-1 gap-[36px] text-[15px] leading-[30px] tracking-[-0.38px]">
          <div>주소 : 제주특별자치도 제주시 일주동로 324 2층</div>
          <div>대표자 : 김희영</div>
          <div> 사업자 등록번호 : 889-87-03465</div>
        </div>
        <p className="text-[15px] leading-[30px] tracking-[-0.38px]">
          &copy; 렛츠립업. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
