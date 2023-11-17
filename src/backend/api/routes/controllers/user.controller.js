import { Router } from "express";
import {
  deleteUser,
  getUserbyId,
  getUsers,
  login,
  logout,
  updateUser,
} from "../services/user.service.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User By Id
 *         content:
 *           application/json:
 *             example:
 *               email: "john.doe@ibm.com"
 *               firstName: "John"
 *               lastName: "Doe"
 *               Department: "Sales"
 *               admin: true
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:id", authMiddleware, getUserbyId);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users
 *         content:
 *           application/json:
 *             example:
 *               email: "john.doe@ibm.com"
 *               firstName: "John"
 *               lastName: "Doe"
 *               Department: "Sales"
 *               admin: true
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/users", adminMiddleware, getUsers);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *         content:
 *           application/json:
 *             example:
 *                email: "albert.mendez@ibm.com"
 *                password: "12345678"
 *     responses:
 *       200:
 *         description: User By Id
 *         content:
 *           application/json:
 *             example:
 *               access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/users/login", login);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         content:
 *            text/html:
 *              example:
 *                Logout with success!
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/users/logout", authMiddleware, logout);

/**
 * @swagger
 * /users/{id}/update:
 *   put:
 *     summary: Update
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *              example:
 *                email: "new.email@ibm.com"
 *     responses:
 *       200:
 *         description: Update User By Id
 *         content:
 *           application/json:
 *             example:
 *               email: "new.email@ibm.com"
 *               firstName: "John"
 *               lastName: "Doe"
 *               Department: "Sales"
 *               admin: true
 *       404:
 *         description: User not found
 *         content:
 *           text/html:
 *             example:
 *               User not found
 *       500:
 *         description: Internal server error
 */
router.put("/users/:id/update", authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}/delete:
 *   delete:
 *     summary: Delete
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User By Id
 *         content:
 *           application/json:
 *             example:
 *               email: "john.doe@ibm.com"
 *               firstName: "John"
 *               lastName: "Doe"
 *               Department: "Sales"
 *               admin: true
 *       401:
 *         description: Permission Denied. You must be an admin.
 *       404:
 *         description: User not found
 *         content:
 *           text/html:
 *             example:
 *              Permission Denied. You must be an admin.
 *       500:
 *         description: Internal server error
 */
router.delete("/users/:id/delete", adminMiddleware, deleteUser);

export default router;
