import { Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-10 py-6 border-b">
                {/* Logo + Title */}
                <div className="flex items-center gap-4">
                    <img
                        src="/PITON LOGO.png"
                        alt="PITON Logo"
                        className="h-12 w-12 object-contain"
                    />

                    <div>
                        <h1 className="text-xl font-bold text-blue-700">
                            PITON Tabulation System
                        </h1>
                        <p className="text-sm text-gray-500">
                            Philippine Information Technology of the North
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            {/* <Link
                                href={route("login")}
                                className="px-5 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                            >
                                Login
                            </Link> */}

                            {/* <Link
                                href={route("register")}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Register
                            </Link> */}
                        </>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative flex flex-1 items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
                {/* Animated Gradient Blob */}
                <div className="absolute w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-3xl animate-blob top-[-200px] left-[-200px]"></div>
                <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 bottom-[-150px] right-[-150px]"></div>

                <div className="relative max-w-6xl grid md:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Welcome to the PITON Tabulation System
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            A digital platform designed to simplify candidate
                            evaluation and scoring during PITON events and
                            competitions. The system ensures fair, accurate, and
                            real-time tabulation of scores from judges.
                        </p>

                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                Start Tabulating
                            </Link>
                        )}
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center">
                        <img
                            src="/PITON LOGO.png"
                            alt="PITON Logo"
                            className="w-72 drop-shadow-xl hover:scale-105 transition duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">
                            Real-Time Scoring
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Judges can input scores instantly while the system
                            automatically calculates totals and averages.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">
                            Accurate Ranking
                        </h3>
                        <p className="text-gray-600 text-sm">
                            The platform automatically ranks candidates based on
                            weighted criteria and judge scores.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">
                            Judge Management
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Manage judges, categories, criteria, and candidate
                            data easily through the system.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-sm text-gray-500 border-t">
                © {new Date().getFullYear()} Philippine Information Technology
                of the North
            </footer>
        </div>
    );
}
