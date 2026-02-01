import sys
import serial
import time

# --- Configuration ---
SERIAL_PORT = '/dev/ttyACM1'  # Replace with your Arduino's serial port (e.g., '/dev/ttyACM0' on Linux, 'COM4' on Windows)
BAUD_RATE = 9600
# ---------------------
def turn_clockwise():
    send_string_to_arduino("bl")

def turn_counter_clockwise():
    send_string_to_arduino("br")

def shoulder_up():
    send_string_to_arduino("su")

def shoulder_down():
    send_string_to_arduino("sd")

def elbow_up():
    send_string_to_arduino("eu")

def elbow_down():
    send_string_to_arduino("ed")

def wrist_up():
    send_string_to_arduino("wu")

def wrist_down():
    send_string_to_arduino("wd")

def claw_open():
    send_string_to_arduino("co")

def claw_close():
    send_string_to_arduino("cc")



def send_string_to_arduino(input):
    try:
        # Open the serial port
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        time.sleep(2) # Wait for the connection to establish
        print(f"Connected to {SERIAL_PORT} at {BAUD_RATE} baud.")
        
        print("Ready to send data to Arduino. Press Ctrl+C to exit.")
 
        if input:
            data_to_send = (input + '\n').encode('utf-8') 
            ser.write(data_to_send)
            print(f"Sent: {input}")
            
    except serial.SerialException as e:
        print(f"Error opening serial port: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nExiting program.")
    finally:
        if 'ser' in locals() and ser.isOpen():
            ser.close()
            print("Serial port closed.")

if __name__ == "__main__":
    send_string_to_arduino("test")
