---
sidebar_position: 1
---

# LogiOps & LogiOpsGUI

Install and configure **LogiOps** (unofficial Logitech driver for Linux) and its GUI frontend on Debian-based distros (Ubuntu, ZorinOS).

LogiOps replaces the Windows/macOS **Logi Options+** software, giving you full control over Logitech mice and keyboards — DPI, scroll speed, button remapping, and more.

## Prerequisites

- Ubuntu 20.04+ or ZorinOS (any release)
- A Logitech device that uses the **HID++** protocol (most modern Logitech mice and keyboards)
- `sudo` access

---

## Installing LogiOps

LogiOps is built from source. There is no official apt package.

### 1. Install Build Dependencies

```bash
sudo apt update
sudo apt install -y \
  build-essential \
  cmake \
  pkg-config \
  libevdev-dev \
  libudev-dev \
  libconfig++-dev
```

### 2. Clone and Build

```bash
gh repo clone PixlOne/logiops
cd logiops
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make
sudo make install
```

> You can also clone with plain git if you don't have `gh` installed:
> ```bash
> git clone https://github.com/PixlOne/logiops.git
> ```

### 3. Enable the Service

LogiOps runs as a systemd daemon (`logid`):

```bash
sudo systemctl enable --now logid
```

Verify it started cleanly:

```bash
sudo systemctl status logid
```

---

## Basic Configuration

The config file lives at `/etc/logid.cfg`. Create it if it doesn't exist:

```bash
sudo nano /etc/logid.cfg
```

### Minimal Example (MX Master 3)

```
devices: (
{
  name: "MX Master 3";
  smartshift:
  {
    on: true;
    threshold: 20;
  };
  hiresscroll:
  {
    hires: true;
    invert: false;
    target: false;
  };
  dpi: 1500;

  buttons: (
    {
      cid: 0xc3;
      action =
      {
        type: "Gestures";
        gestures: (
          {
            direction: "Up";
            mode: "OnRelease";
            action =
            {
              type: "Keypress";
              keys: ["KEY_VOLUMEUP"];
            };
          },
          {
            direction: "Down";
            mode: "OnRelease";
            action =
            {
              type: "Keypress";
              keys: ["KEY_VOLUMEDOWN"];
            };
          },
          {
            direction: "None";
            mode: "OnRelease";
            action =
            {
              type: "Keypress";
              keys: ["KEY_PLAYPAUSE"];
            };
          }
        );
      };
    }
  );
}
);
```

After editing the config, restart the service:

```bash
sudo systemctl restart logid
```

### Finding Your Device Name

If you're unsure of your device's exact name, run:

```bash
sudo logid -v
```

The device name will appear in the output — use it exactly (including capitalization) in `logid.cfg`.

---

## Installing LogiOpsGUI

**LogiOpsGUI** (by matthewmoonen) provides a graphical interface for editing your `logid.cfg` without writing config manually.

### 1. Install Dependencies

```bash
sudo apt install -y python3.12-venv python3-tk
```

### 2. Clone and Run the Installer

```bash
gh repo clone matthewmoonen/LogiOpsGui
cd LogiOpsGui
./install.sh
```

> You can also clone with plain git:
> ```bash
> git clone https://github.com/matthewmoonen/LogiOpsGui.git
> ```

The `install.sh` script sets up a Python virtual environment and installs all required dependencies automatically.

:::note
LogiOpsGUI requires `logid` to already be installed and running. Make sure the `logid` service is active before launching the GUI.
:::

---

## Troubleshooting

### `logid` fails to start — device not found

Check that your device is connected and recognized:

```bash
sudo logid -v 2>&1 | head -40
```

If using a USB dongle, try unplugging and replugging it.

### Permission denied on `/dev/input/`

Add your user to the `input` group:

```bash
sudo usermod -aG input $USER
```

Log out and back in for the change to take effect.

### Config changes not applying

Always restart the service after editing the config:

```bash
sudo systemctl restart logid
```

### Check service logs

```bash
journalctl -u logid -f
```

---

## See Also

- [LogiOps GitHub (PixlOne)](https://github.com/PixlOne/logiops) — source, README, and supported devices list
- [LogiOps Wiki](https://github.com/PixlOne/logiops/wiki) — full config reference
- [LogiOpsGui GitHub (matthewmoonen)](https://github.com/matthewmoonen/LogiOpsGui) — GUI frontend source
