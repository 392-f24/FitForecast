const ClothesCard = ({ url, name }) => {
  return (
    <div className="p-2 bg-gray-100 flex justify-center items-center rounded-lg">
      <img src={url} alt={name} className="object-contain h-56 w-56" />
    </div>
  );
};

export default ClothesCard;
