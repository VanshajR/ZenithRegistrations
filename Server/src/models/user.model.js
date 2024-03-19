import mongoose from "mongoose";

// export const User = mongoose.model("User", {
//     username: String,
//     email: String,
//     password: String,
//     role: String,
//     teamName: String,
// });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'maintainer', 'team_leader', 'team_member'], required: true },
    team: { type: String },
});

export const User = mongoose.model("User", userSchema);