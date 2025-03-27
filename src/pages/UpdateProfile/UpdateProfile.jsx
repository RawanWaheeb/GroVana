import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageVersion, setImageVersion] = useState(0);
  const [profileImage, setProfileImage] = useState("/default-profile.png");

  const token = localStorage.getItem("accessToken");
  const authHeader = `Bearer ${token}`;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
          method: "GET",
          headers: { Authorization: authHeader },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfileImage(data.image || "/default-profile.png");
        formik.setValues({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          username: data.username || "",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
          phone_number: data.phone_number || "",
          email: data.email || "",
          current_password: "",
        });
      } catch (error) {
        setErrorMessage("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageVersion((prev) => prev + 1);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      date_of_birth: "",
      gender: "",
      phone_number: "",
      email: "",
      current_password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      username: Yup.string().required("Username is required"),
      date_of_birth: Yup.string().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
      phone_number: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone Number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      current_password: Yup.string().required("Current Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        setErrorMessage("");
        const body = JSON.stringify(values);
        
        const response = await fetch("https://mohamednowar.pythonanywhere.com/api/update/", {
          method: "PATCH",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body,
        });

        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.message || "Update failed");

        const updatedUser = { ...values, image: responseData.user?.image || profileImage };
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
        navigate("/profile");
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-primary-light p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Update Your Information</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <div className="flex justify-center mb-4">
          <label className="relative w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
            <img src={`${profileImage}?v=${imageVersion}`} alt="Profile" className="w-full h-full object-cover" />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {Object.keys(formik.initialValues).map((field) => (
            <input
              key={field}
              {...formik.getFieldProps(field)}
              type={field === "email" ? "email" : field === "current_password" ? "password" : "text"}
              placeholder={field.replace("_", " ").toUpperCase()}
              className="p-2 border rounded w-full"
              required
            />
          ))}
          <button type="submit" className="w-full bg-primary-buttons p-2 rounded-full text-white font-medium">Update Your Data</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;