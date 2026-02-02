---
sidebar_position: 5
---

# hardware-audio

Record and play audio on ARM64 hardware using ALSA. Control microphone gain, speaker volume, and test audio devices for your Distiller applications.

## Overview

The hardware-audio skill provides comprehensive audio capabilities for recording and playback on ARM64 devices. Built on ALSA (Advanced Linux Sound Architecture), it offers low-latency audio processing ideal for voice assistants, recording applications, and audio projects.

## Features

- **Audio Recording** - Capture microphone input
- **Audio Playback** - Play sound through speakers
- **Gain Control** - Adjust microphone sensitivity
- **Volume Control** - Manage speaker volume
- **Device Testing** - Verify audio hardware
- **Multiple Formats** - Support for WAV, raw PCM
- **Sample Rate Control** - 8kHz to 48kHz

## Prerequisites

- Audio hardware (USB audio device recommended)
- User in `audio` group
- ALSA utilities installed
- Speakers or headphones for playback
- Microphone for recording

## Usage

### Basic Commands

```bash
# Record audio (10 seconds)
/hardware-audio record --output test.wav --duration 10

# Play audio
/hardware-audio play --input test.wav

# Set microphone gain
/hardware-audio set-gain 80

# Set speaker volume
/hardware-audio set-volume 75

# List audio devices
/hardware-audio list-devices

# Test audio (record then play back)
/hardware-audio test
```

### Recording Options

```bash
# Record with specific sample rate
/hardware-audio record --output speech.wav --rate 16000 --duration 5

# Record mono audio
/hardware-audio record --output mono.wav --channels 1

# Record with specific device
/hardware-audio record --device hw:1,0 --output capture.wav

# Record until stopped (Ctrl+C)
/hardware-audio record --output continuous.wav
```

### Playback Options

```bash
# Play with specific device
/hardware-audio play --input audio.wav --device hw:1,0

# Loop playback
/hardware-audio play --input music.wav --loop

# Play with volume adjustment
/hardware-audio play --input speech.wav --volume 50
```

## Audio Devices

### List Devices

```bash
/hardware-audio list-devices
```

**Output:**
```
Playback Devices:
  card 0: bcm2835 HDMI [bcm2835 HDMI]
    device 0: hdmi [HDMI]

  card 1: Device [USB Audio Device]
    device 0: USB Audio [USB Audio]

Capture Devices:
  card 1: Device [USB Audio Device]
    device 0: USB Audio [USB Audio]
```

### Device Specification

```bash
# By card number
--device hw:1,0

# By name
--device "USB Audio"

# Default device
--device default
```

## Audio Formats

### Supported Sample Rates

- **8000 Hz** - Telephony quality
- **16000 Hz** - Voice recognition (recommended for ASR)
- **22050 Hz** - Low-quality music
- **44100 Hz** - CD quality
- **48000 Hz** - Professional audio

### Supported Channels

- **1 (Mono)** - Single channel, ideal for voice
- **2 (Stereo)** - Two channels, ideal for music

### Supported Formats

- **WAV** - Uncompressed, includes header
- **RAW** - Raw PCM data, no header
- **S16_LE** - 16-bit signed little-endian (default)

## Python API

### Recording Audio

```python
from distiller_sdk import AudioRecorder

# Create recorder
recorder = AudioRecorder(
    sample_rate=16000,
    channels=1,
    format="S16_LE"
)

# Record to file
recorder.record("output.wav", duration=10)

# Record to buffer
audio_data = recorder.record_to_buffer(duration=5)
```

### Playing Audio

```python
from distiller_sdk import AudioPlayer

# Create player
player = AudioPlayer()

# Play file
player.play("audio.wav")

# Play from buffer
player.play_buffer(audio_data, sample_rate=16000)

# Play with volume control
player.play("speech.wav", volume=75)
```

### Stream Processing

```python
from distiller_sdk import AudioStream

# Create stream
stream = AudioStream(
    sample_rate=16000,
    channels=1,
    chunk_size=1024
)

# Process audio in real-time
with stream.open() as audio:
    for chunk in audio:
        # Process chunk
        processed = process_audio(chunk)
        audio.write(processed)
```

### Device Control

```python
from distiller_sdk import AudioDevice

# Get default device
device = AudioDevice.get_default()

# Set microphone gain (0-100)
device.set_capture_gain(80)

# Set speaker volume (0-100)
device.set_playback_volume(75)

# Get device info
info = device.get_info()
print(f"Device: {info.name}")
print(f"Sample rates: {info.sample_rates}")
print(f"Channels: {info.channels}")
```

## Configuration

### ALSA Configuration

Edit `~/.asoundrc` or `/etc/asound.conf`:

```conf
# Set default devices
pcm.!default {
    type hw
    card 1
    device 0
}

ctl.!default {
    type hw
    card 1
}

# Automatic format conversion
pcm.dmix_auto {
    type dmix
    ipc_key 1024
    slave {
        pcm "hw:1,0"
        rate 48000
        format S16_LE
    }
}
```

### USB Audio Device

```bash
# Check USB audio is detected
lsusb | grep -i audio

# Check ALSA sees the device
aplay -l
arecord -l

# Test playback
speaker-test -D hw:1,0 -c 2 -t wav
```

## Use Cases

### Voice Recording

```python
#!/usr/bin/env python3
from distiller_sdk import AudioRecorder

# Optimized for voice
recorder = AudioRecorder(
    sample_rate=16000,  # Optimal for speech
    channels=1,         # Mono
    gain=75            # Adjust based on environment
)

# Record voice command
recorder.record("command.wav", duration=5)
print("Recording complete!")
```

### Audio Playback

```python
#!/usr/bin/env python3
from distiller_sdk import AudioPlayer

player = AudioPlayer(volume=75)

# Play notification sound
player.play("notification.wav")

# Play speech output
player.play("response.wav")
```

### Real-Time Audio Processing

```python
#!/usr/bin/env python3
from distiller_sdk import AudioStream
import numpy as np

stream = AudioStream(sample_rate=16000, chunk_size=1024)

with stream.open() as audio:
    for chunk in audio:
        # Convert to numpy array
        samples = np.frombuffer(chunk, dtype=np.int16)

        # Apply processing (e.g., noise reduction)
        processed = noise_reduction(samples)

        # Play back
        audio.write(processed.tobytes())
```

### Audio Level Monitoring

```python
#!/usr/bin/env python3
from distiller_sdk import AudioRecorder
import numpy as np

recorder = AudioRecorder(sample_rate=16000, channels=1)

# Monitor audio levels
while True:
    chunk = recorder.read_chunk(1024)
    samples = np.frombuffer(chunk, dtype=np.int16)

    # Calculate RMS level
    rms = np.sqrt(np.mean(samples**2))
    db = 20 * np.log10(rms + 1e-10)

    print(f"Audio level: {db:.1f} dB")
```

## Technical Details

### Latency

- **Typical**: 20-50ms
- **Low latency**: Less than 10ms (requires tuning)
- **Buffer size**: Affects latency vs reliability trade-off

**Low Latency Configuration:**
```python
recorder = AudioRecorder(
    sample_rate=16000,
    buffer_size=256,  # Smaller buffer = lower latency
    period_size=64
)
```

### Buffer Management

```python
# Buffer sizes
chunk_size = 1024      # Samples per read
buffer_size = 4096     # Total buffer size
period_size = 512      # ALSA period size

# Calculate latency
latency_ms = (buffer_size / sample_rate) * 1000
print(f"Buffer latency: {latency_ms}ms")
```

### CPU Usage

- **Recording**: Less than 5% CPU (16kHz mono)
- **Playback**: Less than 5% CPU
- **Processing**: Depends on algorithms applied

### Power Consumption

- **USB Audio**: ~100mA
- **Built-in Audio**: ~50mA
- **Active Processing**: +20-50mA

## Troubleshooting

### No Audio Devices Found

```bash
# Check ALSA
aplay -l
arecord -l

# Check permissions
groups  # Should include 'audio'

# Reload ALSA
sudo alsa force-reload

# Check USB connection
lsusb
dmesg | grep -i audio
```

### Poor Audio Quality

```bash
# Check sample rate
/hardware-audio list-devices

# Test different rates
/hardware-audio record --rate 16000 --output test16k.wav
/hardware-audio record --rate 48000 --output test48k.wav

# Check for USB power issues
# Use powered USB hub if needed
```

### Audio Crackling/Popping

- Increase buffer size
- Use powered USB hub
- Check CPU usage (reduce other processes)
- Update USB audio firmware

### Recording Too Quiet

```bash
# Increase gain
/hardware-audio set-gain 100

# Use alsamixer for fine control
alsamixer

# Check physical microphone connection
# Verify microphone is not muted
```

### Playback Too Loud/Quiet

```bash
# Adjust volume
/hardware-audio set-volume 75

# Use alsamixer
alsamixer

# Check speaker amplifier settings
```

## Hardware Recommendations

### USB Audio Devices

**Recommended:**
- USB Audio Adapter (CM108/CM119 chipset)
- Blue Snowball (USB microphone)
- Jabra Speak series
- Creative Sound Blaster Play! 3

**Features to Look For:**
- USB Audio Class compliance (no drivers needed)
- 16kHz+ sample rate support
- Low latency
- Hardware volume control

### Wiring for Analog Audio

**I2S DAC/ADC:**
- Better quality than USB
- Lower latency
- Requires GPIO pins
- Examples: Adafruit I2S MEMS Microphone, HiFiBerry DAC

## Best Practices

1. **Use USB audio** - More reliable than built-in audio
2. **16kHz for voice** - Optimal for speech recognition
3. **Mono for voice** - Reduces file size, works better with ASR
4. **Buffer tuning** - Balance latency vs reliability
5. **Power supply** - Use powered USB hub for multiple devices
6. **Error handling** - Always check return values
7. **Resource cleanup** - Close audio streams when done

## Integration Examples

### Voice Assistant

```python
from distiller_sdk import AudioRecorder, AudioPlayer
from distiller_skills import ai_speech_recognition, ai_text_to_speech

recorder = AudioRecorder(sample_rate=16000, channels=1)
player = AudioPlayer()

# Record user command
recorder.record("command.wav", duration=5)

# Transcribe
text = ai_speech_recognition.transcribe("command.wav")

# Process command
response = process_command(text)

# Generate speech
ai_text_to_speech.synthesize(response, "response.wav")

# Play response
player.play("response.wav")
```

### Audio Monitoring

```python
from distiller_sdk import AudioRecorder, LED

recorder = AudioRecorder(sample_rate=16000)
led = LED.create_led_with_sudo(0)

while True:
    chunk = recorder.read_chunk(1024)
    level = calculate_rms(chunk)

    # Visual feedback
    if level < -40:
        led.set_color(0, 255, 0)  # Green - quiet
    elif level < -20:
        led.set_color(255, 255, 0)  # Yellow - moderate
    else:
        led.set_color(255, 0, 0)  # Red - loud
```

## See Also

- [ai-speech-recognition](./ai-speech-recognition.md) - Transcribe audio to text
- [ai-text-to-speech](./ai-text-to-speech.md) - Generate audio from text
- [hardware-led](./hardware-led.md) - Visual feedback for audio status
- [system-verification](./system-verification.md) - Verify audio hardware
- [distiller-troubleshooting](./distiller-troubleshooting.md) - Debug audio issues
