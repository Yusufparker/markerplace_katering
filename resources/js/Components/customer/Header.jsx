import React from 'react'

const Header = () => {
    return (
        <div
            className="bg-gray-200 bg-cover bg-center text-center py-40 mt-0.5"
            style={{
                backgroundImage: "url('/img/marketplace background.jpg')",
            }}
        >
            <h1 className="text-3xl font-semibold text-gray-800">
                Selamat Datang di Marketplace Katering
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                Temukan berbagai paket katering untuk acara Anda!
            </p>
        </div>
    )
}

export default Header
