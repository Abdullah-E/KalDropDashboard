import { getLoggedInUser, supabase } from "../providers/supabaseAuth";
import React, { useState, useEffect } from "react";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    country: "",
    created_at: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const loadUserData = async () => {
      const currentUser = await getLoggedInUser();
      if (currentUser) {
        setUser(currentUser);
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .single();
        setFormData({
          full_name: currentUser.user_metadata?.full_name || "",
          username: currentUser.user_metadata?.username || "",
          email: currentUser.email || "",
          first_name: data?.first_name || "",
          last_name: data?.last_name || "",
          country: data?.country || "",
          created_at: data?.created_at
            ? new Date(data.created_at).toLocaleDateString()
            : "",
        });
      }
    };
    loadUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          username: formData.username,
        },
      });
      if (error) throw error;
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      {message.text && (
        <div
          className={`p-4 mb-4 ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } rounded-md`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Created At</label>
          <input
            type="text"
            name="created_at"
            value={formData.created_at}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
