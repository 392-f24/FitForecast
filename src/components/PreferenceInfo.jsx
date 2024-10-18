const PreferenceInfo = ({ isVisible }) => {
  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } absolute bg-white border-black border-[1px] shadow-sm text-xs rounded p-3 z-10 top-6 w-full flex flex-col text-left`}
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold">About Preference</p>
        <p>
          <strong>1</strong>: this is not your favorite item of clothing so we
          will suggest it less.
        </p>
        <p>
          <strong>10</strong>: you love this item of clothing and you love to
          wear it often.
        </p>
      </div>
    </div>
  );
};

export default PreferenceInfo;
