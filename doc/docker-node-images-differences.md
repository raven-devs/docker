# Docker: Nodejs images differences

## Full official image

```bash
node:18.16.0
```

These images are based on the most recent stable Debian operating system release.

## stretch/buster/jessie

Images tagged with stretch, buster, or jessie are codenames for different Debian releases. At the time of this writing, the stable Debian release is 10.4, and its codename is "Buster". "Stretch" was the codename for all version 9 variations, and "Jessie" was the codename for all version 8 variations. Future versions in development, but not yet stable, are "Bullseye" and "Bookworm". You may start seeing these tags in the list of image versions on DockerHub.

## -slim

The slim image is a paired down version of the full image. This image generally only installs the minimal packages needed to run your particular tool. In the case of python, that’s the minimum packages to run python and the same for node.js.

By leaving out lesser-used tools, the image is smaller. Use this image if you have space constraints and do not need the full version.

## -alpine

Alpine images are based on the Alpine Linux Project, which is an operating system that was built specifically for use inside of containers. For a long time, these were the most popular image variations due to their tiny size.

However, some teams are moving away from alpine because these images can cause compatibility issues that are hard to debug. Specifically, if using python images, some wheels are built to be compatible with Debian and will need to be recompiled to work with an Apline-based image.

The main reason to use an Alpine image is to make your resulting image as small as possible. The base image will be smaller than 5MB. The python base image (adding python to the base alpine image) is currently 78.9MB. That’s still very small.

This image is the most highly recommended if space is a concern.
