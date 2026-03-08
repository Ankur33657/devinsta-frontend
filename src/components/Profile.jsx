import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User, Edit3, Image as ImageIcon, Info, X, Save } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const [data, setData] = useState({});
  const [count, setCount] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [hobby, setHobby] = useState();
  const [interest, setInterest] = useState();

  const navigate = useNavigate();

    const addChip = (e, source) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = e.target.value.trim();
        if (value) {
          setData((prev) => ({
            ...prev,
            [source]: [...(prev[source] || []), value],
          }));
          if (source === "hobby") setHobby("");
          if (source === "interest") setInterest("");
        }
      }
    };

    const removeChip = (index, source) => {
      setData((prev) => ({
        ...prev,
        [source]: prev[source].filter((_, i) => i !== index),
      }));
    };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
          {
            method: "GET",
            credentials: "include", // Necessary to send cookies
          },
        );

        if (!res.ok) {
          navigate("/login");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();
    connection();
  }, []);

  const handleEdit = async () => {
    try {
      const currentData = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        gender: data?.gender,
        dob: data?.dob,
        bio: data?.bio,
        hobby: data?.hobby,
        interest: data?.interest,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/edit`,
        {
          method: "PATCH",
          credentials: "include", // Ensures cookies are sent if applicable
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentData),
        },
      );
      setIsEdit((prev) => !prev);
      if (response.ok) {
        navigate("/profile");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.log("Error hhh", error.message);
    }
  };

  const connection = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/allcountconnection`, {
        method: "GET",
        credentials: "include", // Necessary to send cookies
      });
      const json = await res.json();

      setCount(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6 pb-12 px-4"
    >
      <div className="glass-dark p-8 flex flex-col items-center text-center relative overflow-hidden group">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-emerald-500 shadow-lg">
            <img
              src="https://picsum.photos/seed/alex-profile/200/200"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-[#06090f]"
            />
          </div>

          <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-[#06090f] rounded-full" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-1">
          {data?.firstName + " " + data?.lastName}
        </h2>

        <p className="text-slate-400 mb-2 text-sm">
          {data?.bio?.slice(0, 50)} {data?.bio?.length > 50 ? "..." : ""}
        </p>

        <div className="flex gap-12 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {count?.pending_count}
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Pending
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {count?.connection_count}
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Connections
            </div>
          </div>
        </div>

        <button
          className="btn-gradient"
          onClick={() => {
            if (isEdit) handleEdit();
            else setIsEdit((prev) => !prev);
          }}
        >
          {isEdit ? <Save size={16} /> : <Edit3 size={16} />}

          {isEdit ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className="glass-dark p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <User size={20} />
          </div>

          <h3 className="text-xl font-bold text-white">Profile Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="label-modern">First Name</label>
            <input
              disabled={!isEdit}
              key={data?._id + "fn"}
              type="text"
              value={data?.firstName || ""}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className="input-modern"
            />
          </div>

          <div className="space-y-2">
            <label className="label-modern">Last Name</label>
            <input
              disabled={!isEdit}
              key={data?._id + "ln"}
              type="text"
              value={data?.lastName || ""}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="input-modern"
            />
          </div>

          <div className="space-y-2">
            <label className="label-modern">Gender</label>

            <select
              disabled={!isEdit}
              key={data?._id + "gen"}
              value={data?.gender || ""}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
              className="input-modern bg-[#111827] text-white"
            >
              <option value="Male" className="bg-[#111827] text-white">
                Male
              </option>
              <option value="Female" className="bg-[#111827] text-white">
                Female
              </option>
              <option value="Other" className="bg-[#111827] text-white">
                Other
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="label-modern text-white">Date of Birth</label>
            <input
              disabled={!isEdit}
              type="date"
              value={data?.dob || ""}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
              className="input-modern"
            />
          </div>
        </div>
      </div>

      <div className="glass-dark p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <ImageIcon size={20} />
          </div>

          <h3 className="text-xl font-bold text-white">Other Images</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="tooltip tooltip-top"
              data-tip="Upload image"
            >
              <div className="aspect-square rounded-xl bg-[#111827]/60 border border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition cursor-pointer group">
                <ImageIcon
                  size={30}
                  className="opacity-40 group-hover:opacity-100"
                />
                <span className="text-[10px] mt-2 uppercase">Add Image</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-dark p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Info size={20} />
          </div>

          <h3 className="text-xl font-bold text-white">More About Me</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="label-modern">Hobby</label>

              <input
                disabled={!isEdit}
                value={hobby || ""}
                onChange={(e) => setHobby(e.target.value)}
                onKeyDown={(e) => addChip(e, "hobby")}
                placeholder="Type Hobby and press Enter"
                className="input-modern"
              />

              <div className="flex flex-wrap gap-2">
                {data?.hobby?.map((chip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium"
                  >
                    {chip}
                    <button
                      type="button"
                      onClick={() => removeChip(index, "hobby")}
                      disabled={!isEdit}
                      className="hover:text-white cursor-pointer disabled:cursor-not-allowed"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="label-modern">Interested In</label>

              <input
                disabled={!isEdit}
                value={interest || ""}
                onChange={(e) => setInterest(e.target.value)}
                onKeyDown={(e) => addChip(e, "interest")}
                placeholder="Type interest and press Enter"
                className="input-modern"
              />

              <div className="flex flex-wrap gap-2">
                {data?.interest?.map((chip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium"
                  >
                    {chip}
                    <button
                      type="button"
                      onClick={() => removeChip(index, "interest")}
                      disabled={!isEdit}
                      className="hover:text-white cursor-pointer disabled:cursor-not-allowed"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <label className="label-modern">Bio</label>

              <textarea
                disabled={!isEdit}
                rows={4}
                maxLength={200}
                value={data?.bio || ""}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                className="input-modern resize-none"
                placeholder="Tell us about yourself..."
              />

              <div className="text-xs text-slate-500 text-right">
                {data?.bio?.length || 0}/200
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
