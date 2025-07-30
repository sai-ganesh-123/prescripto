import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation instead of useParams
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { token, backendUrl } = useContext(AppContext);
  const location = useLocation(); // Use useLocation to access query params
  const navigate = useNavigate(); // Using useNavigate to navigate programmatically

  // Extracting query parameters from location.search
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");
  const appointmentId = queryParams.get("appointmentId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        toast.error("Not authorized. Please login again.");
        return null; // Handle case where user is not logged in
      }

      const response = await axios.post(
        `${backendUrl}/api/user/verify-stripe`, // Endpoint for verifying appointment payment
        { success, appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message); // Success toast
        navigate("/my-appointments"); // Navigate to the appointments page
      } else {
        toast.error(response.data.message); // Fail toast
        navigate("/my-appointments"); // Navigate to appointments page even in failure
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while verifying payment.");
    }
  };

  useEffect(() => {
    if (success && appointmentId) {
      verifyPayment(); // Call the verifyPayment function on component mount
    }
  }, [token, success, appointmentId]); // Only re-run when token, success, or appointmentId changes

  return <div></div>; // No UI is rendered, it's just handling the background logic
};

export default Verify;
