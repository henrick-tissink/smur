"use client";

const imgRectangle = "/figma-assets/work/interstellar/row5-full/imgRectangle.jpg";
const imgRectangle2 = "/figma-assets/work/interstellar/row5-full/imgRectangle2.png";
const imgVector = "/figma-assets/work/interstellar/row5-full/imgVector.svg";
const imgGroup = "/figma-assets/work/interstellar/row5-full/imgGroup.svg";
const imgGroup1 = "/figma-assets/work/interstellar/row5-full/imgGroup1.svg";
const imgGroup2 = "/figma-assets/work/interstellar/row5-full/imgGroup2.svg";
const imgRectangle1 = "/figma-assets/work/interstellar/row5-full/imgRectangle1.svg";
const imgVector1 = "/figma-assets/work/interstellar/row5-full/imgVector1.svg";
const imgVector2 = "/figma-assets/work/interstellar/row5-full/imgVector2.svg";
const imgVector3 = "/figma-assets/work/interstellar/row5-full/imgVector3.svg";
const imgVector4 = "/figma-assets/work/interstellar/row5-full/imgVector4.svg";
const imgVector5 = "/figma-assets/work/interstellar/row5-full/imgVector5.svg";
const imgVector6 = "/figma-assets/work/interstellar/row5-full/imgVector6.svg";
const imgVector7 = "/figma-assets/work/interstellar/row5-full/imgVector7.svg";
const imgVector8 = "/figma-assets/work/interstellar/row5-full/imgVector8.svg";
const imgVector9 = "/figma-assets/work/interstellar/row5-full/imgVector9.svg";
const imgVector10 = "/figma-assets/work/interstellar/row5-full/imgVector10.svg";
const imgVector11 = "/figma-assets/work/interstellar/row5-full/imgVector11.svg";
const imgVector12 = "/figma-assets/work/interstellar/row5-full/imgVector12.svg";
const imgVector13 = "/figma-assets/work/interstellar/row5-full/imgVector13.svg";
const imgVector14 = "/figma-assets/work/interstellar/row5-full/imgVector14.svg";
const imgVector15 = "/figma-assets/work/interstellar/row5-full/imgVector15.svg";
const imgVector16 = "/figma-assets/work/interstellar/row5-full/imgVector16.svg";
const imgVector17 = "/figma-assets/work/interstellar/row5-full/imgVector17.svg";
const imgVector18 = "/figma-assets/work/interstellar/row5-full/imgVector18.svg";
const imgVector19 = "/figma-assets/work/interstellar/row5-full/imgVector19.svg";
const imgVector20 = "/figma-assets/work/interstellar/row5-full/imgVector20.svg";
const imgVector21 = "/figma-assets/work/interstellar/row5-full/imgVector21.svg";
const imgVector22 = "/figma-assets/work/interstellar/row5-full/imgVector22.svg";
const imgVector23 = "/figma-assets/work/interstellar/row5-full/imgVector23.svg";
const imgVector24 = "/figma-assets/work/interstellar/row5-full/imgVector24.svg";
const imgVector25 = "/figma-assets/work/interstellar/row5-full/imgVector25.svg";
const imgVector26 = "/figma-assets/work/interstellar/row5-full/imgVector26.svg";
const imgVector27 = "/figma-assets/work/interstellar/row5-full/imgVector27.svg";
const imgVector28 = "/figma-assets/work/interstellar/row5-full/imgVector28.svg";
const imgVector29 = "/figma-assets/work/interstellar/row5-full/imgVector29.svg";
const imgVector30 = "/figma-assets/work/interstellar/row5-full/imgVector30.svg";
const imgVector31 = "/figma-assets/work/interstellar/row5-full/imgVector31.svg";
const imgVector32 = "/figma-assets/work/interstellar/row5-full/imgVector32.svg";
const imgVector33 = "/figma-assets/work/interstellar/row5-full/imgVector33.svg";
const imgVector34 = "/figma-assets/work/interstellar/row5-full/imgVector34.svg";
const imgVector35 = "/figma-assets/work/interstellar/row5-full/imgVector35.svg";
const imgVector36 = "/figma-assets/work/interstellar/row5-full/imgVector36.svg";
const imgVector37 = "/figma-assets/work/interstellar/row5-full/imgVector37.svg";
const imgVector38 = "/figma-assets/work/interstellar/row5-full/imgVector38.svg";
const imgVector39 = "/figma-assets/work/interstellar/row5-full/imgVector39.svg";
const imgVector40 = "/figma-assets/work/interstellar/row5-full/imgVector40.svg";
const imgVector41 = "/figma-assets/work/interstellar/row5-full/imgVector41.svg";
const imgVector42 = "/figma-assets/work/interstellar/row5-full/imgVector42.svg";
const imgVector43 = "/figma-assets/work/interstellar/row5-full/imgVector43.svg";
const imgVector44 = "/figma-assets/work/interstellar/row5-full/imgVector44.svg";
const imgVector45 = "/figma-assets/work/interstellar/row5-full/imgVector45.svg";
const imgVector46 = "/figma-assets/work/interstellar/row5-full/imgVector46.svg";
const imgVector47 = "/figma-assets/work/interstellar/row5-full/imgVector47.svg";
const imgLayer2 = "/figma-assets/work/interstellar/row5-full/imgLayer2.svg";

/*
  INTERSTELLAR Row 5 (Group 105, 297:57903). Frame (282, 4099.84) 889×564.
  Inlines LEFT photo + RIGHT bg vector + 3 overlay groups + Layer_2
  thumbnail + the inner Layer_1 (47 masked vectors at offset chain).

  Faithful-fluid note: the parent desktop page
  (components/sections/interstellar-page.tsx) wraps this component in a
  1440×5075 aspect-ratio stage instead of a fixed 1440×5075 canvas. The
  legacy fixed-canvas version placed everything below the intro (incl.
  this component) inside a `transform: translateY(-330px)` correction
  wrapper — 330px too low vs Figma — which the parent hoists by baking
  the -330 shift into frame-absolute tops. Since this file's own root
  wrapper carries its position as raw px (not the parent's pctX/pctY
  helpers), the ONLY change here vs legacy is this root div's
  left/top/width/height: converted to % of the 1440×5075 stage, with the
  hoisted top (4099.84 - 330 = 3769.84) baked in, so it resolves
  correctly as a direct stage child. Every other px value in this file
  (all 47 vector children below) is LOCAL to this wrapper's own box and
  stays byte-identical to legacy.
*/

const STAGE_W = 1440;
const STAGE_H = 5075;
function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}

export function InterstellarRow5Content() {
  return (
    // Root + right vector snapped to the page grid [283, 1170.2].
    // Hoisted position: top 4099.84 - 330 (see file-header note).
    <div
      className="absolute"
      style={{ left: pctX(283), top: pctY(3769.84), width: pctX(887.2), aspectRatio: "887.2 / 564", containerType: "inline-size" }}
    >
      <div className="relative size-full">
        <div className="absolute h-[63.5708cqw] left-0 top-0 w-[49.0307cqw]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[295.79%] left-[-77.94%] max-w-none top-[-132.95%] w-[256.29%]" src={imgRectangle} />
          </div>
        </div>
        <div className="absolute h-[63.5708cqw] left-[51.3075cqw] top-0 w-[48.6925cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} /></div>
        <div className="absolute h-[11.2615cqw] left-[64.938cqw] top-[25.4835cqw] w-[22.0366cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} /></div>
        <div className="absolute h-[12.8048cqw] left-[70.8837cqw] top-[43.0038cqw] w-[10.1437cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} /></div>
        <div className="absolute h-[7.7108cqw] left-[72.9486cqw] top-[10.7653cqw] w-[6.0132cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} /></div>
        <div className="absolute" style={{ left: "14.8005cqw", top: "9.8039cqw" }}>
          <div className="absolute" style={{ left: "-52.9723cqw", top: "-92.8449cqw" }}>
            <div className="absolute h-[184.0951cqw] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[52.9722cqw_92.8452cqw] mask-size-[19.7106cqw_41.4369cqw] top-0 w-[124.0419cqw]" style={{ maskImage: `url('${imgRectangle1}')` }} />
            <div className="absolute h-[41.089cqw] left-[52.9463cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.0258cqw_-0.2692cqw] mask-size-[19.7106cqw_41.4369cqw] top-[93.1143cqw] w-[19.78cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} /></div>
            <div className="absolute h-[6.3873cqw] left-[53.0128cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.0402cqw_-18.7652cqw] mask-size-[19.7106cqw_41.4369cqw] top-[111.6107cqw] w-[6.3959cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            <div className="absolute h-[6.3873cqw] left-[66.1181cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.1456cqw_-18.7652cqw] mask-size-[19.7106cqw_41.4369cqw] top-[111.6107cqw] w-[6.3959cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            <div className="absolute h-[6.3873cqw] left-[59.5649cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.5929cqw_-18.7652cqw] mask-size-[19.7106cqw_41.4369cqw] top-[111.6107cqw] w-[6.3959cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
            <div className="absolute h-[6.3873cqw] left-[53.0128cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.0402cqw_-25.2953cqw] mask-size-[19.7106cqw_41.4369cqw] top-[118.1402cqw] w-[6.3959cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} /></div>
            <div className="absolute h-[6.3873cqw] left-[66.1181cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.1456cqw_-25.2953cqw] mask-size-[19.7106cqw_41.4369cqw] top-[118.1402cqw] w-[6.3959cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} /></div>
            <div className="absolute h-[6.3873cqw] left-[59.5649cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.5929cqw_-25.2953cqw] mask-size-[19.7106cqw_41.4369cqw] top-[118.1402cqw] w-[6.3959cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} /></div>
            <div className="absolute h-[0.0819cqw] left-[70.5162cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.5446cqw_-3.0589cqw] mask-size-[19.7106cqw_41.4369cqw] top-[95.904cqw] w-[0.9205cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} /></div>
            <div className="absolute h-[0.0819cqw] left-[70.5162cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.5446cqw_-3.4036cqw] mask-size-[19.7106cqw_41.4369cqw] top-[96.2489cqw] w-[0.9205cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector5} /></div>
            <div className="absolute h-[0.0819cqw] left-[70.5162cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.5446cqw_-3.7471cqw] mask-size-[19.7106cqw_41.4369cqw] top-[96.5927cqw] w-[0.9205cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} /></div>
            <div className="absolute h-[4.0174cqw] left-[53.7838cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.8119cqw_-4.7243cqw] mask-size-[19.7106cqw_41.4369cqw] top-[97.5699cqw] w-[4.0205cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector6} /></div>
            <div className="absolute h-[1.3406cqw] left-[53.7883cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.8164cqw_-11.7131cqw] mask-size-[19.7106cqw_41.4369cqw] top-[104.5582cqw] w-[8.8507cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector7} /></div>
            <div className="absolute h-[1.3395cqw] left-[62.8956cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.9237cqw_-11.7109cqw] mask-size-[19.7106cqw_41.4369cqw] top-[104.5559cqw] w-[8.8372cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} /></div>
            <div className="absolute h-[1.1096cqw] left-[54.486cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.5141cqw_-39.3035cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.1495cqw] w-[1.0863cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} /></div>
            <div className="absolute h-[0.944cqw] left-[58.3228cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.3511cqw_-39.2764cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.1213cqw] w-[0.9452cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector10} /></div>
            <div className="absolute h-[0.406cqw] left-[59.0679cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.0963cqw_-40.0037cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.8494cqw] w-[0.4066cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector11} /></div>
            <div className="absolute h-[0.6082cqw] left-[65.1229cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-12.1511cqw_-19.1773cqw] mask-size-[19.7106cqw_41.4369cqw] top-[112.0221cqw] w-[0.6081cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector12} /></div>
            <div className="absolute h-[0.6072cqw] left-[64.956cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.9842cqw_-19.0056cqw] mask-size-[19.7106cqw_41.4369cqw] top-[111.8508cqw] w-[0.6081cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector13} /></div>
            <div className="absolute h-[0.6082cqw] left-[58.555cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.5827cqw_-25.7098cqw] mask-size-[19.7106cqw_41.4369cqw] top-[118.555cqw] w-[0.6081cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector14} /></div>
            <div className="absolute h-[0.6072cqw] left-[58.3882cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5.4159cqw_-25.538cqw] mask-size-[19.7106cqw_41.4369cqw] top-[118.3837cqw] w-[0.6081cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector15} /></div>
            <div className="absolute h-[0.5606cqw] left-[68.6824cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.7102cqw_-3.1433cqw] mask-size-[19.7106cqw_41.4369cqw] top-[95.9885cqw] w-[0.0828cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector16} /></div>
            <div className="absolute h-[0.0819cqw] left-[68.4423cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.4705cqw_-3.3826cqw] mask-size-[19.7106cqw_41.4369cqw] top-[96.2275cqw] w-[0.5622cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector17} /></div>
            <div className="absolute h-[1.0481cqw] left-[68.1977cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.2252cqw_-2.9006cqw] mask-size-[19.7106cqw_41.4369cqw] top-[95.7462cqw] w-[1.0516cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector18} /></div>
            <div className="absolute h-[0.5606cqw] left-[62.7074cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.7353cqw_-39.5578cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.4031cqw] w-[0.0828cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector19} /></div>
            <div className="absolute h-[0.0819cqw] left-[62.4684cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.4958cqw_-39.7971cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.642cqw] w-[0.5622cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector20} /></div>
            <div className="absolute h-[1.0481cqw] left-[62.2227cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.2505cqw_-39.3153cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.1607cqw] w-[1.0516cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector21} /></div>
            <div className="absolute h-[1.2055cqw] left-[69.8794cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.9073cqw_-39.241cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.0863cqw] w-[1.205cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector22} /></div>
            <div className="absolute h-[0.5407cqw] left-[70.2119cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.24cqw_-39.4725cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.3174cqw] w-[0.5398cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector23} /></div>
            <div className="absolute h-[0.3523cqw] left-[70.0631cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.0912cqw_-40.0852cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.9306cqw] w-[0.8366cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector24} /></div>
            <div className="absolute h-[0.37cqw] left-[70.0518cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17.0798cqw_-40.0753cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.9204cqw] w-[0.8579cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector25} /></div>
            <div className="absolute h-[1.2652cqw] left-[69.8478cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-16.8761cqw_-39.2111cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.0559cqw] w-[1.2677cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector26} /></div>
            <div className="absolute h-[1.1555cqw] left-[66.0392cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.0672cqw_-39.2609cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.1066cqw] w-[1.158cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector27} /></div>
            <div className="absolute h-[0.3956cqw] left-[66.4551cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.4826cqw_-39.7641cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.6093cqw] w-[0.3517cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector28} /></div>
            <div className="absolute h-[0.0819cqw] left-[66.0843cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.1119cqw_-39.5268cqw] mask-size-[19.7106cqw_41.4369cqw] top-[132.3726cqw] w-[1.0718cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector29} /></div>
            <div className="absolute h-[0.627cqw] left-[71.392cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-18.4204cqw_-32.4249cqw] mask-size-[19.7106cqw_41.4369cqw] top-[125.2705cqw] w-[0.8903cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector32} /></div>
            <div className="absolute h-[0.627cqw] left-[64.814cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.8421cqw_-32.4249cqw] mask-size-[19.7106cqw_41.4369cqw] top-[125.2705cqw] w-[0.8903cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector32} /></div>
            <div className="absolute h-[0.872cqw] left-[53.5381cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.5656cqw_-9.5017cqw] mask-size-[19.7106cqw_41.4369cqw] top-[102.3467cqw] w-[4.8818cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector38} /></div>
            <div className="absolute h-[0.8708cqw] left-[62.97cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.9974cqw_-6.7585cqw] mask-size-[19.7106cqw_41.4369cqw] top-[99.6032cqw] w-[1.8714cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector39} /></div>
            <div className="absolute h-[0.8708cqw] left-[63.9608cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-10.9886cqw_-6.7585cqw] mask-size-[19.7106cqw_41.4369cqw] top-[99.6032cqw] w-[1.8714cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector40} /></div>
            <div className="absolute h-[0.8708cqw] left-[59.0555cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.0834cqw_-6.713cqw] mask-size-[19.7106cqw_41.4369cqw] top-[99.5582cqw] w-[1.8714cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector41} /></div>
            <div className="absolute h-[19.451cqw] left-[52.9666cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.0056cqw_-16.9305cqw] mask-size-[19.7106cqw_41.4369cqw] top-[109.7757cqw] w-[19.6613cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}>
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle2} />
              </div>
            </div>
            <div className="absolute h-[9.6313cqw] left-[66.0753cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.103cqw_-26.766cqw] mask-size-[19.7106cqw_41.4369cqw] top-[119.6111cqw] w-[6.4955cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector43} /></div>
            <div className="absolute h-[9.618cqw] left-[52.9666cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.0056cqw_-26.5761cqw] mask-size-[19.7106cqw_41.4369cqw] mix-blend-multiply top-[119.4218cqw] w-[6.5963cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector44} /></div>
            <div className="absolute h-[9.618cqw] left-[59.4894cqw] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.5168cqw_-17.0091cqw] mask-size-[19.7106cqw_41.4369cqw] mix-blend-multiply top-[109.8546cqw] w-[6.5963cqw]" style={{ maskImage: `url('${imgRectangle1}')` }}><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector45} /></div>
          </div>
          <div className="absolute left-[2.4617cqw] size-[1.8423cqw] top-[14.5322cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector46} /></div>
          <div className="absolute left-[9.0498cqw] size-[1.8423cqw] top-[14.5322cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector47} /></div>
          <div className="absolute left-[15.4272cqw] size-[1.8423cqw] top-[14.5322cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector47} /></div>
        </div>
        <div className="absolute h-[29.3945cqw] left-[15.736cqw] top-[15.9727cqw] w-[17.2377cqw]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer2} /></div>
      </div>
    </div>
  );
}
