#include <Arduino.h>
#include <Servo.h>
#include <ros.h>
#include <std_msgs/UInt8MultiArray.h>

// Define joint limits {min, max} for each servo
const uint8_t JOINT_LIMITS[][2] = {
  {0,82},   // Joint 0: Claw (limited to prevent over-rotation)
  {0,180},  // Joint 1: Wrist Joint (full range)
  {0,180},  // Joint 2: Forearm (full range)
  {25,180}, // Joint 3: Arm (limited to prevents collision w base)
  {0,180}   // Joint 4: Pan-Tilt (full rotation)
};

// Define Joint positions 
const uint8_t PRESETS[][5] = {
  {90, 90, 90, 90, 90},   // Position 0: Home (centered)
  {90, 90, 10, 50, 120}   // Position 1: Example position
  // Add new positions here following the same format
};

// Digital pins connected to servo motors
const uint8_t SERVO_PINS[] = {
  7, // Joint 0: Claw
  6, // Joint 1: Wrist Joint
  5, // Joint 2: Forearm
  4, // Joint 3: Arm
  3  // Joint 4: Pan-Tilt
};

// Calculate number of presets at compile time
constexpr uint8_t NUM_POSITIONS = sizeof(PRESETS)/sizeof(PRESETS[0]);

// Servo control objects and current angle storage
Servo servos[5]; // Array of servo controllers
uint8_t current_angles[5] = {90}; // Current angles (start at 90°)


bool at_target(uint8_t targets[5]) {
  for(int i = 0; i < 5; i++) {
    // Allow 1 degree margin for servo positioning tolerance
    if(abs(current_angles[i] - targets[i]) > 1) return false;
  }
  return true;
}

void update_positions(uint8_t targets[5]) {
  // Process each of the 5 joints
  for(int i = 0; i < 5; i++) {
    // Linear Interpolation, move joint closer to target angle by 1 degree per update
    if(current_angles[i] < targets[i]) {
      current_angles[i]++;  // Move joint clockwise
    } 
    else if(current_angles[i] > targets[i]) {
      current_angles[i]--;  // Move joint counter-clockwise
    }

    // Hardware Adjustment for Joint 0 (invert joint 0 if needed)
    uint8_t servo_angle = current_angles[i];
    if(i == 0) {
      // Invert angle (180 - angle) for proper directional control
      servo_angle = 180 - current_angles[i];
    }
    
    // Update Physical Servo Position, send new angle command to servo motor
    servos[i].write(servo_angle);
  }
}

void move_to_position(uint8_t preset_index) {
  uint8_t targets[5];
  
  // Apply safety limits to target positions
  for(int i = 0; i < 5; i++) {
    targets[i] = constrain(PRESETS[preset_index][i],  // Raw preset value
                          JOINT_LIMITS[i][0],         // Minimum angle
                          JOINT_LIMITS[i][1]);        // Maximum angle
  }

  // Movement Loop
  while(!at_target(targets)) {
    update_positions(targets);
    delay(20); 
  }
}

void setup() {
  // Initialize servo connections
  for(int i = 0; i < 5; i++) {
    servos[i].attach(SERVO_PINS[i]); // Connect to PWM pins
    servos[i].write(90);             // Initialize to neutral position
  }
  delay(2000); // Allow servos to reach initial position
}

void loop() {
  // Cycle through all preset positions continuously
  for(int pos = 0; pos < NUM_POSITIONS; pos++) {
    move_to_position(pos);   // Move to position
    delay(3000);             // Hold position for 3 seconds
  }
}
