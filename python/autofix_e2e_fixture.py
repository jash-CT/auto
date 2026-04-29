import os
"""E2E fixture: intentional hardcoded secret for AutoFix Tier 1 demo (not production)."""
SECRET_KEY = os.getenv("SECRET_KEY", "")
