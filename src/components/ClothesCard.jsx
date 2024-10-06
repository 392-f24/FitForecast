function ClothesCard({ clothes }) {
  return (
    <div className="p-2 bg-gray-100 flex justify-center items-center rounded-lg">
      <img
        src={clothes.image}
        alt={clothes.name}
        className="object-cover h-full w-full"
      />
    </div>
  );
}

export default ClothesCard;
