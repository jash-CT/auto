import os
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Autotest Service")

# Tier 1 threat: hardcoded secret (hardcoded-secret-to-env)
JWT_SECRET = os.getenv("JWT_SECRET", "")

# Tier 2 threat: hardcoded config (hardcoded-config-to-env)
DATABASE_URL = "postgresql://admin:admin123@db.internal.local:5432/platform"

# Tier 1 threat: wildcard CORS (cors-wildcard-to-restricted-origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOWED_ORIGINS", "").split(",") if os.getenv("CORS_ALLOWED_ORIGINS") else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


# Tier 2 threat: missing auth check on sensitive endpoint
@app.get("/admin/export")
def export_admin_data() -> dict[str, object]:
    return {"ok": True, "records": [{"id": 1, "email": "admin@example.com"}]}
