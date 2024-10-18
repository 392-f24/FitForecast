const WarmthLevelInfo = ({ isVisible, category }) => {
  const examples = () => {
    if (category === "t-shirt") {
      return {
        ex1: "A thing, breathable athletic or summer tshirt. E.g. a cotton/polyester t-shirt.",
        ex5: "A thick, heavyweight t-shirt meant for layering or warmth. E.g.a cottom/wool t-shirt.",
        img1: "https://render.fineartamerica.com/images/images-clothing-body-styles/23-9.png",
        img5: "https://img.abercrombie.com/is/image/anf/KIC_120-4042-0161-300_prod1?policy=product-large",
      };
    } else if (category === "pants") {
      return {
        ex1: "Thin, breathable pants for hot weather. E.g. linen or cotton pants",
        ex5: "Thick, fleece-lined pants or insulated pants designed for very cold weather. E.g. sweatpants or snow pants.",
        img1: "https://media.bostonproper.com/i/bostonproper/2BR6380_3?w=1400&fmt=auto",
        img5: "https://www.tgipromo.com/wp-content/uploads/2021/04/Gildan18200__Navy.png",
      };
    } else if (category === "jacket") {
      return {
        ex1: "A lightweight jacket meant for hot weather. E.g. a sun protectant jacket.",
        ex5: "A thick jacket meant for cold weather. E.g. a curdoroy or fleece jacket.",
        img1: "https://ae01.alicdn.com/kf/S76e0f13b1ca7485783b0677e475c9d868/Summer-Men-Thin-Jacket-Sun-Protection-Unisex-Comfortable-Light-Thin-Stand-up-Collar-Zipper-Outdoor-Windbreaker.jpg",
        img5: "https://levitatebrand.com/cdn/shop/files/MENS-BACKROADS-SHIRT-JACKET-DIJON_26433423-4855-4cc4-b2db-7e92cbfbd974.png?v=1726864780&width=1920",
      };
    } else if (category === "shirt") {
      return {
        ex1: "A lightweight dress shirt. E.g. a linen or cotton shirt.",
        ex5: "A thick, flannel shirt meant for layering in colder weather. E.g. a plaid flannel shirt.",
        img1: "https://shopwyeth.com/cdn/shop/files/Woven_Linen_Mylo_Shirt_White_1600x.png?v=1717198008",
        img5: "https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/products/433/3553/52470-69C2-NLmin__34899.1724170511.png?c=3",
      };
    } else if (category === "long sleeve") {
      return {
        ex1: "A thin, long-sleeved cotton t-shirt. E.g. a basic long-sleeve tee.",
        ex5: "A thick, thermal or fleece-lined long-sleeve shirt. E.g. a thermal base layer shirt.",
        img1: "https://www.vermontcountrystore.com/ccstore/v1/images/?source=/file/v379610169509345411/products/84942.wht.png&height=300&width=300",
        img5: "https://cdn11.bigcommerce.com/s-vhimnvf2fd/images/stencil/2000x2000/products/591/2433/400CL-Mens-Thermal-Crewneck-Shirt---Charcoal__24996__43109.1721749249.png?c=1",
      };
    } else if (category === "dress") {
      return {
        ex1: "A light summer dress made from breathable fabric. E.g. a cotton or linen dress.",
        ex5: "A thick sweater dress or wool dress for cold weather. E.g. a cable-knit sweater dress.",
        img1: "https://webcdn.protest.eu/resize?type=auto&stripmeta=true&url=https%3A%2F%2Fpim.protest.eu%2FProductMedia%2F2024-01%2FGIRLS%2FDRES-SKIRT%2F2920443%2F2920443_471_front.png&quality=85&width=400",
        img5: "https://hirshleifers.com/cdn/shop/files/b2060ee306cd20a866d8dc043d349482.png?v=1724785203&width=640",
      };
    } else if (category === "shorts") {
      return {
        ex1: "Thin, breathable shorts for hot weather. E.g. athletic or linen shorts.",
        ex5: "Thick fleece-lined or insulated shorts for colder temperatures. E.g. winter fleece shorts.",
        img1: "https://raskolapparel.com/cdn/shop/products/raskolmeshshortsblack1_2400x.png?v=1637124532",
        img5: "https://shop.mancity.com/dw/image/v2/BDWJ_PRD/on/demandware.static/-/Sites-master-catalog-MAN/default/dw385379e8/images/large/701221098003_pp_01_mcfc.png?sw=1600&sh=1600&sm=fit",
      };
    } else if (category === "skirt") {
      return {
        ex1: "A lightweight, flowy skirt made from cotton or chiffon. E.g. a summer midi skirt.",
        ex5: "A heavy, woolen skirt designed for cold weather. E.g. a wool pencil skirt.",
        img1: "https://www.acacia.co/cdn/shop/files/PETITEROSE_repeat_blue_min_dfdfbc1a-a33a-46e9-af41-af6b9011e3c1.png?v=1683672746&width=1121",
        img5: "https://www.luistrenker.com/media/c2/fd/f8/1721218637/K43967-8200-1.png?ts=1721218637",
      };
    } else if (category === "sweater") {
      return {
        ex1: "A lightweight sweater made from cotton or a thin knit. E.g. a light cotton sweater.",
        ex5: "A thick wool or cashmere sweater for colder weather. E.g. a chunky wool turtleneck sweater.",
        img1: "https://www.aggielandoutfitters.com/cdn/shop/files/Maroon_V-Neck_Thin_Sweater_grande.png?v=1725488093",
        img5: "https://i.ebayimg.com/images/g/oVcAAOSwDsVhyADp/s-l400.png",
      };
    } else if (category === "hoodie") {
      return {
        ex1: "A thin, lightweight hoodie for casual wear. E.g. a basic cotton hoodie.",
        ex5: "A thick, fleece-lined hoodie meant for warmth. E.g. a sherpa-lined hoodie.",
        img1: "https://madeblanks.com/cdn/shop/files/CROSSCOUNTRYZIPHOODIE-PFDFRONT.png?v=1691540493&width=1445",
        img5: "https://www.flagandanthem.com/cdn/shop/files/COREKT1329-MILTON-LS-SOFT-BRUSHED-THERMAL-1-4-ZIP-HOODIE-CHARCOAL_006.png?v=1727719244&width=1080",
      };
    } else if (category === "coat") {
      return {
        ex1: "A lightweight coat for mild weather. E.g. an unlined trench coat.",
        ex5: "A thick, down-filled parka or heavy wool coat for extreme cold. E.g. a puffer coat or winter parka.",
        img1: "https://www.meshki.us/cdn/shop/files/B892023.09.27MESHKI_16792.png?v=1725293767",
        img5: "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto/v1635731195/product-image/3035L_61_p.png",
      };
    }
  };

  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } absolute bg-white border-black border-[1px] shadow-sm text-xs rounded p-3 z-10 top-6 w-full flex flex-col text-left overflow-y-auto max-h-64`}
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold">About Warmth Level</p>
        <div>
          <p>
            <strong>1</strong>: the lightest {category} you own.
          </p>
          {examples().ex1 !== "" && (
            <ul className="list-disc pl-5">
              <li>
                <em>{examples().ex1}</em>
              </li>
            </ul>
          )}
          {examples().img1 !== "" && (
            <img
              src={examples().img1}
              alt="Thin T-Shirt"
              className="w-1/2 h-auto m-auto"
            ></img>
          )}
        </div>

        <div>
          <p>
            <strong>5</strong>: the heaviest or warmest {category} you own.
          </p>
          {examples().ex5 !== "" && (
            <ul className="list-disc pl-5">
              <li>
                <em>{examples().ex5}</em>
              </li>
            </ul>
          )}
          {examples().img5 !== "" && (
            <img
              src={examples().img5}
              alt="Sweater T-Shirt"
              className="w-1/2 h-auto m-auto"
            ></img>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarmthLevelInfo;
