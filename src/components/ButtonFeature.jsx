import { Link } from "react-router-dom";

export const ButtonFeature = ({ productId }) => {

 
    return (            
        <>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            <div className="rainbow absolute  overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 ">
             <Link to={`/product/${productId}`}>
                <button className="px-5 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                    Explore Plugin
                </button>
             </Link>  
            </div>
        </>
    );
};