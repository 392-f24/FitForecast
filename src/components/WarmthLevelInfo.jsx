const WarmthLevelInfo = ({ isVisible, category }) => {
  const level1 = () => {
    if (category === "t-shirt") {
      return "https://render.fineartamerica.com/images/images-clothing-body-styles/23-9.png";
    } else if (category === "pants") {
      return "https://media.bostonproper.com/i/bostonproper/2BR6380_3?w=1400&fmt=auto";
    } else if (category === "jacket") {
      return "https://ae01.alicdn.com/kf/S76e0f13b1ca7485783b0677e475c9d868/Summer-Men-Thin-Jacket-Sun-Protection-Unisex-Comfortable-Light-Thin-Stand-up-Collar-Zipper-Outdoor-Windbreaker.jpg";
    } else if (category === "shirt") {
    } else if (category === "long sleeve") {
    } else if (category === "dress") {
    } else if (category === "shorts") {
    } else if (category === "skirt") {
    } else if (category === "sweater") {
    } else if (category === "hoodie") {
    } else if (category === "coat") {
    }

    return "";
  };

  const level5 = () => {
    if (category === "t-shirt") {
      return "https://img.abercrombie.com/is/image/anf/KIC_120-4042-0161-300_prod1?policy=product-large";
    } else if (category === "pants") {
      return "https://www.tgipromo.com/wp-content/uploads/2021/04/Gildan18200__Navy.png";
    } else if (category === "jacket") {
      return "https://levitatebrand.com/cdn/shop/files/MENS-BACKROADS-SHIRT-JACKET-DIJON_26433423-4855-4cc4-b2db-7e92cbfbd974.png?v=1726864780&width=1920";
    } else if (category === "shirt") {
    } else if (category === "long sleeve") {
    } else if (category === "dress") {
    } else if (category === "shorts") {
    } else if (category === "skirt") {
    } else if (category === "sweater") {
    } else if (category === "hoodie") {
    } else if (category === "coat") {
    }

    return "";
  };

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

      {level1() && level5() && (
        <div className="flex mt-2 gap-8">
          <div className="flex flex-col gap-2 w-1/2 h-auto self-end">
            <img
              src={level1()}
              alt="Thin T-Shirt"
              className="w-full h-auto"
            ></img>
            <p>Example of a 1</p>
          </div>

          <div className="flex flex-col gap-2 w-1/2 h-auto self-end">
            <img
              src={level5()}
              alt="Sweater T-Shirt"
              className="w-full h-auto"
            ></img>
            <p>Example of a 5</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarmthLevelInfo;
