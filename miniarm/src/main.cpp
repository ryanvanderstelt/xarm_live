#include <Arduino.h>
#include <ESP32Servo.h>
#include "miniarm.h"

// Micro ROS includes
#include <micro_ros_arduino.h>
#include <stdio.h>
#include <rcl/rcl.h>
#include <rcl/error_handling.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>
#include <std_msgs/msg/int32.h>


// Servo pins for each joint
const int SERVO_PINS[] = {
  21, // Joint 0: Base
  19, // Joint 1: Shoulder
  18, // Joint 2: Elbow
  27, // Joint 3: Wrist
  26  // Joint 4: Claw
};

// Servo objects
Servo motors[5];
const char* joint_names[] = {"Base", "Shoulder", "Elbow", "Wrist", "Claw"};

void setup() {
  Serial.begin(115200);
  delay(1000);
  RobotInitialize();  

}

void loop() {

  for (int pos = 0; pos <= 180; pos++){
    motors->write(pos);
    delay(15);
  }  
}
