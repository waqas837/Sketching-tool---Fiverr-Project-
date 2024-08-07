import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../Api";
import toast, { Toaster } from "react-hot-toast";

const CreateGameForm = ({ categoriesIds }) => {
  const [gameName, setGameName] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [gameid, setgameid] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    let loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      toast.error("يرجى تسجيل الدخول أولاً.");
      return;
    }

    loggedInUser = JSON.parse(loggedInUser);

    if (!gameName || !team1 || !team2) {
      setError("جميع الحقول مطلوبة.");
      return;
    }

    if (categoriesIds.length < 6) {
      setError("Please Select at least 6 Categories Above.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let gameCreate = {
        userId: loggedInUser._id,
        categoriesIds,
        gameName, // Include gameName in the request
        team1, // Include team1 in the request
        team2, // Include team2 in the request
      };
      let { data } = await axios.post(`${apiUrl}/user/createGame`, gameCreate);
      if (data.success === false) {
        toast.error("Your limit is reached. Please buy package instead.");
      } else if (data.success) {
        console.log("needed data", data.gameid);

        toast.success(data.message);
        setGameName("");
        setTeam1("");
        setTeam2("");
        navigate("/started-game", {
          state: {
            categoriesIds,
            gameId: data.gameid,
            teams: { gameName, team1, team2 },
          },
        });
      }
    } catch (error) {
      console.error("error", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">
              أنشئ مباراة جديدة
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-red-300 text-center bg-red-500 bg-opacity-20 py-2 rounded-lg">
                  {error}
                </p>
              )}
              <div className="space-y-2">
                <label htmlFor="gameName" className="text-white font-medium">
                  اسم اللعبة
                </label>
                <div className="relative">
                  <Trophy
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300"
                    size={20}
                  />
                  <input
                    id="gameName"
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-transparent rounded-xl focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-white placeholder-gray-300"
                    placeholder="أدخل اسم اللعبة"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="team1" className="text-white font-medium">
                  الفريق الأول
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300"
                    size={20}
                  />
                  <input
                    id="team1"
                    type="text"
                    value={team1}
                    onChange={(e) => setTeam1(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-transparent rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-white placeholder-gray-300"
                    placeholder="أدخل اسم الفريق الأول"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="team2" className="text-white font-medium">
                  الفريق الثاني
                </label>
                <div className="relative">
                  <Users
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300"
                    size={20}
                  />
                  <input
                    id="team2"
                    type="text"
                    value={team2}
                    onChange={(e) => setTeam2(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-transparent rounded-xl focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-white placeholder-gray-300"
                    required
                    placeholder="أدخل اسم الفريق الثاني"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full py-4 px-6 rounded-xl text-white font-semibold ${
                  loading
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
                } transition-all duration-300 shadow-lg`}
                disabled={loading}
              >
                {loading ? "جارٍ إنشاء المباراة..." : "بدء المباراة"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreateGameForm;
