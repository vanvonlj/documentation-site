---
sidebar_position: 3
---

# system-verification

Comprehensive hardware and SDK testing to verify complete system health. This skill performs thorough validation of all Distiller components.

## Overview

The system-verification skill provides complete system validation by testing all hardware components, SDK installation, user permissions, and AI models. It's designed for setup validation, installation verification, and comprehensive health checks.

## When to Use

Use this skill when:
- **Setting up new systems** - Initial installation validation
- **Validating installations** - After SDK updates or system changes
- **Debugging system-wide issues** - Multiple components not working
- **Pre-deployment checks** - Ensure everything works before production
- **Periodic health checks** - Regular system maintenance

## When NOT to Use

For simpler scenarios:
- **Single component issue** → Use [distiller-troubleshooting](./distiller-troubleshooting.md)
- **Quick permission check** → Use [distiller-troubleshooting](./distiller-troubleshooting.md)

## Usage

```bash
/system-verification
```

The skill will perform a comprehensive test suite:
1. Verify Distiller SDK installation
2. Check all user permissions
3. Test I2C hardware (sensors, displays, etc.)
4. Verify SPI functionality
5. Test GPIO access
6. Validate camera hardware
7. Check audio devices (input/output)
8. Verify AI models (Piper TTS, Parakeet ASR)
9. Test system services
10. Generate comprehensive report

## Test Categories

### SDK Installation

**Tests:**
- Distiller SDK package presence
- Python package installation
- Required binaries available
- Library dependencies met

**Example Output:**
```
✅ SDK Installation
   - distiller-sdk: v1.2.3
   - Python package: Installed
   - Required binaries: Found
   - Dependencies: Complete
```

### User Permissions

**Tests:**
- i2c group membership
- spi group membership
- gpio group membership
- video group membership
- audio group membership
- dialout group membership

**Example Output:**
```
✅ User Permissions
   - i2c: ✓
   - spi: ✓
   - gpio: ✓
   - video: ✓
   - audio: ✓
   - dialout: ✓
```

### I2C Hardware

**Tests:**
- I2C bus detection (/dev/i2c-*)
- Device scanning
- Communication test
- Read/write verification

**Example Output:**
```
✅ I2C Hardware
   - Bus 1: Active
   - Devices found: 3
     - 0x48: Temperature sensor
     - 0x76: Barometric pressure
     - 0x3c: OLED display
   - Communication: OK
```

### Camera Hardware

**Tests:**
- Video device detection
- Camera module recognition
- rpicam-apps availability
- Basic capture test

**Example Output:**
```
✅ Camera Hardware
   - Device: /dev/video0
   - Type: Raspberry Pi Camera Module 3
   - Resolution: 4608x2592
   - rpicam-apps: Installed
   - Test capture: Success
```

### Audio Hardware

**Tests:**
- ALSA installation
- Playback devices
- Capture devices
- Sample rate support
- Test recording
- Test playback

**Example Output:**
```
✅ Audio Hardware
   - ALSA: Installed
   - Playback devices: 1
     - card 0: bcm2835 HDMI [bcm2835 HDMI]
   - Capture devices: 1
     - card 1: USB Audio [USB Audio Device]
   - Sample rates: 16000, 44100, 48000
   - Test recording: Success
   - Test playback: Success
```

### AI Models

**Tests:**
- Piper TTS installation
- TTS model availability
- Parakeet ASR installation
- ASR model availability
- ONNX runtime check
- GPU acceleration check

**Example Output:**
```
✅ AI Models
   - Piper TTS: v1.0.0
     - Model: en_US-amy-medium
     - ONNX Runtime: Available
   - Parakeet ASR: v1.0.0
     - Model: parakeet-ctc-1.1b
     - VAD: Enabled
   - GPU Acceleration: Not available (CPU mode)
```

## Technical Details

### System Requirements

**Minimum:**
- Raspberry Pi 4 (4GB RAM) or equivalent ARM64 device
- Raspberry Pi OS (64-bit) or compatible Linux
- Distiller SDK installed
- 16GB+ SD card/storage
- Active internet connection (for model downloads)

**Recommended:**
- Raspberry Pi 5 (8GB RAM)
- 32GB+ SD card
- USB audio interface
- Camera Module 3

### Test Duration

Total verification time varies by system:
- **Quick scan**: ~30 seconds (no hardware tests)
- **Standard**: ~2-3 minutes (basic hardware tests)
- **Comprehensive**: ~5-10 minutes (full validation with AI models)

### Exit Codes

| Code | Meaning | Action Required |
|------|---------|-----------------|
| 0 | All tests passed | System ready |
| 1 | Minor issues | Review warnings |
| 2 | Major failures | Fix critical issues |
| 3 | SDK not installed | Install Distiller SDK |

## Examples

### Successful Verification

```bash
/system-verification
```

**Output:**
```
🔬 Running Comprehensive System Verification...

✅ SDK Installation (5/5 checks passed)
✅ User Permissions (6/6 checks passed)
✅ I2C Hardware (4/4 checks passed)
✅ SPI Hardware (2/2 checks passed)
✅ GPIO Access (3/3 checks passed)
✅ Camera Hardware (4/4 checks passed)
✅ Audio Hardware (6/6 checks passed)
✅ AI Models (5/5 checks passed)

═══════════════════════════════════════
VERIFICATION COMPLETE
═══════════════════════════════════════

Status: PASSED ✨
Total Tests: 35
Passed: 35
Failed: 0
Warnings: 0

Your Distiller system is fully operational!
```

### Partial Failure

```bash
/system-verification
```

**Output:**
```
🔬 Running Comprehensive System Verification...

✅ SDK Installation (5/5 checks passed)
❌ User Permissions (5/6 checks passed)
   ⚠️  Not in 'i2c' group
✅ SPI Hardware (2/2 checks passed)
✅ GPIO Access (3/3 checks passed)
⚠️  Camera Hardware (3/4 checks passed)
   ⚠️  rpicam-apps not installed
✅ Audio Hardware (6/6 checks passed)
❌ AI Models (3/5 checks passed)
   ❌ Piper TTS model missing
   ❌ Parakeet ASR model missing

═══════════════════════════════════════
VERIFICATION COMPLETE
═══════════════════════════════════════

Status: FAILED ❌
Total Tests: 35
Passed: 29
Failed: 3
Warnings: 2

Issues Found:
1. User not in 'i2c' group
   Fix: sudo usermod -aG i2c $USER && reboot

2. rpicam-apps not installed
   Fix: sudo apt install rpicam-apps

3. AI models missing
   Fix: /system-verification --download-models
```

## Command Options

### Download Models

Download missing AI models:
```bash
/system-verification --download-models
```

This will:
- Download Piper TTS models (~100MB)
- Download Parakeet ASR models (~500MB)
- Verify model integrity
- Configure model paths

### Quick Check

Skip hardware tests, only check software:
```bash
/system-verification --quick
```

### Verbose Output

Show detailed test results:
```bash
/system-verification --verbose
```

### Generate Report

Save results to file:
```bash
/system-verification --report /path/to/report.txt
```

## Integration with Other Skills

System verification ensures other skills will work:

- **Before deployment** - Verify everything before using other skills
- **After updates** - Re-verify after system or SDK updates
- **Troubleshooting** - Comprehensive view when debugging
- **Documentation** - Generate system report for support

## Best Practices

1. **Run after installation** - First thing after installing Distiller SDK
2. **Run after updates** - After OS updates, SDK updates, or hardware changes
3. **Regular checks** - Weekly or monthly verification runs
4. **Document results** - Save reports for system records
5. **Fix issues promptly** - Address failures before they cascade

## Automated Verification

### Startup Script

Run verification on boot:
```bash
# Add to /etc/rc.local or systemd service
/usr/local/bin/system-verification --quick --log /var/log/distiller-health.log
```

### Cron Job

Schedule regular checks:
```bash
# Add to crontab
0 2 * * 0 /usr/local/bin/system-verification --report /var/log/distiller-weekly.log
```

### CI/CD Integration

Integrate into deployment pipeline:
```bash
#!/bin/bash
# deploy.sh

echo "Verifying system before deployment..."
if ! system-verification --quick; then
    echo "System verification failed!"
    exit 1
fi

echo "Deploying application..."
# deployment commands here
```

## Troubleshooting

### Verification Takes Too Long

- Use `--quick` flag to skip hardware tests
- Check for slow I2C devices (disconnect temporarily)
- Verify network connection for model downloads

### False Failures

- Some tests may fail on non-standard configurations
- Custom hardware may not be recognized
- Review manual checks for your specific setup

### Model Download Fails

```bash
# Manual model download
wget https://distiller-models.com/piper-tts/en_US-amy-medium.tar.gz
tar -xzf en_US-amy-medium.tar.gz -C ~/.local/share/piper/voices/

wget https://distiller-models.com/parakeet-asr/parakeet-ctc-1.1b.tar.gz
tar -xzf parakeet-ctc-1.1b.tar.gz -C ~/.local/share/parakeet/models/
```

## See Also

- [distiller-troubleshooting](./distiller-troubleshooting.md) - Quick diagnostics
- [hardware-led](./hardware-led.md) - LED control
- [hardware-audio](./hardware-audio.md) - Audio operations
- [hardware-camera](./hardware-camera.md) - Camera operations
- [ai-text-to-speech](./ai-text-to-speech.md) - TTS functionality
- [ai-speech-recognition](./ai-speech-recognition.md) - ASR functionality
