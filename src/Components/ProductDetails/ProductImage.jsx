function ProductImage({ image, name }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <img
          src={image || "/images/placeholder.png"}
          alt={name}
          className="w-full h-[500px] object-cover"
        />
      </div>
    </div>
  );
}

export default ProductImage;
