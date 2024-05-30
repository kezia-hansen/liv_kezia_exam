"use client";
export default function BackBtn() {
  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };
  return (
    <button onClick={goBack} className="text-m bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 backdrop-blur-md transition-all hover:scale-105 border-4 border-lime-400 rounded-2xl text-lime-400 cursor-pointer h-14 px-12 max-w-s" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
      {" "}
      &#8592; BACK{" "}
    </button>
  );
}
