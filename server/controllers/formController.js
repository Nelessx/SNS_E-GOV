import mongoose from "mongoose";
import Form from "../models/formModel.js";

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