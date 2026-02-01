import cv2
import base64
import asyncio
import websockets
import json

camera = cv2.VideoCapture(0)

def handle_action(data):
    for k, v in data.items():
        if k != "action":
            continue
        # This is where we call our handy custom robot API

async def send_frames(websocket):
    while True:
        success, frame = camera.read()
        if not success:
            break

        _, buffer = cv2.imencode(".jpg", frame)
        jpg_as_text = base64.b64encode(buffer).decode("utf-8")

        message = json.dumps({"image": jpg_as_text})
        await websocket.send(message)

        # small sleep so you don't melt the CPU/network
        await asyncio.sleep(0.03)  # ~30 FPS


async def receive_messages(websocket):
    async for message in websocket:
        data = json.loads(message)
        handle_action(data)


async def stream_to_server():
    uri = "ws://localhost:8000/robot"

    async with websockets.connect(uri) as websocket:
        await asyncio.gather(
            send_frames(websocket),
            receive_messages(websocket),
        )


if __name__ == "__main__":
    asyncio.run(stream_to_server())
