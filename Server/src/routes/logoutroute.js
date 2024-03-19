// logoutRoute.js
import express from "express";

const router = express.Router();

router.post("/logout", (req, res) => {
    // Clear the authentication token or session here
    // For example, if you are using JWT tokens, you can clear the token from the client-side by deleting the cookie
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
    
});

export default router;