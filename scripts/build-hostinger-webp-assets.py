from pathlib import Path
import sys

from PIL import Image, ImageOps


SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
QUALITY = 90


def convert_for_webp(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    if image.mode in ("RGB", "RGBA"):
        return image
    if "A" in image.getbands():
        return image.convert("RGBA")
    return image.convert("RGB")


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: build-hostinger-webp-assets.py <images-dir>", file=sys.stderr)
        return 1

    images_dir = Path(sys.argv[1])
    if not images_dir.exists():
        print("No out/images directory found; skipping WebP generation.")
        return 0

    source_files = sorted(
        path
        for path in images_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in SOURCE_EXTENSIONS
    )

    source_bytes = 0
    webp_bytes = 0
    generated = 0
    skipped_larger = 0

    for source_file in source_files:
        webp_file = source_file.with_name(f"{source_file.name}.webp")
        temp_file = source_file.with_name(f"{source_file.name}.webp.tmp")
        source_size = source_file.stat().st_size
        source_bytes += source_size

        with Image.open(source_file) as image:
            webp_image = convert_for_webp(image)
            webp_image.save(
                temp_file,
                "WEBP",
                quality=QUALITY,
                method=6,
                exact=webp_image.mode == "RGBA",
            )

        webp_size = temp_file.stat().st_size
        if webp_size < source_size:
            temp_file.replace(webp_file)
            webp_bytes += webp_size
            generated += 1
        else:
            temp_file.unlink(missing_ok=True)
            webp_file.unlink(missing_ok=True)
            skipped_larger += 1

    source_mb = source_bytes / 1024 / 1024
    webp_mb = webp_bytes / 1024 / 1024
    print(
        "Generated "
        f"{generated} Hostinger WebP fallbacks at quality {QUALITY}: "
        f"{source_mb:.1f}MB source -> {webp_mb:.1f}MB WebP "
        f"({skipped_larger} skipped because WebP was larger)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
