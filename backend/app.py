import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from ConnectionManager import ConnectionManager
from contextlib import asynccontextmanager
import datetime
import asyncio

# Define your async function to run repeatedly
async def run_every_second():
    voting_period = 10
    time = voting_period
    while True:
        await asyncio.sleep(1)
        time -= 1
        if time < 0:
            time = voting_period
            result_val = max(manager.votes.values())
            if result_val > 0:
                result = max(manager.votes, key=manager.votes.get)
                for connection in manager.active_connections:
                    if str(connection.url).endswith('robot'):
                        await manager.send_json({'vote': result}, connection)
                        break
            

            await manager.reset_attrib()
        await manager.change_attrib("time_left", time)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create and start the task during application startup
    task = asyncio.create_task(run_every_second())
    yield
    # Cancel the task during application shutdown
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Background task cancelled")

app = FastAPI(lifespan=lifespan)

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
                if k == 'vote' and v in manager.votes:
                    value = getattr(manager, "votes")[v]
                    await manager.change_attrib(v, value + 1)

    except WebSocketDisconnect:
        await manager.disconnect(websocket)
        print("Viewer disconnected")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)