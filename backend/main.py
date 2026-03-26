from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
from fastapi import Request

app = FastAPI(
    title="AI Digital Marketing Agent Platform",
    description="High-performance Backend API for managing the 7 AI autonomous marketing agents.",
    version="1.0.0"
)

# CORS setup for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log API execution time to ensure fast performance
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    # This header helps monitor exact backend latency
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is online and operating efficiently."}

if __name__ == "__main__":
    import uvicorn
    # Optimized uvicorn settings for performance
    uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=4, reload=True)
