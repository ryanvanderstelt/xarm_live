from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# templates = Jinja2Templates(directory="templates")

# Function to generate frames from the camera
def generate_frames():
    camera = cv2.VideoCapture(0)  # Use 0 for the default camera
    if not camera.isOpened():
        raise RuntimeError("Could not start camera.")

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Encode the frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()

            # Yield the frame in the multipart format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        
        # Optional: Add a small delay
        time.sleep(0.03)

# @app.get("/")
# def index(request: Request):
#     # Serve the HTML template
#     return templates.TemplateResponse("index.html", {"request": request})

@app.get("/video_feed")
def video_feed():
    # Return the streaming response with the multipart media type
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace;boundary=frame")

@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI backend!"}
