"use client";

import { useState, useEffect } from "react";

export default function IntroNote() {
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const noteAlreadySeen = localStorage.getItem("introNoteSeen");

    if (!noteAlreadySeen) {
      setShowNote(true);
    }
  }, []);

  const handleCloseNote = () => {
    setShowNote(false);
    localStorage.setItem("introNoteSeen", "true");
  };

  if (!showNote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-xl w-[90%] bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-10 rounded-2xl shadow-2xl text-center">
        
        <button
          onClick={handleCloseNote}
          className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-2xl font-light shadow-md cursor-pointer"
          title="Close"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-3">🎬 Welcome to Movie Finder</h2>
        <p className="text-lg leading-relaxed">
          This is a very easy-to-use app.  
          It allows you to search for any movie by typing any word in its title.  
          <br/>✅You can also mark movies as{" "}
          <span className="font-semibold text-red-400">favorites</span> by clicking the ❤️ icon on each movie card.   
          <br/>✅Once you have marked some movies as favorites, you can view them by clicking the{" "}
          <span className="text-sm px-2 py-2 rounded-lg bg-red-900 text-white font-semibold uppercase">Favorites</span> button. 
          <br/>✅Press the &apos;Back&apos; button there and you will come back to your search again 🔎. 
          <br />👉This type of app can be used to search for books, cooking recipes, or other items included in an API.
        </p>
      </div>
    </div>
  );
}