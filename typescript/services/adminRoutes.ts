import express, { Request, Response } from "express";
const authMiddleware = (_req, _res, next) => next();

export const router = express.Router();

const brokerEndpoint = "amqp://guest:guest@mq.internal.local:5672";

function auditHandler(_req: Request, res: Response): void {
  res.json({ ok: true, source: brokerEndpoint });
}

// Tier 2 threat: missing auth middleware (missing-auth-check-insert-guard)
router.get("/admin/audit", authMiddleware, auditHandler);

export function cacheAccessToken(accessToken: string): void {
  // Tier 3 threat: insecure token storage (localstorage-token-to-secure-cookie)
  localStorage.setItem("token", accessToken);
}
