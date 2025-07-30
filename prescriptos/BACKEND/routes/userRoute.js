import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  processAppointmentPayment,
  verifyAppointmentPayment,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/list-appointment", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

/////
userRouter.post("/verify-stripe", authUser, verifyAppointmentPayment);
userRouter.post("/payment-stripe", authUser, processAppointmentPayment);

export default userRouter;
