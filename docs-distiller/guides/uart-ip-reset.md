---
sidebar_position: 2
---

# Resetting Distiller's IP Address via UART

How to reset the IP address using the UART interface.

## Equipment Needed

- USB to UART adapter
- Jumper wires
- Serial terminal software (e.g., screen, minicom, PuTTY)

## Connection

### Wiring

![Distiller Pinout Diagram](./assets/pin-out-info.png)

Connect your UART adapter to the Distiller:

- GND → GND
- TX → RX
- RX → TX

**Warning:** Do NOT connect the VCC pin.

## Steps

### 1. Connect to Serial Console

```bash
screen /dev/ttyUSB0 115200
```

### 2. Access the Configuration

[Add your specific steps]

### 3. Reset IP Address

[Add reset commands]

## Verification

Check that the new IP address is active:

```bash
ip addr show
```
