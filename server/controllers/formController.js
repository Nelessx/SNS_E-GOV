import mongoose from "mongoose";
import Form from "../models/Form.js";
import User from '../models/User.js';

export const getForms = async (req,res) =>{
    try {
        const forms = await Form.find({});
        res.status(200).json({ success: true, data: forms});
    } catch (error) {
        console.log("error in fetching forms", error.message);
        res.status(500).json({ success: false, error: error.message});
    }
};

export const createForm = async (req, res) => {
    const form = req.body;

    const newForm = new Form(form);

    try {
        await newForm.save();
        res.status(201).json({success: true, data: newForm});
    } catch (error) {
        console.error("Error creating form:", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
};

export const updateForm = async (req, res) => {
	const { id } = req.params;

	const form = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid form Id" });
	}

	try {
		const updatedForm = await Form.findByIdAndUpdate(id, form, { new: true });
		res.status(200).json({ success: true, data: updatedForm });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteForm = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Form Id" });
	}

	try {
		await Form.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Form deleted" });
	} catch (error) {
		console.log("error in deleting Form:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Submit a new form
export const submitForm = async (req, res) => {
  try {
    const { applicationName, formData } = req.body;
    const userId = req.user.userId; // Get userId from authenticated user

    const form = new Form({
      applicationName,
      userId,
      formData
    });

    await form.save();

    res.status(201).json({
      message: 'Form submitted successfully',
      form: {
        applicationId: form.applicationId,
        applicationName: form.applicationName,
        status: form.status,
        submittedAt: form.submittedAt
      }
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};

// Get all forms (admin only)
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find({})
      .sort({ submittedAt: -1 })
      .populate('userId', 'firstName lastName email');

    res.json({
      count: forms.length,
      forms: forms.map(form => ({
        applicationId: form.applicationId,
        applicationName: form.applicationName,
        user: {
          userId: form.userId._id,
          name: `${form.userId.firstName} ${form.userId.lastName}`,
          email: form.userId.email
        },
        status: form.status,
        submittedAt: form.submittedAt,
        processedAt: form.processedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};

// Get user's own forms
export const getUserForms = async (req, res) => {
  try {
    const userId = req.user.userId;
    const forms = await Form.find({ userId })
      .sort({ submittedAt: -1 });

    res.json({
      count: forms.length,
      forms: forms.map(form => ({
        applicationId: form.applicationId,
        applicationName: form.applicationName,
        status: form.status,
        submittedAt: form.submittedAt,
        processedAt: form.processedAt,
        remarks: form.remarks
      }))
    });
  } catch (error) {
    console.error('Error fetching user forms:', error);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};

// Approve form (admin only)
export const approveForm = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const adminId = req.user.userId;

    const form = await Form.findOneAndUpdate(
      { applicationId },
      { 
        status: 'approved',
        processedAt: new Date(),
        processedBy: adminId
      },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json({
      message: 'Form approved successfully',
      form: {
        applicationId: form.applicationId,
        applicationName: form.applicationName,
        status: form.status,
        processedAt: form.processedAt
      }
    });
  } catch (error) {
    console.error('Error approving form:', error);
    res.status(500).json({ message: 'Error approving form', error: error.message });
  }
};

// Reject form (admin only)
export const rejectForm = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { remarks } = req.body;
    const adminId = req.user.userId;

    const form = await Form.findOneAndUpdate(
      { applicationId },
      { 
        status: 'rejected',
        processedAt: new Date(),
        processedBy: adminId,
        remarks
      },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json({
      message: 'Form rejected successfully',
      form: {
        applicationId: form.applicationId,
        applicationName: form.applicationName,
        status: form.status,
        processedAt: form.processedAt,
        remarks: form.remarks
      }
    });
  } catch (error) {
    console.error('Error rejecting form:', error);
    res.status(500).json({ message: 'Error rejecting form', error: error.message });
  }
};