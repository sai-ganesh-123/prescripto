import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availability changed",
    });
  } catch (error) {
    console.error(error);

    // Send error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/////
const doctorsList = async (req, res) => {
  try {
    // Use await to resolve the query
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    // Send the resolved data as JSON
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error(error);

    // Send error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//APi for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not Found",
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: doctor._id,
        },
        process.env.JWT_SECRET
      );
      res.json({
        success: true,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.error(error);

    // Send error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//APi to get appointments for doctor panle

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);

    // Send error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//api to mark appointment completed
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Operation Failed",
      });
    }
  } catch (error) {
    console.log(error);

    // Send error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to cancel appointment for doc panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Operation Failed",
      });
    }
  } catch (error) {
    console.log(error);

    // Send error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//API to get dashboard data for doctor panle

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.payment || item.isCompleted) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings: earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);

    // Send error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//APi to update doctor profile data from  Doctor Panel

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
    });
    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorsList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  updateDoctorProfile,
  doctorProfile,
};
