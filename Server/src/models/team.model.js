import mongoose from "mongoose";

export const Team = mongoose.model("Team", {
    name: String,
    leader: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});