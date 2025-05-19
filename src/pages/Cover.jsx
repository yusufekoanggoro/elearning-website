import { useNavigate } from "react-router-dom";

export default function Cover() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center space-y-6 max-w-lg">
                <h1 className="text-5xl font-medium text-blue-700">
                    Keragaman Indonesia
                </h1>
                <p className="text-md text-gray-700">
                    Jelajahi keindahan budaya, suku, bahasa, dan tradisi yang memperkaya Nusantara.
                </p>
                <button
                    onClick={() => navigate('/home')}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
                    style={{ boxShadow: '0px 3px 6px rgba(0,0,0,0.16)' }}
                >
                    Masuk
                </button>
            </div>
        </div>
    );
}
