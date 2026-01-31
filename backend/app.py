import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ConnectionManager import ConnectionManager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()


@app.websocket("/robot")
async def robot_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast_to_viewers(data)
    except WebSocketDisconnect:
        await manager.disconnect(websocket)
        print("Stream disconnected")
    except Exception as e:
        print(f"Error: {e}")

@app.websocket("/viewer")
async def viewer_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            print(f"Received from viewer: {data}")
            for k, v in data.items():
                if k == "vote":
                    if v in manager.votes:
                        value = getattr(manager, v)
                        await manager.change_attrib(v, value + 1)

    except WebSocketDisconnect:
        await manager.disconnect(websocket)
        print("Viewer disconnected")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)