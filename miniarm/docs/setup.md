# Setup Guide

## Prerequisites
- [Arduino IDE](https://www.arduino.cc/en/software)
- USB cable (Type A to Type B)
- Arduino Uno board

## Installation Steps

### 1. Arduino IDE Setup
```powershell
# Windows check (PowerShell):
Test-Path $env:ProgramFiles\Arduino\arduino.exe
```

### 2. Board Configuration
1. Launch Arduino IDE
2. Navigate to `Tools > Board > Arduino AVR Boards > Arduino Uno`
3. Set port under `Tools > Port`:
   - **Windows**: `COMx` (x = number from Device Manager)
   - **macOS**: `/dev/cu.usbmodemXXXX`
   - **Linux**: `/dev/ttyACMx`

### 3. Library Installation
Install libraries using the Arduino IDE:
- **FastLED** by Daniel Garcia  
- **Tone** by Brett Hagman  

Alternatively, use the CLI:
```bash
# CLI alternative (if using Arduino CLI):
arduino-cli lib install FastLED
arduino-cli lib install Tone
```

### 4. Compiling and Uploading
1. Connect Arduino via USB
2. Remove UNO 6-channel knob expansion board
3. Compile the code
4. Upload to the board

#### Steps using `arduino-cli`:
1. Verify connection:
   ```bash
   arduino-cli board list
   ```
2. Compile and upload the sketch:
   ```bash
   arduino-cli compile --fqbn arduino:avr:uno
   arduino-cli upload -p /dev/cu.usbmodemXXXX --fqbn arduino:avr:uno
   ```

## Troubleshooting

### Common Issues
1. **Port Not Found**:
   - Reinstall [CH340G drivers](https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all)
   - Try a different USB cable
