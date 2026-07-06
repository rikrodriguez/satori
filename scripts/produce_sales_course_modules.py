#!/usr/bin/env python3
import csv
import importlib
import json
import os
import shlex
import subprocess
import sys
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(os.environ.get("COURSE_ROOT", Path(__file__).resolve().parents[1]))
OUT_ROOT = Path(os.environ.get("OUT_ROOT", ROOT / "exports" / "mini-course"))
TMP_ROOT = Path(os.environ.get("TMP_ROOT", ROOT / "tmp" / "mini-course-render"))
MANIFEST = Path(os.environ.get("CLIP_MANIFEST", ROOT / "docs" / "mini-curso-sales-closer-clip-manifest-v1.csv"))

SOURCES = {
    "video_1": "1NeS49IAQlUxbHaXyYS2YlsRD_2NfI_8M",
    "video_2": "1iC9W7vUzmHXZwZ2BWQUSziJMFpRLnVM8",
}

SOURCE_PATHS = {
    "video_1": os.environ.get("SOURCE_VIDEO_1_PATH", ""),
    "video_2": os.environ.get("SOURCE_VIDEO_2_PATH", ""),
}

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
)
WORKSPACEVIDEO_API_KEY = "AIzaSyDVQw45DwoYh632gvsP5vPDqEKvb-Ywnb8"

MODULES = {
    "2": {
        "code": "M02",
        "folder": "modulo-2-tonos",
        "output": "modulo-2-tonos-v1.mp4",
        "title": "M02 - Los 4 tonos",
        "subtitle": "Sumiso, neutral, tu a tu y dominante.",
        "checkpoint": "Checkpoint: reescribe una frase sumisa en tono tu a tu.",
    },
    "3": {
        "code": "M03",
        "folder": "modulo-3-no-salesly",
        "output": "modulo-3-no-sonar-salesly-v1.mp4",
        "title": "M03 - No sonar salesly",
        "subtitle": "Natural, humano y con criterio.",
        "checkpoint": "Checkpoint: cambia una frase robotica por una frase natural.",
    },
    "4A": {
        "code": "M04A",
        "folder": "modulo-4a-ubicacion",
        "output": "modulo-4a-ubicacion-v1.mp4",
        "title": "M04A - Ubicacion sin sonar perdido",
        "subtitle": "Confirmar zona sin romper confianza.",
        "checkpoint": "Checkpoint: escribe 2 formas correctas de reconfirmar ubicacion.",
    },
    "4B": {
        "code": "M04B",
        "folder": "modulo-4b-regus",
        "output": "modulo-4b-regus-cobertura-v1.mp4",
        "title": "M04B - REGUS y cobertura local",
        "subtitle": "Referencias locales sin sonar falso.",
        "checkpoint": "Checkpoint: prepara una referencia local natural para una llamada.",
    },
    "5": {
        "code": "M05",
        "folder": "modulo-5-fecha-venue",
        "output": "modulo-5-fecha-venue-prioridades-v1.mp4",
        "title": "M05 - Fecha, venue y prioridades",
        "subtitle": "Reconfirmar fecha y entender contexto.",
        "checkpoint": "Checkpoint: que confirmarias primero si la fecha es tentativa?",
    },
    "6": {
        "code": "M06",
        "folder": "modulo-6-herramientas",
        "output": "modulo-6-crm-notas-v1.mp4",
        "title": "M06 - Herramientas, CRM y notas",
        "subtitle": "Calculator, Maps, CRM, WhatsApp y notas.",
        "checkpoint": "Checkpoint: que revisas antes de llamar y que anotas despues?",
    },
    "7": {
        "code": "M07",
        "folder": "modulo-7-estructura",
        "output": "modulo-7-estructura-llamada-v1.mp4",
        "title": "M07 - Estructura de la llamada",
        "subtitle": "Presentacion, contexto y apertura natural.",
        "checkpoint": "Checkpoint: graba una intro de 20 a 30 segundos.",
    },
    "8": {
        "code": "M08",
        "folder": "modulo-8-ramificacion",
        "output": "modulo-8-ramificacion-conexion-v1.mp4",
        "title": "M08 - Ramificacion y conexion emocional",
        "subtitle": "Salir del formulario y conversar con criterio.",
        "checkpoint": "Checkpoint: escribe 2 preguntas de ramificacion segun el evento.",
    },
    "9": {
        "code": "M09",
        "folder": "modulo-9-precio-quote-retainer",
        "output": "modulo-9-precio-quote-retainer-v1.mp4",
        "title": "M09 - Precio, quote y retainer",
        "subtitle": "Precio con contexto, confianza y siguiente paso.",
        "checkpoint": "Checkpoint: responde a 'cuanto cuesta por persona?' sin sonar evasivo.",
    },
    "10": {
        "code": "M10",
        "folder": "modulo-10-roleplay",
        "output": "modulo-10-roleplay-final-v1.mp4",
        "title": "M10 - Roleplay final",
        "subtitle": "Integrar tono, contexto, ramificacion y cierre.",
        "checkpoint": "Checkpoint: prepara tu roleplay final de 60 a 90 segundos.",
    },
}


@dataclass
class DriveStream:
    url: str
    cookies: str


def run(cmd, timeout=None):
    print("+ " + " ".join(shlex.quote(str(part)) for part in cmd), flush=True)
    subprocess.run(cmd, check=True, timeout=timeout)


def probe_duration(path):
    value = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nw=1:nk=1",
            str(path),
        ],
        text=True,
    )
    return float(value.strip())


def seconds(value):
    h, m, s = value.split(":")
    return int(h) * 3600 + int(m) * 60 + int(s)


def duration(start, end):
    return seconds(end) - seconds(start)


def resolve_drive_stream(file_id):
    try:
        return resolve_workspace_video_stream(file_id)
    except Exception as exc:
        print(f"Workspace video stream failed for {file_id}: {exc}. Falling back to gdown.", flush=True)

    mod = importlib.import_module("gdown.download")
    url = f"https://drive.google.com/uc?id={file_id}"
    sess, _cookies_file = mod._get_session(
        proxy=None,
        use_cookies=True,
        user_agent=(
            USER_AGENT
        ),
        return_cookies_file=True,
    )

    while True:
        res = sess.get(url, stream=True, verify=True)
        if "Content-Disposition" in res.headers or res.headers.get("Content-Type", "").startswith("video/"):
            final_url = res.url
            res.close()
            break
        url = mod.get_url_from_gdrive_confirmation(res.text)
        res.close()

    cookies = "; ".join(f"{cookie.name}={cookie.value}" for cookie in sess.cookies)
    return DriveStream(url=final_url, cookies=cookies)


def resolve_workspace_video_stream(file_id):
    url = (
        f"https://workspacevideo-pa.clients6.google.com/v1/drive/media/{file_id}/playback"
        f"?auditContext=forDisplay&key={WORKSPACEVIDEO_API_KEY}&%24unique=codex"
    )
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Referer": "https://drive.google.com/",
            "Origin": "https://drive.google.com",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))

    serialized = payload["mediaStreamingData"]["serializedHouseBrandPlayerResponse"]
    player = json.loads(serialized)
    formats = player.get("streamingData", {}).get("formats", [])
    mp4_formats = [
        item
        for item in formats
        if item.get("url") and "video/mp4" in item.get("mimeType", "")
    ]
    if not mp4_formats:
        raise RuntimeError("No progressive MP4 format found in Drive playback metadata.")

    best = max(
        mp4_formats,
        key=lambda item: (int(item.get("height") or 0), int(item.get("bitrate") or 0)),
    )
    print(
        f"Using Drive playback stream {best.get('qualityLabel', 'unknown')} for {file_id}.",
        flush=True,
    )
    return DriveStream(url=best["url"], cookies="")


def load_font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def centered_text(draw, y, text, font, fill, max_width=1060, line_gap=10):
    lines = []
    for raw_line in text.splitlines():
        wrapped = wrap(raw_line, width=46) or [""]
        lines.extend(wrapped)

    total_height = 0
    metrics = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        metrics.append((line, width, height))
        total_height += height + line_gap
    total_height -= line_gap

    current_y = y - total_height // 2
    for line, width, height in metrics:
        draw.text(((1280 - width) / 2, current_y), line, font=font, fill=fill)
        current_y += height + line_gap


def render_card_image(path, title, subtitle):
    img = Image.new("RGB", (1280, 720), "#13262d")
    draw = ImageDraw.Draw(img)
    draw.rectangle([(0, 0), (1280, 18)], fill="#c6a15b")
    draw.rectangle([(96, 92), (1184, 628)], outline="#2f4a52", width=2)
    draw.rectangle([(120, 118), (1160, 602)], outline="#203942", width=1)

    title_font = load_font(54, bold=True)
    subtitle_font = load_font(32)
    brand_font = load_font(28, bold=True)

    centered_text(draw, 285, title, title_font, "#ffffff", line_gap=14)
    centered_text(draw, 365, subtitle, subtitle_font, "#e7e2d5", line_gap=10)
    brand = "Excellence & Cuisines"
    bbox = draw.textbbox((0, 0), brand, font=brand_font)
    draw.text(((1280 - (bbox[2] - bbox[0])) / 2, 460), brand, font=brand_font, fill="#c6a15b")
    img.save(path)


def render_card(path, title, subtitle, duration_seconds):
    path.parent.mkdir(parents=True, exist_ok=True)
    image_path = path.with_suffix(".png")
    render_card_image(image_path, title, subtitle)
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-loop",
            "1",
            "-i",
            str(image_path),
            "-r",
            "30",
            "-f",
            "lavfi",
            "-i",
            f"anullsrc=channel_layout=stereo:sample_rate=44100:d={duration_seconds}",
            "-t",
            str(duration_seconds),
            "-shortest",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "26",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "96k",
            str(path),
        ]
    )


def render_clip(path, stream, start, end):
    path.parent.mkdir(parents=True, exist_ok=True)
    expected_duration = duration(start, end)
    headers = (
        f"User-Agent: {USER_AGENT}\r\n"
        "Referer: https://drive.google.com/\r\n"
        "Origin: https://drive.google.com\r\n"
    )
    if stream.cookies:
        headers = f"Cookie: {stream.cookies}\r\n" + headers
    input_opts = ["-headers", headers]
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-ss",
            start,
            *input_opts,
            "-i",
            stream.url,
            "-t",
            str(expected_duration),
            "-vf",
            (
                "scale=1280:720:force_original_aspect_ratio=decrease,"
                "pad=1280:720:(ow-iw)/2:(oh-ih)/2,"
                "setsar=1,fps=30,setpts=N/(30*TB),format=yuv420p"
            ),
            "-af",
            "aresample=async=1:first_pts=0",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "25",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            str(path),
        ],
        timeout=900,
    )
    actual_duration = probe_duration(path)
    if actual_duration < expected_duration - 1:
        raise RuntimeError(
            f"Rendered clip is too short: {path.name} expected {expected_duration}s, got {actual_duration:.1f}s"
        )


def concat_segments(segments, output):
    inputs = []
    filter_inputs = []
    for idx, segment in enumerate(segments):
        inputs.extend(["-i", str(segment)])
        filter_inputs.append(f"[{idx}:v:0][{idx}:a:0]")
    filter_graph = (
        "".join(filter_inputs)
        + f"concat=n={len(segments)}:v=1:a=1[vcat][acat];"
        + "[vcat]fps=30,setpts=N/(30*TB),format=yuv420p[v];"
        + "[acat]aresample=async=1:first_pts=0,asetpts=N/SR/TB[a]"
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            *inputs,
            "-filter_complex",
            filter_graph,
            "-map",
            "[v]",
            "-map",
            "[a]",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "25",
            "-r",
            "30",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            str(output),
        ]
    )


def load_manifest():
    grouped = {}
    with MANIFEST.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            module = row["module"]
            if module in MODULES:
                grouped.setdefault(module, []).append(row)
    return grouped


def main():
    modules = sys.argv[1:] or list(MODULES)
    grouped = load_manifest()
    streams = {}
    results = []

    for module in modules:
        meta = MODULES[module]
        rows = grouped[module]
        out_dir = OUT_ROOT / meta["folder"]
        tmp_dir = TMP_ROOT / meta["folder"]
        out_dir.mkdir(parents=True, exist_ok=True)
        tmp_dir.mkdir(parents=True, exist_ok=True)

        print(f"\n=== Rendering {meta['code']} ===", flush=True)
        segments = []
        title_path = tmp_dir / "00_title.mp4"
        render_card(title_path, meta["title"], meta["subtitle"], 5)
        segments.append(title_path)

        for idx, row in enumerate(rows, start=1):
            source = row["source"]
            if source not in streams:
                if SOURCE_PATHS.get(source):
                    print(f"Using mounted source path for {source}: {SOURCE_PATHS[source]}", flush=True)
                    streams[source] = DriveStream(url=SOURCE_PATHS[source], cookies="")
                else:
                    print(f"Resolving {source} from Google Drive...", flush=True)
                    streams[source] = resolve_drive_stream(SOURCES[source])
            clip_path = tmp_dir / f"{idx:02d}_{row['clip_label']}.mp4"
            try:
                render_clip(clip_path, streams[source], row["start"], row["end"])
            except (subprocess.CalledProcessError, RuntimeError) as exc:
                print(f"Clip render failed for {row['clip_label']}: {exc}", flush=True)
                print(f"Refreshing Drive stream for {source} and retrying {row['clip_label']}...", flush=True)
                if SOURCE_PATHS.get(source):
                    streams[source] = DriveStream(url=SOURCE_PATHS[source], cookies="")
                else:
                    streams[source] = resolve_drive_stream(SOURCES[source])
                render_clip(clip_path, streams[source], row["start"], row["end"])
            segments.append(clip_path)

        checkpoint_path = tmp_dir / f"{len(segments):02d}_checkpoint.mp4"
        render_card(checkpoint_path, "Checkpoint", meta["checkpoint"], 7)
        segments.append(checkpoint_path)

        output = out_dir / meta["output"]
        concat_segments(segments, output)
        results.append({"module": meta["code"], "output": str(output), "bytes": output.stat().st_size})
        print(f"Rendered {output}", flush=True)

    print(json.dumps(results, indent=2), flush=True)


if __name__ == "__main__":
    main()
