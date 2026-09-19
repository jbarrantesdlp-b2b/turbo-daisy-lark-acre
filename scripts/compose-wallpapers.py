#!/usr/bin/env python3
"""Compose OLED lock + home wallpapers from the official Sync Engine lockup."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

SRC = Path("/workspace/artifacts/brand/lockup-official.png")
OUT = Path("/workspace/public/media")
W, H = 1080, 2400
OLED = (5, 8, 17, 255)
CYAN = (0, 191, 255, 255)
WHITE = (255, 255, 255, 255)
MUTED = (180, 220, 235, 230)
BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"


def knockout(im: Image.Image, tol: int = 38) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    def dark(x, y):
        r, g, b, a = px[x, y]
        return a > 0 and r <= tol and g <= tol + 4 and b <= tol + 10

    from collections import deque
    q = deque()
    seen = bytearray(w * h)

    def push(x, y):
        i = y * w + x
        if seen[i]:
            return
        if not dark(x, y):
            return
        seen[i] = 1
        q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        if x > 0:
            push(x - 1, y)
        if x + 1 < w:
            push(x + 1, y)
        if y > 0:
            push(x, y - 1)
        if y + 1 < h:
            push(x, y + 1)
    return im


def isolate_mark(src: Image.Image) -> Image.Image:
    w, h = src.size
    region = src.crop((0, 0, w, int(h * 0.74))).convert("RGBA")
    px = region.load()
    rw, rh = region.size
    ys, xs = [], []
    for y in range(rh):
        for x in range(rw):
            r, g, b, a = px[x, y]
            metal = max(r, g, b) > 48 or (b > 50 and g > 35)
            if metal:
                xs.append(x)
                ys.append(y)
    pad = 28
    left = max(0, min(xs) - pad)
    top = max(0, min(ys) - pad)
    right = min(rw, max(xs) + pad)
    bottom = min(rh, max(ys) + pad)
    cropped = region.crop((left, top, right, bottom))
    return knockout(cropped, tol=52)


def fit(im: Image.Image, box: int) -> Image.Image:
    im = im.copy()
    im.thumbnail((box, box), Image.Resampling.LANCZOS)
    return im


def radial(size, center, radius, color, alpha=40):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = center
    for i in range(10, 0, -1):
        r = int(radius * i / 10)
        a = int(alpha * (i / 10) ** 3)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color[:3], a))
    return layer.filter(ImageFilter.GaussianBlur(64))


def tracked(draw, text, y, font, fill, canvas_w, tracking=6):
    widths = [font.getlength(c) for c in text]
    total = sum(widths) + tracking * max(len(text) - 1, 0)
    x = (canvas_w - total) / 2
    for c, ww in zip(text, widths):
        draw.text((x, y), c, font=font, fill=fill)
        x += ww + tracking


def glow_text(base, text, y, font, fill, tracking, glow_color, glow=12):
    tmp = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    tracked(d, text, y, font, glow_color, base.size[0], tracking)
    blurred = tmp.filter(ImageFilter.GaussianBlur(glow))
    base.alpha_composite(blurred)
    d2 = ImageDraw.Draw(base)
    tracked(d2, text, y, font, fill, base.size[0], tracking)


def canvas():
    img = Image.new("RGBA", (W, H), OLED)
    glow = radial((W, H), (W // 2, int(H * 0.48)), 420, (0, 191, 255), 36)
    img.alpha_composite(glow)
    return img


def save(img: Image.Image, name: str):
    OUT.mkdir(parents=True, exist_ok=True)
    rgb = Image.new("RGB", img.size, OLED[:3])
    rgb.paste(img, mask=img.split()[-1])
    rgb.save(OUT / f"{name}.png", optimize=True)
    rgb.save(OUT / f"{name}.jpg", quality=92, optimize=True)
    print("wrote", name, rgb.size)


def compose_lock(mark: Image.Image):
    img = canvas()
    m = fit(mark, 820)
    mx = (W - m.width) // 2
    my = int(H * 0.38)
    img.alpha_composite(m, (mx, my))

    f_sync = ImageFont.truetype(BOLD, 42)
    f_co = ImageFont.truetype(BOLD, 72)
    f_by = ImageFont.truetype(REG, 22)

    y_sync = my + m.height + 28
    glow_text(img, "SYNC ENGINE", y_sync, f_sync, WHITE, 10, (0, 191, 255, 90), 8)
    y_by = y_sync + 58
    glow_text(img, "BY", y_by, f_by, MUTED, 14, (0, 191, 255, 40), 4)
    y_co = y_by + 32
    glow_text(img, "BARRANTES CO.", y_co, f_co, CYAN, 8, (0, 191, 255, 140), 14)
    save(img, "lock-barrantes")


def compose_home(mark: Image.Image):
    img = canvas()
    m = fit(mark, 980)
    m = ImageEnhance.Brightness(m).enhance(0.85)
    faded = m.copy()
    faded.putalpha(faded.split()[-1].point(lambda a: int(a * 0.55)))
    img.alpha_composite(faded, ((W - faded.width) // 2, int(H * 0.10)))

    # bottom glass strip
    strip = Image.new("RGBA", (W, 280), (0, 0, 0, 0))
    sd = ImageDraw.Draw(strip)
    sd.rounded_rectangle((48, 24, W - 48, 256), 36, fill=(8, 14, 28, 170), outline=(0, 191, 255, 70), width=2)
    img.alpha_composite(strip, (0, H - 360))

    f_sync = ImageFont.truetype(BOLD, 28)
    f_co = ImageFont.truetype(BOLD, 56)
    y = H - 310
    glow_text(img, "SYNC ENGINE", y, f_sync, WHITE, 8, (0, 191, 255, 60), 6)
    glow_text(img, "BARRANTES CO.", y + 48, f_co, CYAN, 7, (0, 191, 255, 130), 12)
    save(img, "home-barrantes")


def main():
    src = Image.open(SRC).convert("RGBA")
    mark = isolate_mark(src)
    mark.save("/workspace/artifacts/brand/mark-knockout.png")
    compose_lock(mark)
    compose_home(mark)


if __name__ == "__main__":
    main()
