import { Profile } from "../models/profileModel.js";

export const createProfile = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dateOfBirth,
      heightCm,
      religion,
      city,
      maritalStatus,
      community,
      motherTongue,
      manglik,

      // Family Details
      family: { type: familyType, values: familyValues, siblings } = {},

      // Career Details
      career: { education, college, occupation, incomeBand } = {},

      // Lifestyle Details
      lifestyle: { diet, smoking, drinking, fitness } = {},

      // Interests
      interests,
      languages,

      // Favourite Things
      favourites: { musicGenres, movie, food, travelPlace, sport } = {},

      // About Profile
      about,

      // Prompts
      prompts: { idealSunday } = {},

      // Partner Preferences
      preferences: {
        ageMin,
        ageMax,
        religions,
        education: preferredEducation,
        diet: preferredDiet,
        cities,
      } = {},

      // Consent
      consent: { termsAccepted, profileVisibilityAccepted } = {},
    } = req.body;

    // Basic validation
    if (!fullName || !gender || !dateOfBirth) {
      return res.status(400).json({
        status: "Failed",
        message: "fullName, gender and dateOfBirth are required",
      });
    }

    if (!termsAccepted || !profileVisibilityAccepted) {
      return res.status(400).json({
        status: "Failed",
        message: "You must accept the terms and profile visibility consent",
      });
    }

    const userProfile = await Profile.create({
      fullName,
      gender,
      dateOfBirth,
      heightCm,
      religion,
      city,
      maritalStatus,
      community,
      motherTongue,
      manglik,

      family: { type: familyType, values: familyValues, siblings },
      career: { education, college, occupation, incomeBand },
      lifestyle: { diet, smoking, drinking, fitness },

      interests,
      languages,

      favourites: { musicGenres, movie, food, travelPlace, sport },

      about,
      prompts: { idealSunday },

      preferences: {
        ageMin,
        ageMax,
        religions,
        education: preferredEducation,
        diet: preferredDiet,
        cities,
      },

      consent: { termsAccepted, profileVisibilityAccepted },
    });

    return res.status(201).json({
      message: "Profile created successfully",
      status: "Success",
      data: userProfile,
    });
  } catch (err) {
    // Mongoose validation errors are client errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message, status: "Failed" });
    }
    return res.status(500).json({ message: err.message, status: "Failed" });
  }
};