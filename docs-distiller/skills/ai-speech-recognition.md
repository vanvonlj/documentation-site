---
sidebar_position: 7
---

# ai-speech-recognition

Transcribe speech to text in real-time using Parakeet ASR with Voice Activity Detection. Perfect for voice commands, dictation, and interactive applications on your Distiller device.

## Overview

The ai-speech-recognition skill provides high-accuracy automatic speech recognition (ASR) using the Parakeet neural model. Optimized for ARM64 devices with Voice Activity Detection (VAD), it delivers low-latency transcription ideal for voice assistants, voice commands, and accessibility tools.

## Features

- **Real-Time Transcription** - Live speech-to-text conversion
- **Voice Activity Detection** - Automatic speech detection
- **Parakeet ASR Model** - High accuracy neural model
- **Low Latency** - Fast response for interactive apps
- **ARM64 Optimized** - Efficient on Raspberry Pi
- **Streaming Mode** - Continuous transcription
- **File Processing** - Transcribe recorded audio

## Prerequisites

- Parakeet ASR model installed
- Microphone or audio input device
- User in `audio` group
- ~600MB storage for ASR models
- 16kHz audio recommended

## Usage

### Basic Commands

```bash
# Transcribe from microphone (5 seconds)
/ai-speech-recognition

# Transcribe with custom duration
/ai-speech-recognition --duration 10

# Transcribe from file
/ai-speech-recognition --input audio.wav

# Continuous transcription
/ai-speech-recognition --continuous

# Show confidence scores
/ai-speech-recognition --show-confidence
```

### Advanced Options

```bash
# Adjust VAD sensitivity
/ai-speech-recognition --vad-sensitivity high

# Set language model
/ai-speech-recognition --language en_US

# Real-time output
/ai-speech-recognition --streaming --duration 30

# Save transcript to file
/ai-speech-recognition --output transcript.txt
```

## Python API

### Basic Transcription

```python
from distiller_sdk import SpeechRecognition

# Create ASR instance
asr = SpeechRecognition()

# Transcribe from microphone
text = asr.transcribe()
print(f"You said: {text}")

# Transcribe from file
text = asr.transcribe_file("audio.wav")
print(f"Transcript: {text}")

# Transcribe with timeout
text = asr.transcribe(duration=10)
```

### Streaming Recognition

```python
from distiller_sdk import SpeechRecognition

asr = SpeechRecognition()

# Stream transcription
for partial_text in asr.stream_transcribe():
    print(f"Partial: {partial_text}")

# Final transcript available after loop
final_text = asr.get_final_transcript()
print(f"Final: {final_text}")
```

### Voice Activity Detection

```python
from distiller_sdk import SpeechRecognition, VADConfig

# Configure VAD
vad_config = VADConfig(
    sensitivity="medium",      # low, medium, high
    min_speech_duration=0.5,   # seconds
    max_silence_duration=1.0,  # seconds
    pre_speech_padding=0.2,    # seconds
    post_speech_padding=0.3    # seconds
)

asr = SpeechRecognition(vad_config=vad_config)

# Transcribe only when speech detected
text = asr.transcribe_with_vad()
print(f"Transcript: {text}")
```

### Advanced Configuration

```python
from distiller_sdk import SpeechRecognition, ASRConfig

# Configure ASR
config = ASRConfig(
    model="parakeet-ctc-1.1b",
    sample_rate=16000,
    language="en_US",
    beam_size=4,              # Larger = more accurate, slower
    confidence_threshold=0.7,  # Filter low-confidence results
    enable_punctuation=True,
    enable_capitalization=True
)

asr = SpeechRecognition(config)

# Transcribe with configuration
result = asr.transcribe_detailed()
print(f"Text: {result.text}")
print(f"Confidence: {result.confidence}")
print(f"Words: {result.words}")
```

## Real-Time Voice Commands

### Simple Command Recognition

```python
from distiller_sdk import SpeechRecognition, LED

asr = SpeechRecognition()
led = LED.create_led_with_sudo(0)

# Listen for commands
led.set_color(0, 0, 255)  # Blue - listening
command = asr.transcribe(duration=5)
led.off()

# Process command
if "turn on" in command.lower():
    print("Turning on")
    led.set_color(0, 255, 0)
elif "turn off" in command.lower():
    print("Turning off")
    led.off()
```

### Continuous Command Loop

```python
from distiller_sdk import SpeechRecognition, TextToSpeech

asr = SpeechRecognition()
tts = TextToSpeech()

tts.speak("Voice assistant ready. Say a command.")

while True:
    # Listen for wake word
    text = asr.transcribe(duration=3)

    if "hey distiller" in text.lower():
        tts.speak("Yes?")

        # Listen for command
        command = asr.transcribe(duration=5)

        if "what time is it" in command.lower():
            import datetime
            time_str = datetime.datetime.now().strftime("%I:%M %p")
            tts.speak(f"It's {time_str}")

        elif "stop" in command.lower():
            tts.speak("Goodbye")
            break

        else:
            tts.speak("I didn't understand that")
```

### Keyword Spotting

```python
from distiller_sdk import SpeechRecognition

asr = SpeechRecognition()

# Define keywords to detect
keywords = ["start", "stop", "help", "exit"]

# Monitor for keywords
def on_keyword(keyword, confidence):
    print(f"Detected: {keyword} (confidence: {confidence})")

    if keyword == "start":
        start_process()
    elif keyword == "stop":
        stop_process()
    elif keyword == "help":
        show_help()
    elif keyword == "exit":
        exit_application()

# Start keyword monitoring
asr.monitor_keywords(keywords, callback=on_keyword)
```

## Voice Activity Detection

### VAD Configuration

```python
from distiller_sdk import SpeechRecognition, VADConfig

# Aggressive VAD (less false positives)
vad_high = VADConfig(
    sensitivity="high",
    min_speech_duration=1.0,
    max_silence_duration=0.5
)

# Permissive VAD (catches more speech)
vad_low = VADConfig(
    sensitivity="low",
    min_speech_duration=0.3,
    max_silence_duration=2.0
)

# Balanced VAD (default)
vad_medium = VADConfig(
    sensitivity="medium",
    min_speech_duration=0.5,
    max_silence_duration=1.0
)

asr = SpeechRecognition(vad_config=vad_medium)
```

### VAD Events

```python
from distiller_sdk import SpeechRecognition

asr = SpeechRecognition()

# Register VAD callbacks
def on_speech_start():
    print("Speech started")
    led.set_color(0, 0, 255)  # Blue

def on_speech_end():
    print("Speech ended")
    led.off()

asr.on_speech_start(on_speech_start)
asr.on_speech_end(on_speech_end)

# Start listening
text = asr.transcribe_with_vad()
```

## Transcription Results

### Basic Result

```python
text = asr.transcribe()
# Returns: "hello how are you"
```

### Detailed Result

```python
result = asr.transcribe_detailed()

print(result.text)           # "Hello, how are you?"
print(result.confidence)     # 0.95
print(result.duration)       # 2.3 seconds
print(result.words)          # [Word objects with timing]
```

### Word-Level Timing

```python
result = asr.transcribe_detailed()

for word in result.words:
    print(f"{word.text}: {word.start_time}s - {word.end_time}s (conf: {word.confidence})")

# Output:
# Hello: 0.0s - 0.4s (conf: 0.98)
# how: 0.5s - 0.7s (conf: 0.95)
# are: 0.8s - 1.0s (conf: 0.97)
# you: 1.1s - 1.4s (conf: 0.96)
```

### Confidence Filtering

```python
result = asr.transcribe_detailed()

# Filter low-confidence words
high_confidence_words = [
    word.text for word in result.words
    if word.confidence > 0.8
]

# Check overall confidence
if result.confidence < 0.7:
    print("Low confidence, please repeat")
else:
    print(f"Transcript: {result.text}")
```

## Technical Details

### Performance

| Device | Model | Latency | RTF* | Accuracy |
|--------|-------|---------|------|----------|
| RPi 4 (4GB) | parakeet-ctc-1.1b | 500ms | 0.8x | 92% |
| RPi 5 (8GB) | parakeet-ctc-1.1b | 300ms | 0.5x | 92% |
| RPi 5 | parakeet-ctc-1.1b (streaming) | 200ms | 0.3x | 90% |

*RTF = Real-Time Factor (lower is faster)

### Audio Requirements

- **Sample Rate**: 16000 Hz (required)
- **Bit Depth**: 16-bit
- **Channels**: Mono
- **Format**: WAV, RAW PCM
- **Duration**: 0.5s - 60s per utterance

### Resource Usage

- **CPU**: 30-60% during transcription (RPi 4)
- **Memory**: ~800MB (model loaded)
- **Storage**: 600MB for ASR models
- **Latency**: 200-500ms

### Accuracy

**Factors affecting accuracy:**
- Background noise
- Microphone quality
- Speaking clarity
- Accent/dialect
- Audio quality (16kHz recommended)

## Language Support

### Available Models

| Language | Model | Accuracy | Size |
|----------|-------|----------|------|
| English (US) | parakeet-ctc-1.1b | 92% | 600MB |
| English (UK) | parakeet-ctc-uk | 91% | 600MB |
| Spanish | parakeet-es | 89% | 600MB |

### Using Different Languages

```python
asr_us = SpeechRecognition(language="en_US")
asr_uk = SpeechRecognition(language="en_UK")
asr_es = SpeechRecognition(language="es_ES")

# Transcribe in different languages
text_us = asr_us.transcribe()
text_uk = asr_uk.transcribe()
text_es = asr_es.transcribe()
```

## Configuration

### Default Settings

Edit `~/.config/distiller/asr.conf`:

```ini
[ASR]
model = parakeet-ctc-1.1b
language = en_US
sample_rate = 16000
beam_size = 4

[VAD]
sensitivity = medium
min_speech_duration = 0.5
max_silence_duration = 1.0
pre_speech_padding = 0.2
post_speech_padding = 0.3

[Processing]
enable_punctuation = true
enable_capitalization = true
confidence_threshold = 0.7
```

## Use Cases

### Voice Assistant

```python
from distiller_sdk import SpeechRecognition, TextToSpeech, LED

asr = SpeechRecognition()
tts = TextToSpeech()
led = LED.create_led_with_sudo(0)

while True:
    # Listen
    led.set_color(0, 0, 255)
    command = asr.transcribe()
    led.off()

    # Process
    if not command:
        continue

    # Respond
    led.set_color(0, 255, 0)
    response = process_command(command)
    tts.speak(response)
    led.off()
```

### Dictation Tool

```python
from distiller_sdk import SpeechRecognition

asr = SpeechRecognition()

print("Start dictating (press Ctrl+C to stop)")

full_text = []

try:
    while True:
        text = asr.transcribe_with_vad()
        if text:
            full_text.append(text)
            print(text, end=" ", flush=True)
except KeyboardInterrupt:
    pass

# Save to file
with open("dictation.txt", "w") as f:
    f.write(" ".join(full_text))
```

### Voice Commands

```python
from distiller_sdk import SpeechRecognition

asr = SpeechRecognition()

COMMANDS = {
    "lights on": lambda: control_lights(True),
    "lights off": lambda: control_lights(False),
    "temperature": lambda: get_temperature(),
    "status": lambda: get_status(),
}

while True:
    command = asr.transcribe().lower()

    for key, action in COMMANDS.items():
        if key in command:
            action()
            break
```

## Troubleshooting

### Model Not Found

```bash
# Check installed models
ls ~/.local/share/parakeet/models/

# Download model
/ai-speech-recognition --download-model parakeet-ctc-1.1b

# Verify installation
/system-verification
```

### Poor Accuracy

```python
# Ensure 16kHz audio
asr = SpeechRecognition(sample_rate=16000)

# Increase beam size (slower but more accurate)
config = ASRConfig(beam_size=8)
asr = SpeechRecognition(config)

# Check microphone
/hardware-audio record --output test.wav --duration 5
# Listen to test.wav to verify quality

# Reduce background noise
# Use closer microphone
# Speak clearly
```

### High Latency

```python
# Use smaller beam size
config = ASRConfig(beam_size=2)
asr = SpeechRecognition(config)

# Reduce VAD padding
vad_config = VADConfig(
    pre_speech_padding=0.1,
    post_speech_padding=0.1
)
asr = SpeechRecognition(vad_config=vad_config)

# Use streaming mode for long audio
text = asr.stream_transcribe()
```

### No Transcription Output

```bash
# Check microphone
/hardware-audio list-devices

# Test recording
/hardware-audio record --output test.wav --duration 5

# Check permissions
groups  # Should include 'audio'

# Verify VAD settings
/ai-speech-recognition --vad-sensitivity low
```

### False Speech Detection

```python
# Increase VAD threshold
vad_config = VADConfig(
    sensitivity="high",
    min_speech_duration=1.0
)
asr = SpeechRecognition(vad_config=vad_config)
```

## Best Practices

1. **Use 16kHz audio** - Required for optimal accuracy
2. **Mono recording** - Better than stereo for speech
3. **Quality microphone** - USB microphone recommended
4. **Noise reduction** - Minimize background noise
5. **VAD tuning** - Adjust for environment
6. **Confidence checking** - Filter low-confidence results
7. **Error handling** - Always handle failed transcriptions

## Advanced Examples

### Multi-Turn Conversation

```python
from distiller_sdk import SpeechRecognition, TextToSpeech

asr = SpeechRecognition()
tts = TextToSpeech()

conversation_history = []

def chat():
    tts.speak("Hello! What would you like to talk about?")

    while True:
        # Listen
        user_input = asr.transcribe()

        if not user_input:
            continue

        if "goodbye" in user_input.lower():
            tts.speak("Goodbye!")
            break

        # Add to history
        conversation_history.append(("user", user_input))

        # Generate response (your logic here)
        response = generate_response(user_input, conversation_history)
        conversation_history.append(("assistant", response))

        # Speak response
        tts.speak(response)

chat()
```

### Real-Time Subtitles

```python
from distiller_sdk import SpeechRecognition
import sys

asr = SpeechRecognition()

print("Live transcription started...")

for partial in asr.stream_transcribe():
    # Clear line and print
    sys.stdout.write('\r' + ' ' * 80)
    sys.stdout.write('\r' + partial)
    sys.stdout.flush()

# Final transcript
print("\n" + asr.get_final_transcript())
```

## See Also

- [ai-text-to-speech](./ai-text-to-speech.md) - Convert text to speech
- [hardware-audio](./hardware-audio.md) - Audio recording
- [hardware-led](./hardware-led.md) - Visual feedback
- [system-verification](./system-verification.md) - Verify ASR installation
