import { useEffect, useRef } from 'react';
import { PLATFORM_LABELS, PLATFORMS } from '../../core/blog';
import { Icon } from '../../core/icons/Icon';
import { SocialIcon } from '../../core/icons/SocialIcon';
import { useBarLinks } from '../../core/topbar/registry';
import styles from './IdeaDialog.module.scss';

/** «Предложить идею»: куда писать. Идеи собираются в комментариях под последним роликом. */
export function IdeaDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null);
    const { profiles } = useBarLinks();
    const platforms = PLATFORMS.filter((p) => profiles[p]);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref={ref}
            className={styles.dialog}
            onClose={onClose}
            onClick={(e) => e.target === ref.current && onClose()}
            aria-labelledby="idea-title"
        >
            <div className={styles.header}>
                <h2 id="idea-title" className={styles.title}>
                    Предложить идею
                </h2>
                <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
                    <Icon name="close" />
                </button>
            </div>
            <p className={styles.text}>
                Оставьте идею в комментариях под последним роликом. Подойдёт любая площадка: самая залайканная идея с каждой выходит в финал.
            </p>
            <ul className={styles.list}>
                {platforms.map((p) => (
                    <li key={p}>
                        <a className={styles.platform} href={profiles[p]} target="_blank" rel="noopener" data-audit={`idea-${p}`}>
                            <SocialIcon platform={p} className={styles.icon} />
                            {PLATFORM_LABELS[p]}
                        </a>
                    </li>
                ))}
            </ul>
        </dialog>
    );
}
