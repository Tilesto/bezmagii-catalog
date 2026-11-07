/**
 * React не пишет атрибут muted в DOM, а без него браузеры (особенно iOS Safari) не дают
 * автозапуск. Ставим его сами и запускаем вручную.
 */
function autoplay(video: HTMLVideoElement | null) {
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    void video.play().catch(() => {
        // режим энергосбережения и т. п. — останется постер, это нормально
    });
}

/**
 * Печатающий кот (brand/mascot/anim/cat-typing, 660×720, прозрачный фон).
 * Safari умеет прозрачность только в HEVC (.mov, hvc1) — он идёт первым: Chrome и Firefox
 * такой тип не берут и переходят к VP9 .webm. Анимируется у всех, в том числе при «уменьшить
 * движение» (решение владельца 2026-11-07): кот небольшой и без резких движений.
 */
export function Mascot({ className }: { className?: string }) {
    const alt = 'Рыжий кот в колпаке волшебника печатает на ноутбуке и радостно вскидывает лапы';

    return (
        <video
            ref={autoplay}
            className={className}
            width={660}
            height={720}
            poster="/mascot/cat.svg"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            aria-label={alt}
        >
            <source src="/mascot/cat-typing.mov" type='video/quicktime; codecs="hvc1"' />
            <source src="/mascot/cat-typing.webm" type="video/webm" />
        </video>
    );
}

/** Знак бренда: звезда «магии» в знаке «запрещено» — как на колпаке кота. */
export function NopeStar({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <g stroke="var(--ink)" strokeLinejoin="round" strokeLinecap="round">
                <circle cx="24" cy="24" r="22" fill="var(--card)" strokeWidth="2.5" />
                <path
                    d="M24 10.5 27.4 18.1 35.6 19 29.5 24.5 31.2 32.6 24 28.5 16.8 32.6 18.5 24.5 12.4 19 20.6 18.1Z"
                    fill="var(--star)"
                    strokeWidth="2"
                />
                <circle cx="24" cy="22" r="14.5" fill="none" stroke="var(--nope)" strokeWidth="3.5" />
                <path d="M13.8 11.8 34.2 32.2" stroke="var(--nope)" strokeWidth="3.5" />
            </g>
        </svg>
    );
}
