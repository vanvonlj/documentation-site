---
sidebar_position: 2
---

# distiller-troubleshooting

Quick diagnostics for Distiller SDK hardware components. This skill provides fast, targeted troubleshooting for common hardware issues.

## Overview

The distiller-troubleshooting skill is your first line of defense when encountering hardware-related problems. It performs quick diagnostics on individual components and provides actionable feedback.

## When to Use

Use this skill when you encounter:
- **Permission errors** - I2C, SPI, GPIO access denied
- **Device detection failures** - Hardware not found or responding
- **Single-component issues** - One specific piece of hardware not working
- **Quick health checks** - Verify a specific component is working

## When NOT to Use

For more complex scenarios, use alternative tools:
- **Multiple components failing** → Contact support or investigate systematically
- **System-wide validation** → Use [system-verification](./system-verification.md)
- **Complete system setup** → Use [system-verification](./system-verification.md)

## Usage

```bash
/distiller-troubleshooting
```

The skill will:
1. Check user permissions (groups: i2c, spi, gpio, video, audio)
2. Scan for connected hardware devices
3. Test basic hardware functionality
4. Report any issues found
5. Provide remediation steps

## Common Issues Detected

### Permission Errors

**Symptom:**
```
Error: EACCES: permission denied, open '/dev/i2c-1'
```

**Detection:**
- Checks if user is in required groups
- Verifies device file permissions

**Resolution:**
```bash
# Add user to required groups
sudo usermod -aG i2c,spi,gpio,video,audio $USER

# Reboot to apply changes
sudo reboot
```

### Device Not Found

**Symptom:**
```
Error: Cannot find I2C device
```

**Detection:**
- Scans /dev for expected devices
- Checks if hardware interfaces are enabled

**Resolution:**
- Verify hardware is properly connected
- Check if interfaces are enabled in config
- Ensure device drivers are loaded

### I2C Communication Failures

**Symptom:**
- Device detected but not responding
- Intermittent communication errors

**Detection:**
- Attempts basic I2C communication
- Checks for bus errors

**Resolution:**
- Check physical connections
- Verify pull-up resistors
- Test with i2cdetect command

## Technical Details

### Hardware Components Tested

| Component | Test Method | Expected Result |
|-----------|-------------|-----------------|
| I2C Bus | Device scan | Devices detected at expected addresses |
| SPI Bus | Interface check | /dev/spidev* accessible |
| GPIO | Permission check | /sys/class/gpio accessible |
| Camera | Device detection | /dev/video* present |
| Audio | ALSA check | Playback/capture devices listed |

### System Requirements

- Distiller SDK installed
- Linux-based OS (Raspberry Pi OS recommended)
- Hardware properly connected
- User in appropriate groups

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | All tests passed |
| 1 | Permission issues detected |
| 2 | Hardware not detected |
| 3 | Communication failures |

## Examples

### Basic Diagnostic

```bash
/distiller-troubleshooting
```

**Output:**
```
🔍 Running Distiller Hardware Diagnostics...

✅ User Permissions
   - i2c group: OK
   - spi group: OK
   - gpio group: OK
   - video group: OK
   - audio group: OK

✅ I2C Devices
   - Bus 1: Detected
   - Devices found: 0x48, 0x76

✅ Camera
   - /dev/video0: Detected

✅ Audio
   - Playback devices: 1
   - Capture devices: 1

All hardware checks passed! ✨
```

### Permission Issue Detected

```bash
/distiller-troubleshooting
```

**Output:**
```
🔍 Running Distiller Hardware Diagnostics...

❌ User Permissions
   - i2c group: MISSING
   - spi group: OK
   - gpio group: OK

⚠️  Issues Found:

User not in 'i2c' group
Fix: sudo usermod -aG i2c $USER && reboot

Run fixes and try again.
```

## Integration with Other Skills

The troubleshooting skill works alongside other Distiller tools:

- **Before hardware-led** - Verify I2C access before controlling LEDs
- **Before hardware-audio** - Check ALSA devices before audio operations
- **Before hardware-camera** - Verify camera detection before capture
- **After system updates** - Validate hardware after OS changes

## Best Practices

1. **Run after system changes** - After updates, driver changes, or hardware additions
2. **First step in debugging** - Always start with quick diagnostics before deep debugging
3. **Check permissions first** - Most issues are permission-related
4. **Document issues** - Save diagnostic output when reporting bugs
5. **Escalate when needed** - Use hardware-debugger for complex issues

## Troubleshooting Tips

### Skill Won't Run

- Verify Distiller SDK is installed
- Check Claude Code environment is active
- Ensure skill is enabled

### False Positives

- Some tests may fail on non-standard hardware configurations
- Custom device configurations may not be detected
- Review manual verification steps in output

### Getting More Details

For deeper investigation:
```bash
# Manual I2C scan
i2cdetect -y 1

# Check group membership
groups

# List audio devices
arecord -l
aplay -l

# Check camera
ls -l /dev/video*
```

## See Also

- [system-verification](./system-verification.md) - Comprehensive system testing
- [hardware-led](./hardware-led.md) - LED control after verification
- [hardware-audio](./hardware-audio.md) - Audio operations after verification
- [hardware-camera](./hardware-camera.md) - Camera operations after verification
