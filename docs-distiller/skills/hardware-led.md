---
sidebar_position: 4
---

# hardware-led

Control RGB status LEDs with colors, brightness, and animations. Provides visual feedback and status indicators for your Distiller device.

## Overview

The hardware-led skill enables control of RGB LEDs connected to your Distiller device. Create colorful status indicators, animations, and visual feedback for your applications.

## Features

- **Color Control** - Set any RGB color (16.7 million colors)
- **Brightness Control** - Adjust LED intensity (0-100%)
- **Animations** - Built-in patterns (blink, fade, rainbow, heartbeat)
- **Multiple LEDs** - Control individual or groups of LEDs
- **Hardware PWM** - Smooth color transitions

## Prerequisites

- RGB LED(s) connected via I2C or GPIO
- User in `i2c` or `gpio` group
- Requires sudo access via sysfs
- Must use `create_led_with_sudo()` helper function

## Usage

### Basic Commands

```bash
# Turn LED red
/hardware-led --color red

# Set custom RGB color
/hardware-led --color 255,128,0

# Set brightness
/hardware-led --brightness 50

# Turn off LED
/hardware-led --off
```

### Animations

```bash
# Blink animation
/hardware-led --animation blink --color blue

# Fade animation
/hardware-led --animation fade --color green

# Rainbow animation
/hardware-led --animation rainbow

# Heartbeat animation
/hardware-led --animation heartbeat --color red
```

### Multiple LEDs

```bash
# Control specific LED
/hardware-led --id 0 --color red
/hardware-led --id 1 --color blue

# Control all LEDs
/hardware-led --all --color white
```

## Color Specification

### Named Colors

```python
# Predefined colors
"red"       # (255, 0, 0)
"green"     # (0, 255, 0)
"blue"      # (0, 0, 255)
"white"     # (255, 255, 255)
"yellow"    # (255, 255, 0)
"cyan"      # (0, 255, 255)
"magenta"   # (255, 0, 255)
"orange"    # (255, 165, 0)
"purple"    # (128, 0, 128)
"off"       # (0, 0, 0)
```

### RGB Values

```python
# RGB tuple (0-255 per channel)
/hardware-led --color 255,128,64

# Hexadecimal
/hardware-led --color #FF8040

# HSV (Hue, Saturation, Value)
/hardware-led --color hsv:180,100,100
```

## Animation Details

### Blink

Alternates between color and off state.

**Parameters:**
- `rate`: Blinks per second (default: 1.0)
- `duty`: On time percentage (default: 50)

```bash
# Fast blink
/hardware-led --animation blink --color red --rate 2.0

# Slow blink with short pulse
/hardware-led --animation blink --color blue --rate 0.5 --duty 20
```

### Fade

Smoothly transitions brightness up and down.

**Parameters:**
- `rate`: Cycles per second (default: 0.5)
- `min_brightness`: Minimum brightness % (default: 0)
- `max_brightness`: Maximum brightness % (default: 100)

```bash
# Gentle breathing effect
/hardware-led --animation fade --color blue --rate 0.3

# Pulse effect
/hardware-led --animation fade --color green --min-brightness 20
```

### Rainbow

Cycles through the color spectrum.

**Parameters:**
- `rate`: Full cycle time in seconds (default: 2.0)

```bash
# Fast rainbow
/hardware-led --animation rainbow --rate 1.0

# Slow rainbow
/hardware-led --animation rainbow --rate 5.0
```

### Heartbeat

Double pulse pattern like a heartbeat.

**Parameters:**
- `rate`: Heartbeats per minute (default: 60)

```bash
# Normal heartbeat
/hardware-led --animation heartbeat --color red --rate 60

# Rapid heartbeat
/hardware-led --animation heartbeat --color red --rate 120
```

## Python API

### Basic Control

```python
from distiller_sdk import LED

# Initialize LED
led = LED.create_led_with_sudo(0)

# Set color
led.set_color(255, 0, 0)  # Red

# Set brightness
led.set_brightness(50)  # 50%

# Turn off
led.off()
```

### Animations

```python
from distiller_sdk import LED, Animation

# Create LED
led = LED.create_led_with_sudo(0)

# Blink animation
led.animate(Animation.BLINK, color=(0, 255, 0), rate=1.0)

# Fade animation
led.animate(Animation.FADE, color=(0, 0, 255), rate=0.5)

# Rainbow animation
led.animate(Animation.RAINBOW, rate=2.0)

# Stop animation
led.stop_animation()
```

### Multiple LEDs

```python
from distiller_sdk import LEDController

# Initialize controller
controller = LEDController()

# Set all LEDs
controller.set_all((255, 255, 255))

# Set individual LED
controller.set_led(0, (255, 0, 0))
controller.set_led(1, (0, 255, 0))
controller.set_led(2, (0, 0, 255))

# Synchronized animation
controller.animate_all(Animation.RAINBOW, rate=2.0)
```

## Hardware Setup

### I2C LED Driver (Recommended)

```bash
# Check I2C connection
i2cdetect -y 1

# Should show device at 0x40 or similar
```

**Wiring:**
- VCC → 3.3V or 5V
- GND → Ground
- SDA → GPIO 2 (Pin 3)
- SCL → GPIO 3 (Pin 5)

### GPIO PWM LEDs

```bash
# Individual RGB pins
Red:   GPIO 17 (Pin 11)
Green: GPIO 27 (Pin 13)
Blue:  GPIO 22 (Pin 15)
```

**Wiring:**
- GPIO → Resistor (220Ω) → LED Anode
- LED Cathode → Ground

## Use Cases

### Status Indicators

```python
# System status
led.set_color(0, 255, 0)      # Green: OK
led.set_color(255, 255, 0)    # Yellow: Warning
led.set_color(255, 0, 0)      # Red: Error

# Activity indicator
led.animate(Animation.BLINK, color=(0, 255, 0), rate=2.0)
```

### User Feedback

```python
# Processing
led.animate(Animation.FADE, color=(0, 0, 255))

# Success
led.set_color(0, 255, 0)
time.sleep(1)
led.off()

# Error
led.animate(Animation.BLINK, color=(255, 0, 0), rate=3.0)
time.sleep(2)
led.off()
```

### Application States

```python
class AppState:
    IDLE = (64, 64, 64)      # Dim white
    LISTENING = (0, 0, 255)  # Blue
    PROCESSING = (255, 165, 0)  # Orange
    SPEAKING = (0, 255, 0)   # Green
    ERROR = (255, 0, 0)      # Red

# Set state
led.set_color(*AppState.LISTENING)
```

## Technical Details

### PWM Specifications

- **Frequency**: 1kHz default
- **Resolution**: 8-bit (256 levels per channel)
- **Update Rate**: Up to 100Hz

### I2C Communication

- **Bus Speed**: 400kHz (Fast Mode)
- **Addresses**: 0x40-0x4F (configurable)
- **Protocol**: PCA9685 or similar PWM driver

### Power Requirements

- **Per LED**: ~20mA at full brightness
- **RGB LED**: ~60mA maximum (all channels)
- **Multiple LEDs**: Use external power supply if >5 LEDs

### Performance

- **Latency**: Less than 10ms for color changes
- **Animation**: Smooth 60fps updates
- **CPU Usage**: Less than 1% with hardware PWM

## Troubleshooting

### LED Not Responding

```bash
# Check permissions
groups  # Should include 'i2c' or 'gpio'

# Check I2C
i2cdetect -y 1

# Check GPIO
ls -l /sys/class/gpio

# Test with troubleshooting skill
/distiller-troubleshooting
```

### Wrong Colors

- Check wiring (RGB vs GRB vs BGR)
- Verify common cathode vs common anode
- Adjust color mapping in code

### Dim or Flickering

- Check power supply capacity
- Reduce number of LEDs
- Lower brightness setting
- Add capacitor (100µF) near LEDs

### Animation Stuttering

- Reduce animation rate
- Check CPU usage
- Disable other PWM users
- Use hardware PWM instead of software

## Best Practices

1. **Use sudo helper** - Always use `create_led_with_sudo()` for proper permissions
2. **External power** - Use separate power supply for multiple LEDs
3. **Current limiting** - Always use resistors (220Ω-470Ω)
4. **Graceful shutdown** - Turn off LEDs when application exits
5. **Brightness management** - Reduce brightness to save power

## Examples

### Status Light

```python
#!/usr/bin/env python3
from distiller_sdk import LED

led = LED.create_led_with_sudo(0)

# Startup
led.set_color(255, 255, 0)  # Yellow

# Ready
led.set_color(0, 255, 0)    # Green

# Wait for events...
```

### Activity Monitor

```python
#!/usr/bin/env python3
from distiller_sdk import LED, Animation
import psutil

led = LED.create_led_with_sudo(0)

while True:
    cpu = psutil.cpu_percent()

    if cpu < 30:
        led.set_color(0, 255, 0)  # Green
    elif cpu < 70:
        led.set_color(255, 255, 0)  # Yellow
    else:
        led.animate(Animation.BLINK, color=(255, 0, 0), rate=2.0)

    time.sleep(1)
```

### Voice Assistant Indicator

```python
#!/usr/bin/env python3
from distiller_sdk import LED, Animation

led = LED.create_led_with_sudo(0)

# Idle
led.animate(Animation.FADE, color=(64, 64, 64), rate=0.3)

# Listening
led.set_color(0, 0, 255)

# Processing
led.animate(Animation.FADE, color=(255, 165, 0), rate=1.0)

# Speaking
led.set_color(0, 255, 0)

# Error
led.animate(Animation.BLINK, color=(255, 0, 0), rate=3.0)
```

## See Also

- [distiller-troubleshooting](./distiller-troubleshooting.md) - Debug LED issues
- [system-verification](./system-verification.md) - Verify LED hardware
- [hardware-audio](./hardware-audio.md) - Combine with audio feedback
- [ai-text-to-speech](./ai-text-to-speech.md) - Visual feedback for speech
