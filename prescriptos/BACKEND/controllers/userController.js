import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe";

//Gate way initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//api to register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    //hashing password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    //save user to database
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user Profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//APi to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      //uplaod image to cloudinary
      const imageUplaod = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUplaod.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }
    let slots_booked = docData.slots_booked;

    //checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      docData,
      userData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //updating slots booked
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to get user appointments to frontend

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//cancel Appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    } else {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      //removing slot from doctor
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (slot) => slot !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      res.json({ success: true, message: "Appointment cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API for Stripe payment for doctor's appointment
const processAppointmentPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    const { origin } = req.headers;

    // Create a line item for the appointment fee
    const line_items = [
      {
        price_data: {
          currency: "INR", // Replace with your desired currency
          product_data: {
            name: `Appointment with ${appointmentData.docData.name}`,
          },
          unit_amount: appointmentData.docData.fees * 100, // Convert to cents
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/Verify?success=true&appointmentId=${appointmentId}`,
      cancel_url: `${origin}/Verify?success=false&appointmentId=${appointmentId}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Stripe payment and update appointment payment status
const verifyAppointmentPayment = async (req, res) => {
  const { success, appointmentId } = req.body;

  try {
    if (success === "true") {
      // Update appointment status to 'payment' as true
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
      });

      res.json({
        success: true,
        message: "Payment successful!",
      });
    } else {
      res.json({
        success: false,
        message: "Payment failed, please try again",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  listAppointment,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  cancelAppointment,
  processAppointmentPayment,
  verifyAppointmentPayment,
};
