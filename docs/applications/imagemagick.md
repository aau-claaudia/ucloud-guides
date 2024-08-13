On AI-LAB, we have a ready-to-use [ImageMagick](https://imagemagick.org/index.php) container image. This means that you can quickly access ImageMagick's functionality within the AI-LAB environment without needing to install or configure the software yourself. By utilizing the container image, you can efficiently work with images in your projects, transforming them as needed to suit your applications or experiments.


First, lets get the path to the ImageMagick container image from the AI-LAB container directory:

```console
ls /ceph/container
```

To verify that everything is functioning as expected, let's use the "mogrify" tool to rotate some images. Begin by copying the following directory containing 100 cat images to your user directory:

```console
scp /course/ailab-docs-files/cats ~
```

Next, create a folder to store the rotated images:

```console
mkdir rotated_images
```

Finally, perform the image rotation by 90 degrees using the mogrify tool:

```console
srun singularity exec /ceph/container/imagemagick_6.9.10-23.sif` mogrify -path rotated_images -rotate 90 cats/*.png
```

<span style="font-weight: 600;">Note! </span>The container image might be newer version at this time.