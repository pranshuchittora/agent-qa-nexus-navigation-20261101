"""生成发布用的社交分享图与 iOS 主屏图标。

用法（在项目根目录）：
    python scripts/generate-social-assets.py

输出：
    public/og-cover.png          1200x630，用于 Open Graph / Twitter 卡片
    public/apple-touch-icon.png  180x180，iOS 添加到主屏时的图标
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
FONT_REGULAR = "C:/Windows/Fonts/msyh.ttc"

BG = (5, 6, 10)
TEXT = (244, 246, 251)
TEXT_SOFT = (203, 213, 240)
TEXT_MUTED = (122, 134, 168)

BRAND = [(122, 162, 255), (176, 124, 255), (79, 227, 193)]


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def brand_color_at(t):
    """在品牌三色渐变上取色，t ∈ [0, 1]。"""
    t = max(0.0, min(1.0, t))
    if t < 0.5:
        return lerp(BRAND[0], BRAND[1], t / 0.5)
    return lerp(BRAND[1], BRAND[2], (t - 0.5) / 0.5)


def add_glow(base, center, radius, color, alpha):
    """叠加一团柔和的彩色光。"""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x, y = center
    draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.55))
    base.alpha_composite(layer)


def draw_gradient_bar(image, box, radius=0):
    """画一条品牌渐变横条。"""
    x0, y0, x1, y1 = box
    width = x1 - x0
    bar = Image.new("RGB", (width, y1 - y0))
    draw = ImageDraw.Draw(bar)
    for i in range(width):
        draw.line([(i, 0), (i, y1 - y0)], fill=brand_color_at(i / max(1, width - 1)))
    mask = Image.new("L", bar.size, 255)
    if radius:
        mask = Image.new("L", bar.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, bar.size[0] - 1, bar.size[1] - 1], radius, fill=255)
    image.paste(bar, (x0, y0), mask)


def build_og_cover():
    width, height = 1200, 630
    canvas = Image.new("RGBA", (width, height), BG + (255,))

    # 与网页一致的氛围光：蓝 / 紫 / 薄荷
    add_glow(canvas, (150, 90), 420, (122, 162, 255), 120)
    add_glow(canvas, (1080, 120), 380, (176, 124, 255), 105)
    add_glow(canvas, (760, 600), 420, (79, 227, 193), 80)
    add_glow(canvas, (300, 560), 300, (255, 138, 91), 46)

    draw = ImageDraw.Draw(canvas)
    name_font = ImageFont.truetype(FONT_BOLD, 132)
    role_font = ImageFont.truetype(FONT_REGULAR, 44)
    meta_font = ImageFont.truetype(FONT_REGULAR, 26)
    badge_font = ImageFont.truetype(FONT_BOLD, 24)

    margin = 88

    # 顶部徽标
    badge_text = "GLOBAL TECH INDEX 2026"
    badge_w = draw.textlength(badge_text, font=badge_font)
    draw.rounded_rectangle(
        [margin, 74, margin + badge_w + 56, 126], radius=26, outline=(255, 255, 255, 70), width=2
    )
    draw.ellipse([margin + 22, 95, margin + 34, 107], fill=(79, 227, 193))
    draw.text((margin + 44, 88), badge_text, font=badge_font, fill=TEXT_SOFT)

    # 姓名与角色
    draw.text((margin, 196), "张家诚", font=name_font, fill=TEXT)
    draw.text((margin, 356), "全球科技与 AI 导航门户", font=role_font, fill=TEXT_SOFT)

    # 品牌渐变下划线
    draw_gradient_bar(canvas, (margin, 430, margin + 260, 438), radius=4)

    # 底部信息
    draw.text((margin, 486), "52 个精选国外站点 · AI 工具 / 硬件科技 / 软件平台 / 开发者资源", font=meta_font, fill=TEXT_MUTED)
    draw.text((margin, 530), "2028372415@qq.com", font=meta_font, fill=TEXT_MUTED)

    # 右下角品牌字标
    mark_font = ImageFont.truetype(FONT_BOLD, 176)
    mark_w = draw.textlength("张", font=mark_font)
    draw.text((width - margin - mark_w, 356), "张", font=mark_font, fill=brand_color_at(0.55))

    canvas.convert("RGB").save(PUBLIC / "og-cover.png", optimize=True)


def build_apple_touch_icon():
    size = 180
    canvas = Image.new("RGBA", (size, size), BG + (255,))
    add_glow(canvas, (46, 40), 120, (122, 162, 255), 150)
    add_glow(canvas, (140, 150), 110, (79, 227, 193), 110)

    draw = ImageDraw.Draw(canvas)
    font = ImageFont.truetype(FONT_BOLD, 108)
    text = "张"
    left = (size - draw.textlength(text, font=font)) / 2
    draw.text((left, 28), text, font=font, fill=TEXT)

    canvas.convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)


if __name__ == "__main__":
    PUBLIC.mkdir(exist_ok=True)
    build_og_cover()
    build_apple_touch_icon()
    for name in ("og-cover.png", "apple-touch-icon.png"):
        path = PUBLIC / name
        print(f"{name}: {path.stat().st_size / 1024:.1f} KB")
