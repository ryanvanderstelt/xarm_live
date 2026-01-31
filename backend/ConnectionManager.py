from fastapi import WebSocket

class ConnectionManager:
    """Class defining socket events"""
    def __init__(self):
        """init method, keeping track of connections"""
        self.active_connections = []
        self.votes = {
            "swivel": 0,
            "swivel_cc": 0,
            "elbow_1_open": 0,
            "elbow_1_close": 0,
            "elbow_2_open": 0,
            "elbow_2_close": 0,
            "elbow_3_open": 0,
            "elbow_3_close": 0,
            "gripper_open": 0,
            "gripper_close": 0,
        }
        self.viewer_count = 0
        self.time_left = 10

    async def reset_attrib(self):
        for k, v in self.votes.items():
            self.votes[k] = 0
        self.time_left = 10
        data = {
            "time_left": self.time_left
        }
        for k, v in self.votes.items():
            data[k] = v
        await self.broadcast_to_viewers(data)
        
    async def change_attrib(self, attribute, value):
        if attribute in self.votes:
            self.votes[attribute] = value
            await self.broadcast_to_viewers({attribute: value})
        elif hasattr(self, attribute):
            setattr(self, attribute, value)
        else:
            print("No value changed")
            
    
    async def connect(self, websocket: WebSocket):
        """connect event"""
        await websocket.accept()
        self.active_connections.append(websocket)
        if websocket.url.endswith("viewer"):
            self.viewer_count += 1
        print(websocket.url)

    async def send_json(self, data, websocket: WebSocket):
        """Direct Message"""
        await websocket.send_json(data)
    
    async def disconnect(self, websocket: WebSocket):
        """disconnect event"""
        if websocket.url.endswith("viewer"):
            self.viewer_count -= 1
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
    
    async def broadcast_to_viewers(self, data):
        for connection in list(self.active_connections):
            if connection.url.endswith("robot"):
                continue
            try:
                await connection.send_json(data)
            except Exception as e:
                print("Broadcast failed:", e)