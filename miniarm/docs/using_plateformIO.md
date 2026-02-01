
1. Project Structure Setup:
~/Documents/PlatformIO/Projects/miniARM/
├── platformio.ini
└── src/
    └── main.cpp
2. Create ⁠platformio.ini:
[env:uno]
platform = atmelavr
board = uno
framework = arduino
monitor_speed = 115200
3. Add your code as ⁠src/main.cpp:
#include <Arduino.h>

void setup(){
    Serial.begin(115200);
    delay(1000);
}

void loop(){
    Serial.println("hiwonder");
    delay(1000);
}





# 1. Install PlatformIO
# In VS Code:
1. Open Extensions (Ctrl+Shift+X)
2. Search "PlatformIO IDE"
3. Install and reload VS Code
```

install pio using 
python3 -m pip install -U platformio






### 2. Create New Project
```bash
1. Click PlatformIO Home icon (alien head)
2. "New Project"
3. Name: miniARM
4. Board: Arduino Uno
5. Framework: arduino
6. Finish (takes 2-5 minutes first time)
```

### 3. Project Structure
```
miniARM/
├── include/        # Header files
├── lib/            # External libraries
├── src/            # Source code
│   └── main.cpp    # Main program
├── platformio.ini  # Configuration
└── test/           # Unit tests
```

### 4. Configure platformio.ini
```ini
[env:uno]
platform = atmelavr
board = uno
framework = arduino
```

### 5. Write Your Code
Create `src/main.cpp`:
```cpp
#include <Arduino.h>

void setup(){
    Serial.begin(115200);
    delay(1000);
}

void loop(){
    Serial.println("hiwonder");
    delay(1000);
}
```

### 6. Build & Upload
```bash
# Terminal commands
pio run        # Build project
pio run -t upload  # Upload to board

# Or use VS Code buttons:
1. Checkmark icon (Build)
2. Right-arrow icon (Upload)
```

### 7. Serial Monitor
```bash
pio device monitor  # Open serial monitor
# Or click plug icon in bottom toolbar
```

### Key Features
1. **Intelligent Code Completion**
   - Ctrl+Space for suggestions
   - Hover for documentation

2. **Library Management**
   ```bash
   pio lib install "FastLED"
   pio lib update
   ```

3. **Debugging** (requires debug probe)
   ```ini
   [env:uno]
   debug_tool = serial
   debug_port = /dev/cu.usbmodem*
   ```

### Troubleshooting
**Common Issues:**
1. **Port Permissions**:
   ```bash
   sudo usermod -a -G dialout $USER  # Linux
   sudo chmod 666 /dev/cu.usbmodem*  # macOS
   ```

2. **Missing Drivers**:
   ```bash
   # For CH340 chips on macOS
   brew install --cask wch-ch34x-usb-serial-driver
   ```

3. **Build Errors**:
   ```bash
   pio run -t clean  # Clean build
   ```

### Advanced Features
1. **Unit Testing**
   ```bash
   pio test -e uno
   ```

2. **Custom Board Configs**
   Create `boards/your_board.json`
   ```json
   {
     "build": {
       "mcu": "atmega328p",
       "f_cpu": "16000000L"
     }
   }
   ```

3. **CI/CD Integration**
   ```yaml
   # .github/workflows/pio.yml
   name: PlatformIO CI
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: platformio/run@v1
           with:
             platform: atmelavr
             board: uno
   ```

### PlatformIO vs Arduino CLI
| Feature              | PlatformIO       | Arduino CLI      |
|----------------------|------------------|------------------|
| Code Completion      | Excellent        | Basic            |
| Library Management   | Graphical        | Command-line     |
| Debugging            | GDB Support      | Limited          |
| Project Structure    | Professional     | Simple           |



