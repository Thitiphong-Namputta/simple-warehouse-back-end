import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("GET all subscritions");
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send("GET subscrition details");
});
subscriptionRouter.post("/", (req, res) => {
  res.send("CREATE new subscrition");
});
subscriptionRouter.put("/:id", (req, res) => {
  res.send("UPDATE subscrition");
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send("DELETE subscrition");
});
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send("GET all user subscrition");
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send("CANCEL subscrition");
});
subscriptionRouter.get("/upcomming-renewals", (req, res) => {
  res.send("GET upcomming renewals");
});

export default subscriptionRouter;
