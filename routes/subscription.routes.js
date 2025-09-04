import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
} from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ message: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  res.send({ message: `GET subscription with ID: ${subscriptionId}` });
});

subscriptionRouter.get("/user/:id", authorize, getAllSubscriptions);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  res.send({ message: `UPDATE subscription with ID: ${subscriptionId}` });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  const subscriptionId = req.params.id;
  res.send({ message: `Cancel subscription with ID: ${subscriptionId}` });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ message: "GET all upcoming renewals" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  res.send({ message: `DELETE subscription with ID: ${subscriptionId}` });
});

export default subscriptionRouter;
