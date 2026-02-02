---
sidebar_position: 1
---

# Distiller Skills Overview

Distiller provides a powerful set of skills that enable hardware interaction, AI capabilities, and system management. Each skill is designed to simplify complex operations and provide a streamlined interface for working with the Distiller device.

## Available Skills

### Diagnostics & System

#### [distiller-troubleshooting](./distiller-troubleshooting.md)
Quick diagnostics for Distiller SDK hardware issues. Ideal for resolving permission errors, device detection failures, or single-component problems.

**Use when:**
- Encountering permission errors
- Device detection failures
- Single-component issues

#### [system-verification](./system-verification.md)
Comprehensive hardware and SDK testing to verify complete system health. Tests all hardware components, validates SDK installation, checks permissions, and verifies AI models.

**Use when:**
- Setting up new systems
- Validating installations
- Debugging system-wide issues

### Hardware Control

#### [hardware-led](./hardware-led.md)
Control RGB status LEDs with colors, brightness, and animations (blink, fade, rainbow, heartbeat). Provides visual feedback and status indicators.

**Key features:**
- Color control
- Brightness adjustment
- Multiple animation patterns
- Requires sudo access

#### [hardware-audio](./hardware-audio.md)
Record and play audio on ARM64 hardware using ALSA. Control microphone gain and speaker volume, test audio devices, and troubleshoot sound issues.

**Key features:**
- Audio recording
- Audio playback
- Volume and gain control
- Device testing

#### [hardware-camera](./hardware-camera.md)
Capture images and stream video from Raspberry Pi cameras using rpicam-apps and OpenCV. Perfect for computer vision applications.

**Key features:**
- Photo capture
- Video streaming
- Frame processing
- OpenCV integration

### AI Capabilities

#### [ai-text-to-speech](./ai-text-to-speech.md)
Convert text to natural-sounding speech using Piper neural TTS engine. Stream audio directly to speakers or save as WAV files.

**Key features:**
- Neural TTS engine (Piper)
- en_US-amy-medium voice
- Stream or save audio
- ARM64 optimized

#### [ai-speech-recognition](./ai-speech-recognition.md)
Transcribe speech to text in real-time using Parakeet ASR with Voice Activity Detection. Ideal for voice commands and interactive applications.

**Key features:**
- Real-time transcription
- Voice Activity Detection
- Low latency
- ARM64 optimized

### Networking

#### [port-proxy](./port-proxy.md)
Expose local web applications publicly through the Distiller platform's built-in reverse proxy. Solve path issues and MIME type problems.

**Use when:**
- Making apps public
- Fixing proxy errors
- Resolving CSS/JS loading issues
- Handling API 404s behind proxies

## Quick Start

All skills are invoked using the `/skill-name` command in the Distiller environment. For example:

```bash
/distiller-troubleshooting
/hardware-led
/ai-text-to-speech
```

Each skill has its own set of parameters and options. Click on any skill above to see detailed documentation, examples, and technical specifications.

## Integration

Skills are designed to work together seamlessly. For example:
- Use **ai-speech-recognition** to capture voice input
- Process the command with your application
- Use **ai-text-to-speech** to provide voice feedback
- Use **hardware-led** to show visual status

## Next Steps

- Explore individual skill documentation for detailed usage
- Check out the [Getting Started Guide](../guides/cloning-distiller-os.md)
- Learn about [system architecture](../intro.md)
