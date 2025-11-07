import { json } from "express";
import Resume from "../models/Resume.model.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";

// controller for Createing new Resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        //create new resume
        const newResume = new Resume.create({ userId, title })
        //return success response
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for deleting a Resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.body;

        await Resume.findOneAndDelete({ userId, _id: resumeId });

        // return success response
        return res.status(200).json({ message: 'Resume deleted successfully' })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// get user resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.body;

        const resume = await Resume.findOne(
            { userId, _id: resumeId },
            { __v: 0, createdAt: 0, updatedAt: 0 } // projection to exclude fields
        );

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // return success response
        return res.status(200).json({ message: 'Resume fetched successfully', resume })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// get resume by id public
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Controller for updating resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy = JSON.parse(resumeData);

        if (image) {

            const imageBufferData = fs.createReadStream(image.path)
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75'+ (removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url;

            // remove file from server after upload
            fs.unlinkSync(image.path);
        }

            console.log(response);

            const resume = await findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true });


            return res.status(200).json({ message: "Resume updated successfully", resume });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };