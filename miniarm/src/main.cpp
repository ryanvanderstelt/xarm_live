#include <Arduino.h>
#include <micro_ros_platformio.h>
#include <WiFi.h>

#include <stdio.h>
#include <rcl/rcl.h>
#include <rcl/error_handling.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>

#include <std_msgs/msg/float64.h>

#define STATUS_LED 2

// Error handling
#define RCCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){error_loop();}}
#define RCSOFTCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){}}

rcl_publisher_t publisher;
std_msgs__msg__Float64 msg_angle;
rclc_support_t support;
rcl_allocator_t allocator;
rcl_node_t node;

// TODO 
// write code for motor control here and Flash LED on ESP32 board blue

void error_loop(){
  while(1){
    digitalWrite(STATUS_LED, !digitalRead(STATUS_LED));
    delay(100);
  }
}

void timer_callback(rcl_timer_t * timer, int64_t last_call_time)
{
  RCLC_UNUSED(last_call_time);
  if (timer != NULL) {
    RCSOFTCHECK(rcl_publish(&publisher, &msg_angle, NULL));
    msg_angle.data++;
  }
}

void setup() {
  IPAddress agent_ip(10, 10, 156, 185);

  char ssid[] = "MTVisitor";
  char pass[] = "";

  set_microros_wifi_transports(ssid, pass, agent_ip, 8888);

  pinMode(STATUS_LED, OUTPUT);
  digitalWrite(STATUS_LED, HIGH);

  delay(2000);

  allocator = rcl_get_default_allocator();

  //create init_options
  RCCHECK(rclc_support_init(&support, 0, NULL, &allocator));

  // create node
  RCCHECK(rclc_node_init_default(&node, "micro_ros_platfromIO_wifi_node", "", &support));

  // create publisher
  RCCHECK(rclc_publisher_init_best_effort(
    &publisher,
    &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Float64),
    "topic_name"));

  msg_angle.data = 0;
}

void loop() {
    RCSOFTCHECK(rcl_publish(&publisher, &msg_angle, NULL));
    msg_angle.data++;
}