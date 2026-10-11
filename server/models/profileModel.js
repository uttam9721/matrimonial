import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // Personal Details
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Non-binary", "Other", "Prefer not to say"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          const cutoff = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );

          return value <= cutoff && value <= today;
        },
        message: "User must be at least 18 years old.",
      },
    },

    heightCm: {
      type: Number,
      min: 100,
      max: 250,
    },

    religion: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    maritalStatus: {
      type: String,
      enum: [
        "Never married",
        "Divorced",
        "Widowed",
        "Awaiting divorce",
      ],
      required: true,
    },

    community: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    motherTongue: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    manglik: {
      type: String,
      enum: ["Yes", "No", "Not sure", "Not applicable"],
    },

    // Family Details
    family: {
      type: {
        type: String,
        enum: ["Nuclear", "Joint"],
        required: true,
      },
      values: {
        type: String,
        enum: ["Traditional", "Moderate", "Liberal"],
        required: true,
      },
      siblings: {
        type: Number,
        min: 0,
        max: 20,
        required: true,
      },
    },

    // Career Details
    career: {
      education: {
        type: String,
        required: true,
        trim: true,
      },
      college: {
        type: String,
        trim: true,
        maxlength: 150,
      },
      occupation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      incomeBand: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // Lifestyle Details
    lifestyle: {
      diet: {
        type: String,
        enum: [
          "Vegetarian",
          "Non-vegetarian",
          "Eggetarian",
          "Vegan",
          "Other",
        ],
        required: true,
      },
      smoking: {
        type: String,
        enum: ["Yes", "No", "Occasionally"],
        required: true,
      },
      drinking: {
        type: String,
        enum: ["Yes", "No", "Occasionally"],
        required: true,
      },
      fitness: {
        type: String,
        enum: ["Daily", "Weekly", "Occasionally", "Never"],
        required: true,
      },
    },

    // Interests
    interests: {
      type: [String],
      default: [],
      validate: {
        validator: (items) => items.length <= 50,
        message: "Maximum 50 interests are allowed.",
      },
    },

    languages: {
      type: [String],
      default: [],
    },

    // Favourite Things
    favourites: {
      musicGenres: {
        type: [String],
        default: [],
      },
      movie: {
        type: String,
        trim: true,
        maxlength: 150,
      },
      food: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      travelPlace: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      sport: {
        type: String,
        trim: true,
        maxlength: 100,
      },
    },

    // About Profile
    about: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    prompts: {
      idealSunday: {
        type: String,
        trim: true,
        maxlength: 300,
        default: "",
      },
    },

    // Partner Preferences
    preferences: {
      ageMin: {
        type: Number,
        min: 18,
        max: 100,
        required: true,
      },
      ageMax: {
        type: Number,
        min: 18,
        max: 100,
        required: true,
        validate: {
          validator: function (value) {
            return value >= this.ageMin;
          },
          message:
            "Maximum age must be greater than or equal to minimum age.",
        },
      },
      religions: {
        type: [String],
        default: [],
      },
      education: {
        type: [String],
        default: [],
      },
      diet: {
        type: [String],
        default: [],
      },
      cities: {
        type: [String],
        default: [],
      },
    },

    // Consent
    consent: {
      termsAccepted: {
        type: Boolean,
        required: true,
        validate: {
          validator: (value) => value === true,
          message: "Terms must be accepted.",
        },
      },
      profileVisibilityAccepted: {
        type: Boolean,
        required: true,
        validate: {
          validator: (value) => value === true,
          message: "Profile visibility consent is required.",
        },
      },
      acceptedAt: {
        type: Date,
        default: Date.now,
      },
    },

    // Profile Status
    profileCompleted: {
      type: Boolean,
      default: false,
    },

    profileStatus: {
      type: String,
      enum: ["draft", "active", "paused", "blocked"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export const profileModel = mongoose.model("profile", profileSchema);