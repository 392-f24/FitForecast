const WarmthLevelInfo = ({ isVisible, category }) => {
  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } absolute bg-white border-black border-[1px] shadow-sm text-xs rounded p-3 z-10 top-6 w-full flex flex-col text-left`}
    >
      <div>
        <p className="font-bold">About Warmth Level</p>
        <p>
          <strong>1</strong>: the lightest {category} you own.
        </p>
        <p>
          <strong>5</strong>: the heaviest or warmest {category} you own.
        </p>
      </div>

      <div className="flex mt-2 gap-8">
        <div className="flex flex-col gap-2">
          <img
            src="https://render.fineartamerica.com/images/images-clothing-body-styles/23-9.png"
            alt="Thin T-Shirt"
            className="w-full h-auto"
          ></img>
          <p>Example of a 1</p>
        </div>

        <div className="flex flex-col gap-2">
          <img
            src="https://img.abercrombie.com/is/image/anf/KIC_120-4042-0161-300_prod1?policy=product-large"
            alt="Sweater T-Shirt"
            className="w-full h-auto"
          ></img>
          <p>Example of a 5</p>
        </div>
      </div>
    </div>
  );
};

export default WarmthLevelInfo;
