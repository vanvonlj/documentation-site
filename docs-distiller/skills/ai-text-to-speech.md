---
sidebar_position: 6
---

# ai-text-to-speech

Convert text to natural-sounding speech using Piper neural TTS engine. Generate voice responses, test audio playback, or create speech synthesis applications on your Distiller device.

## Overview

The ai-text-to-speech skill provides high-quality text-to-speech (TTS) synthesis using the Piper neural TTS engine. Optimized for ARM64 devices, it delivers natural-sounding speech with low latency, perfect for voice assistants, accessibility tools, and interactive applications.

## Features

- **Neural TTS** - Natural-sounding speech using Piper
- **Multiple Voices** - en_US-amy-medium (more voices available)
- **Streaming Audio** - Direct playback to speakers
- **File Output** - Save as WAV files
- **ARM64 Optimized** - Efficient performance on Raspberry Pi
- **Low Latency** - Fast synthesis for real-time applications
- **SSML Support** - Control speech with markup

## Prerequisites

- Piper TTS engine installed
- en_US-amy-medium voice model
- Speaker or audio output device
- User in `audio` group
- ~200MB storage for voice models

## Usage

### Basic Commands

```bash
# Speak text
/ai-text-to-speech "Hello, how can I help you today?"

# Save to file
/ai-text-to-speech "Welcome to Distiller" --output welcome.wav

# Use specific voice
/ai-text-to-speech "Testing different voices" --voice en_US-amy-medium

# Adjust speaking rate
/ai-text-to-speech "I'm speaking faster" --rate 1.5
```

### Advanced Options

```bash
# Control pitch
/ai-text-to-speech "Higher pitch" --pitch 1.2

# Control volume
/ai-text-to-speech "Louder voice" --volume 90

# Save without playing
/ai-text-to-speech "Silent generation" --output audio.wav --no-play

# Stream to speaker
/ai-text-to-speech "Streaming audio" --stream
```

### SSML Markup

```bash
# Use SSML for control
/ai-text-to-speech '<speak>Hello! <break time="500ms"/> How are you?</speak>' --ssml

# Emphasis
/ai-text-to-speech '<speak>This is <emphasis level="strong">important</emphasis>!</speak>' --ssml

# Pronunciation
/ai-text-to-speech '<speak>Read as <say-as interpret-as="digits">123</say-as></speak>' --ssml
```

## Python API

### Basic Synthesis

```python
from distiller_sdk import TextToSpeech

# Create TTS instance
tts = TextToSpeech(voice="en_US-amy-medium")

# Speak text
tts.speak("Hello, world!")

# Generate to file
tts.synthesize("Welcome to Distiller", output="welcome.wav")

# Get audio data
audio_data = tts.synthesize_to_buffer("Testing speech")
```

### Advanced Usage

```python
from distiller_sdk import TextToSpeech, TTSConfig

# Configure TTS
config = TTSConfig(
    voice="en_US-amy-medium",
    rate=1.0,      # Speaking rate (0.5-2.0)
    pitch=1.0,     # Pitch adjustment (0.5-2.0)
    volume=80,     # Volume (0-100)
    sample_rate=22050
)

tts = TextToSpeech(config)

# Synthesize with custom settings
tts.speak("This is customized speech", rate=1.2, pitch=0.9)
```

### Streaming Synthesis

```python
from distiller_sdk import TextToSpeech

tts = TextToSpeech()

# Stream long text
long_text = "This is a very long piece of text that will be synthesized in chunks..."

# Generates and plays as it processes
tts.stream_speak(long_text)
```

### Batch Processing

```python
from distiller_sdk import TextToSpeech

tts = TextToSpeech()

# Process multiple phrases
phrases = [
    "Welcome",
    "Please wait",
    "Processing complete",
    "Thank you"
]

# Generate all at once
audio_files = tts.batch_synthesize(phrases, output_dir="audio_files")

# Play sequentially
for audio_file in audio_files:
    tts.play_file(audio_file)
```

## Voice Models

### Available Voices

| Voice | Language | Quality | Size | Speed |
|-------|----------|---------|------|-------|
| en_US-amy-medium | English (US) | Medium | 40MB | Fast |
| en_US-amy-low | English (US) | Low | 15MB | Very Fast |
| en_US-libritts-high | English (US) | High | 150MB | Slow |
| en_GB-alan-medium | English (UK) | Medium | 42MB | Fast |

### Install Additional Voices

```bash
# List available voices
/ai-text-to-speech --list-voices

# Download voice
/ai-text-to-speech --download-voice en_GB-alan-medium

# Set default voice
/ai-text-to-speech --set-default-voice en_GB-alan-medium
```

### Voice Characteristics

**en_US-amy-medium** (Default)
- Natural female voice
- Clear pronunciation
- Good for general use
- Balanced speed/quality

**en_US-libritts-high**
- Highest quality
- More expressive
- Slower synthesis
- Best for offline audio generation

**en_GB-alan-medium**
- British accent
- Male voice
- Professional tone

## Configuration

### Default Settings

Edit `~/.config/distiller/tts.conf`:

```ini
[TTS]
voice = en_US-amy-medium
rate = 1.0
pitch = 1.0
volume = 80
sample_rate = 22050
output_device = default

[Advanced]
cache_enabled = true
cache_dir = ~/.cache/distiller/tts
max_cache_size = 500MB
```

### Performance Tuning

```python
from distiller_sdk import TextToSpeech, PerformanceMode

# Fast mode (lower quality)
tts = TextToSpeech(performance_mode=PerformanceMode.FAST)

# Balanced mode (default)
tts = TextToSpeech(performance_mode=PerformanceMode.BALANCED)

# Quality mode (slower)
tts = TextToSpeech(performance_mode=PerformanceMode.QUALITY)
```

## Use Cases

### Voice Assistant

```python
from distiller_sdk import TextToSpeech, LED

tts = TextToSpeech()
led = LED.create_led_with_sudo(0)

# Speaking indicator
led.set_color(0, 255, 0)
tts.speak("Hello! How can I help you?")
led.off()
```

### Interactive Responses

```python
from distiller_sdk import TextToSpeech

tts = TextToSpeech()

# Acknowledge user action
def confirm_action(action):
    tts.speak(f"Okay, I'll {action}")

# Provide feedback
def give_status(status):
    tts.speak(f"Current status: {status}")

# Error notification
def announce_error(error):
    tts.speak(f"Sorry, there was an error: {error}", rate=0.9)
```

### Accessibility

```python
from distiller_sdk import TextToSpeech

tts = TextToSpeech(rate=0.8)  # Slower for clarity

# Read text aloud
def read_text(text):
    # Clean and prepare text
    cleaned = clean_text(text)

    # Read with pauses
    sentences = cleaned.split('. ')
    for sentence in sentences:
        tts.speak(sentence)
        time.sleep(0.3)  # Pause between sentences
```

### Notifications

```python
from distiller_sdk import TextToSpeech
import threading

tts = TextToSpeech()

def speak_async(text):
    """Non-blocking speech"""
    thread = threading.Thread(target=tts.speak, args=(text,))
    thread.start()
    return thread

# System notifications
speak_async("New message received")
speak_async("Battery low")
speak_async("Update available")
```

## Technical Details

### Synthesis Performance

| Device | Model | Speed | RTF* |
|--------|-------|-------|------|
| RPi 4 (4GB) | amy-medium | Fast | 0.5x |
| RPi 5 (8GB) | amy-medium | Very Fast | 0.3x |
| RPi 4 | libritts-high | Slow | 2.0x |
| RPi 5 | libritts-high | Medium | 1.2x |

*RTF = Real-Time Factor (lower is faster)

### Audio Specifications

- **Sample Rate**: 22050 Hz (default)
- **Bit Depth**: 16-bit
- **Channels**: Mono
- **Format**: WAV (PCM)
- **Bitrate**: ~352 kbps

### Resource Usage

- **CPU**: 20-40% during synthesis (RPi 4)
- **Memory**: ~200MB (model loaded)
- **Storage**: 40MB per voice model
- **Latency**: 200-500ms first word

### Caching

```python
from distiller_sdk import TextToSpeech

tts = TextToSpeech(cache_enabled=True)

# First call: synthesizes (~500ms)
tts.speak("Hello, world!")

# Second call: from cache (~50ms)
tts.speak("Hello, world!")

# Clear cache
tts.clear_cache()
```

## SSML Support

### Breaks (Pauses)

```xml
<speak>
  Hello! <break time="500ms"/>
  How are you today? <break time="1s"/>
  I hope you're doing well.
</speak>
```

### Emphasis

```xml
<speak>
  This is <emphasis level="strong">very important</emphasis>!
  Please pay <emphasis level="moderate">attention</emphasis>.
</speak>
```

### Say-As (Number/Date Reading)

```xml
<speak>
  Your number is <say-as interpret-as="digits">123456</say-as>.
  The date is <say-as interpret-as="date" format="mdy">12/31/2024</say-as>.
  The time is <say-as interpret-as="time">2:30pm</say-as>.
</speak>
```

### Prosody (Rate/Pitch/Volume)

```xml
<speak>
  <prosody rate="fast">Speaking quickly</prosody>
  <prosody rate="slow">Speaking slowly</prosody>
  <prosody pitch="high">Higher pitch</prosody>
  <prosody volume="loud">Louder volume</prosody>
</speak>
```

## Troubleshooting

### Voice Model Not Found

```bash
# Check installed voices
ls ~/.local/share/piper/voices/

# Download default voice
/ai-text-to-speech --download-voice en_US-amy-medium

# Verify installation
/system-verification
```

### Poor Audio Quality

```bash
# Use higher quality model
/ai-text-to-speech "Test" --voice en_US-libritts-high

# Increase sample rate
/ai-text-to-speech "Test" --sample-rate 48000 --output test.wav

# Check audio device
/hardware-audio list-devices
```

### Slow Synthesis

```python
# Use faster model
tts = TextToSpeech(voice="en_US-amy-low")

# Enable caching
tts = TextToSpeech(cache_enabled=True)

# Reduce sample rate
tts = TextToSpeech(sample_rate=16000)
```

### No Audio Output

```bash
# Check audio device
/hardware-audio list-devices

# Test audio playback
/hardware-audio play test.wav

# Check permissions
groups  # Should include 'audio'

# Check volume
/hardware-audio set-volume 75
```

### Text Not Speaking Correctly

```python
# Use SSML for better control
text = '<speak>Read as <say-as interpret-as="digits">123</say-as></speak>'
tts.speak(text, ssml=True)

# Adjust speaking rate for clarity
tts.speak("Complex technical terms", rate=0.8)

# Use phonetic spelling
tts.speak("It's pronounced 'pahm-eer'")
```

## Best Practices

1. **Cache common phrases** - Reduce latency for repeated text
2. **Async for long text** - Don't block main thread
3. **Adjust rate for clarity** - Slower for important information
4. **Use SSML for control** - Better pronunciation and timing
5. **Stream long content** - Better UX for lengthy text
6. **Error handling** - Always check synthesis success
7. **Test voices** - Find the best voice for your application

## Advanced Examples

### Context-Aware Speaking

```python
from distiller_sdk import TextToSpeech
import re

class SmartTTS:
    def __init__(self):
        self.tts = TextToSpeech()

    def speak_smart(self, text):
        # Detect question
        if text.endswith('?'):
            # Slightly higher pitch for questions
            self.tts.speak(text, pitch=1.1)

        # Detect emphasis
        elif '!' in text:
            # More emphasis
            self.tts.speak(text, rate=0.95, volume=90)

        # Normal speech
        else:
            self.tts.speak(text)

    def speak_numbers(self, text):
        # Convert numbers to words for better pronunciation
        def replace_numbers(match):
            num = int(match.group())
            return f'<say-as interpret-as="cardinal">{num}</say-as>'

        text_with_ssml = f'<speak>{re.sub(r"\d+", replace_numbers, text)}</speak>'
        self.tts.speak(text_with_ssml, ssml=True)

tts = SmartTTS()
tts.speak_smart("What time is it?")
tts.speak_numbers("You have 42 new messages")
```

### Multilingual Support

```python
from distiller_sdk import TextToSpeech

class MultilingualTTS:
    def __init__(self):
        self.voices = {
            'en_US': TextToSpeech(voice='en_US-amy-medium'),
            'en_GB': TextToSpeech(voice='en_GB-alan-medium'),
            # Add more languages
        }
        self.current_lang = 'en_US'

    def speak(self, text, lang=None):
        lang = lang or self.current_lang
        if lang in self.voices:
            self.voices[lang].speak(text)
        else:
            print(f"Language {lang} not supported")

    def auto_detect_and_speak(self, text):
        # Simple language detection
        lang = detect_language(text)
        self.speak(text, lang)

tts = MultilingualTTS()
tts.speak("Hello, world!", lang='en_US')
tts.speak("Hello, mate!", lang='en_GB')
```

## See Also

- [ai-speech-recognition](./ai-speech-recognition.md) - Convert speech to text
- [hardware-audio](./hardware-audio.md) - Audio playback control
- [hardware-led](./hardware-led.md) - Visual feedback while speaking
- [system-verification](./system-verification.md) - Verify TTS installation
