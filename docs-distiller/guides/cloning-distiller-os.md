---

sidebar_position: 1
---

# Cloning Distiller OS

Step-by-step guide for setting up Distiller on a Raspberry Pi.

## Prerequisites

- Raspberry Pi 4 or newer
- MicroSD card (32GB minimum)
- Power supply
- Network connection
- A Linux workstation (recommended) or USB drive for storing the image
- sudo access on the machine doing the imaging

## Overview

This guide shows three safe ways to create a full dd image of a Raspberry Pi SD card (so you can later write it to new cards):  

1) Recommended: remove the SD from the Pi and image it on a Linux workstation.  
2) Over the network: stream the SD from the running Pi to a workstation via SSH.  
3) On the Pi: image to an attached external USB drive.

Read safety notes carefully — dd will overwrite devices if used incorrectly.

## Safety notes

- Always confirm device names before running dd (e.g. `/dev/sdb` or `/dev/mmcblk0`). Do not use partition names (e.g. `/dev/sdb1`) for the device-level copy.  
- Work on the powered-off Pi SD is safest (remove card and image on another computer).  
- Keep a checksum of the image for later verification.

## 1. Create the image (recommended: image the card on a workstation)

1. Power off the Pi and remove the SD card. Insert it into your Linux workstation (USB adapter).

2. Identify the device:
   - Run:
       lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT,LABEL
   - Note the block device (example: /dev/sdb or /dev/mmcblk0). Confirm no partitions are mounted.

3. Unmount any mounted partitions:
   - Example:

       ```bash
       sudo umount /dev/sdX? || true
       ```

4. Create the image with progress and safe write:
   - Example:

       ```bash
       sudo dd if=/dev/sdX of="$HOME/distiller-pi-$(date +%Y%m%d).img" bs=4M status=progress conv=fsync
       sync
       ```

5. Create a SHA256 checksum:
   - Example:

    ```bash
    sha256sum "$HOME/distiller-pi-YYYYMMDD.img" > "$HOME/distiller-pi-YYYYMMDD.img.sha256"
    ```

6. Compress for storage (optional):
   - Example using xz:

    ```bash
    xz -9 --threads=0 "$HOME/distiller-pi-YYYYMMDD.img"
    ```

## 2. Create the image over the network (Pi running, image stored on workstation)

1. On the workstation, listen and write to file:
   - Example (run on workstation):

    ```bash
    ssh user@pi 'sudo dd if=/dev/mmcblk0 bs=4M status=progress conv=fsync' | pv > ~/distiller-pi-$(date +%Y%m%d).img
    ```

   - Or pull via netcat:
       On workstation:

       ```bash
       nc -l 9000 > ~/distiller-pi.img
       ```

       On Pi:

        ```bash
        sudo dd if=/dev/mmcblk0 bs=4M | nc workstation-ip 9000
        ```

2. Verify checksum and compress as above.

Notes: streaming a running root filesystem can produce an inconsistent snapshot; best to stop services and, if possible, boot Pi into single-user mode or run from another media.

## 3. Create the image on the Pi to an attached USB drive

1. Attach and identify the USB drive (e.g. /dev/sda, mounted at /media/usb).

2. Unmount any mounted partitions on the USB drive.

3. Run:

    ```bash
    sudo dd if=/dev/mmcblk0 of=/path/to/usb/distiller-pi-$(date +%Y%m%d).img bs=4M status=progress conv=fsync

    sync
    ```

4. Create checksum on the USB drive.

## 3.a Imaging while logged in on the Compute Module (live snapshot)

If you must create an image from the running Compute Module, prefer one of these safer options to reduce filesystem inconsistency:

Option A — minimal service stop (simple):

- Drop to rescue and stop most services, then image:

    ```bash
    sudo systemctl isolate rescue.target
    
    sudo dd if=/dev/mmcblk0 of=/path/to/usb/distiller-cm-$(date +%Y%m%d).img bs=4M status=progress conv=fsync
    
    sync

    sudo systemctl default
    ```

Option B — freeze filesystems (if supported):

- Freeze, image, then unfreeze:

```bash
sudo fsfreeze -f /

sudo dd if=/dev/mmcblk0 of=/path/to/usb/distiller-cm-$(date +%Y%m%d).img bs=4M status=progress conv=fsync

sync

sudo fsfreeze -u /
```

Notes:

- Live dd can produce inconsistent images; best to image via rpiboot or from another host when possible.
- Verify and compress the image as described in sections 4–6.

## 4. Verify and restore

- Verify checksum on the created image:

    ```bash
    sha256sum -c distiller-pi-YYYYMMDD.img.sha256
    ```

- To restore to a target SD (careful: this overwrites the target):

    ```bash
    sudo dd if=distiller-pi-YYYYMMDD.img of=/dev/sdY bs=4M status=progress conv=fsync
    
    sync
    ```

- If the image is compressed:

    ```bash
    xz -dc distiller-pi.img.xz | sudo dd of=/dev/sdY bs=4M status=progress conv=fsync
    ```

## 5. Post-restore notes

- On first boot of a cloned card, remove or regenerate SSH host keys if cloning many devices:

    ```bash
    sudo rm /etc/ssh/ssh_host_*
    ```

- If the target SD is larger, expand the root filesystem using raspi-config after first boot or use growpart/resize2fs offline.

## Troubleshooting

- If dd is slow, try bs=4M and ensure USB adapter is USB3 if available.
- If unsure about device names, stop and ask — do not run dd.

## Recommended: shrink before compressing

- Use [piShrink](https://github.com/Drewsif/PiShrink) to reduce image size before compression.
