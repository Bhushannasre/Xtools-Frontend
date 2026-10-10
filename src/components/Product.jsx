import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { xData } from "../utils/Data";

const BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      try {
        if (!id) {
          throw new Error("Product ID is missing");
        }

        const apiUrl = `${BASE_URL}/api/products/${id}`;

        console.log("Loading product from:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          let message = `Product API failed: ${response.status}`;

          try {
            const payload = await response.json();
            message = payload.error || message;
          } catch {
            // Ignore invalid JSON
          }

          throw new Error(message);
        }

        const payload = await response.json();

        if (!payload?.data) {
          throw new Error("Invalid product response");
        }

        console.log("Product loaded:", payload.data);

        if (!cancelled) {
          setProduct(payload.data);
        }
      } catch (error) {
        console.error("Failed to load product:", error);

        /*
         * Keep old static products working if API is unavailable.
         */
        const staticProduct = xData.find(
          (item) => String(item.id) === String(id)
        );

        if (!cancelled) {
          setProduct(staticProduct || null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

          <p className="text-slate-400">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Product not found
          </h1>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productName =
    product.title || product.name || "Product";

  /*
   * The backend's /api/products and /api/products/:id responses now always
   * return a complete, fully-qualified `image` URL (either the product's
   * real absolute imageUrl, or the Mongo-backed /api/products/:id/image
   * route built from the request's own origin). No origin-guessing needed
   * here anymore — the old relative-path prefix logic incorrectly assumed
   * every relative image path lived on the API's own origin, which broke
   * for frontend-local asset paths. Fall back to the id-based route only
   * as a last resort if `image` is missing entirely.
   */
  const productImage =
    product.image || `${BASE_URL}/api/products/${product.id}/image`;

  const handleDownload = () => {
    if (!product.downloadLink) {
      console.error(
        "No download link available for this product."
      );
      return;
    }

    window.open(
      product.downloadLink,
      "_blank",
      "noopener,noreferrer"
    );

    fetch(`${BASE_URL}/api/downloads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        productName,
        downloadLink: product.downloadLink,
      }),
      keepalive: true,
    }).catch((error) => {
      console.error(
        "Download tracking failed:",
        error
      );
    });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      {/* <svg
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        viewBox="0 0 1440 720"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle
          cx="1372.48"
          cy="618.205"
          r="308.334"
          stroke="#FF5722"
          strokeOpacity=".7"
        />

        <circle
          cx="16.942"
          cy="20.834"
          r="308.334"
          stroke="#299253"
          strokeOpacity=".7"
        />
      </svg> */}/
        <svg
  className="absolute inset-0 z-0 w-full h-full"
  viewBox="10 10 1440 720"
  fill="none"
  preserveAspectRatio="none"
>
  {/* LEFT X - GREEN */}
  <path
    d="M-80 80 L280 360 L-80 640"
    stroke="#9CFF00"
    strokeWidth="2"
    strokeOpacity="0.65"
  />

  <path
    d="M80 80 L440 360 L80 640"
    stroke="#9CFF00"
    strokeWidth="1.5"
    strokeOpacity="0.25"
  />

  {/* CENTER X - CYAN */}
                

  <path
    d="M470 40 L840 360 L470 680"
    stroke="#00C2CB"
    strokeWidth="1.5"
    strokeOpacity="0.3"
  />

  {/* RIGHT X - ORANGE */}
  <path
    d="M1160 80 L1520 360 L1160 640"
    stroke="#FF5722"
    strokeWidth="2"
    strokeOpacity="0.7"
  />

  <path
    d="M1000 80 L1360 360 L1000 640"
    stroke="#FF5722"
    strokeWidth="1.5"
    strokeOpacity="0.25"
  />

  {/* Subtle horizontal line */}
  <path
    d="M0 680 H1440"
    stroke="#28834C"
    strokeWidth="1"
    strokeOpacity="0.35"
  />
</svg>

      <main className="relative z-10 min-h-screen px-4 py-20 sm:px-6 sm:py-24 md:p-10 flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-8 border border-slate-700 p-3 sm:p-4 rounded-lg max-w-full break-words">
          {productName}
        </h1>

        {/* Product image */}
        <div className="w-full flex justify-center mt-6">
          {imageError ? (
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg h-56 sm:h-72 md:h-96 border border-red-500/40 rounded-lg flex flex-col items-center justify-center px-6">
              <p className="text-red-400 font-medium">
                Product image failed to load
              </p>

              <p className="text-xs text-slate-500 mt-2 break-all">
                {productImage}
              </p>
            </div>
          ) : (
            <img
              key={productImage}
              src={productImage}
              alt={productName}
              loading="eager"
              className="w-full max-w-xs sm:max-w-sm md:max-w-lg max-h-[18rem] sm:max-h-80 md:max-h-[28rem] object-contain rounded-lg"
              onError={(event) => {
                console.error(
                  "PRODUCT IMAGE FAILED:",
                  event.currentTarget.src
                );

                setImageError(true);
              }}
            />
          )}
        </div>

        {/* Description */}
        <p className="mt-6 max-w-3xl px-1 text-sm sm:text-base leading-6 sm:leading-7 text-slate-100 whitespace-pre-line">
          {product.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 w-full">
          {/* Download */}
          <div className="mt-8 sm:mt-10 relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)]">
            <button
              type="button"
              onClick={handleDownload}
              className="relative z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full min-w-[11rem] px-6 py-3 flex justify-center items-center gap-2 font-medium text-sm cursor-pointer transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#f6efef"
                aria-hidden="true"
              >
                <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
              </svg>

              Download
            </button>
          </div>

          {/* Back */}
          <div className="mt-2 sm:mt-10 relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)]">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="relative z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-5 sm:px-8 py-3 font-medium text-sm cursor-pointer flex items-center justify-center gap-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                viewBox="0 -960 960 960"
                width="24"
                fill="#f3ecec"
                aria-hidden="true"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>

              Back to Products
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;