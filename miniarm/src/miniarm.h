
#ifndef MINIARM_H
#define MINIARM_H

#include <Arduino.h>
#include <ESP32Servo.h>

extern Servo motors[5];
extern const int SERVO_PINS[];


void RobotInitialize(){
    /*
    This code creates the robot initialization function for the miniARM, starting with allocating hardware timers.
    ESP32PWM::allocateTimer() reserves PWM timers on the ESP32 microcontroller for servo control.
    This allows us to use attach() because there would be no PWM timers available for our servo signals otherwise.
    */
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);

     // Attach all 5 servos to their respective pins
    for (int i = 0; i < 5; i++) {
        motors[i].setPeriodHertz(50); // Standard servo frequency
        motors[i].attach(SERVO_PINS[i], 1000, 2000); // Min/max pulse widths
    }

    delay(500);
}


#endif  // MINIARM_H
