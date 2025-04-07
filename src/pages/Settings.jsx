import { getLoggedInUser, supabase } from "../providers/supabaseAuth";
import React, { useState, useEffect } from "react";
import { useUser } from "../Components/ProtectedRoute";
import { usePut } from "../api/usePut";

export default function Settings() {
	const user = useUser();
	const { putData, loading:isUpdating, error:updateError } = usePut();
	const [formData, setFormData] = useState({
		email: "",
		first_name: "",
		last_name: "",
		country: "",
		created_at: "",
	});
	const [message, setMessage] = useState({ text: "", type: "" });
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (user) {
			setFormData({
			// full_name: currentUser.user_metadata?.full_name || "",
				username: user.user_metadata?.username || "",
				email: user.email || "",
				first_name: user.first_name || "",
				last_name: user.last_name || "",
				country: user.country || "",
				created_at: user.created_at
				? new Date(user.created_at).toLocaleDateString()
				: "",
			});
			setIsLoading(false);
		}
	}, [user]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		// setIsLoading(true);
		try {
			const updateData = {
				first_name: formData.first_name,
				last_name: formData.last_name,
				country: formData.country,
			}
			await putData('user', updateData);
			setMessage({ text: "Profile updated successfully!", type: "success" });
		} catch (error) {
			setMessage({ text: error.message, type: "error" });
		} finally {
			setIsLoading(false);
		}
	};

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        <div className="flex justify-center items-center h-32">
          Loading user data...
        </div>
      </div>
    );
  }
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
          disabled={isUpdating}
          className={`w-full p-2 text-white rounded-md ${
            isUpdating ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
