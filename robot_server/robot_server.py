import cv2
import base64
import asyncio
import websockets
import json

camera = cv2.VideoCapture(0)

diff = 15

base = 0
shoulder = 0
elbow = 0
wrist = 0
claw = 0

def handle_action(data):
    for k, v in data.items():
        if k != "action":
            continue
        match v:
            case "swivel":
                print(0)
                base -= diff
                print(base)
                break
            case "swivel_cc":
                print(0)
                base += diff
                print(base)
                break
            case "elbow_1_open":
                print(0)
                shoulder -= diff
                print(shoulder)
                break
            case "elbow_1_close":
                shoulder += diff
                print(shoulder)
                break
            case "elbow_2_open":
                elbow -= diff
                print(elbow)
                break
            case "elbow_2_close":
                elbow += diff
                print(elbow)
                break
            case "elbow_3_open":
                wrist -= diff
                print(wrist)
                break
            case "elbow_3_close":
                wrist += diff
                print(wrist)
                break
            case "gripper_open":
                claw += diff
                print(claw)
                break
            case "gripper_close":
                claw -= diff
                print(claw)
                break
    
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
