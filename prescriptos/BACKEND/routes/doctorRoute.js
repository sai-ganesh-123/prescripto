import express from "express";

import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorsList,
  loginDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoc from "../middlewares/authDoc.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorsList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoc, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoc, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoc, appointmentCancel);
doctorRouter.get("/dashboard", authDoc, doctorDashboard);
doctorRouter.get("/profile", authDoc, doctorProfile);
doctorRouter.post("/update-profile", authDoc, updateDoctorProfile);

export default doctorRouter;
