import type { RegistryProject } from '../../core/topbar/registry';
import { formatMinutes, formatNumber } from '../../core/format';
import styles from './Receipt.module.scss';

/** Честные цифры сайта — tools/deploy.sh кладёт их в реестр из project.json → honest. */
export interface Honest {
    totalMin: number | null;
    activeMin: number | null;
}

export type ProjectWithHonest = RegistryProject & { honest?: Honest | null };

const sum = (projects: ProjectWithHonest[], key: keyof Honest) =>
    projects.reduce((acc, p) => acc + (p.honest?.[key] ?? 0), 0);

/** Чек челленджа: сколько сайтов в проде и сколько на них ушло времени. */
export function Receipt({ projects }: { projects: ProjectWithHonest[] }) {
    const total = sum(projects, 'totalMin');
    const active = sum(projects, 'activeMin');

    const rows: [string, string][] = [
        ['Сайтов в проде', formatNumber(projects.length)],
        ['За клавиатурой', formatMinutes(active)],
    ];

    return (
        <div className={styles.receipt}>
            <div className={styles.paper}>
                <p className={styles.head}>
                    <span className={styles.shop}>БЕЗ МАГИИ</span>
                    <span>bezmagii.site</span>
                    <span>«Сайт через день»</span>
                </p>
                <dl className={styles.rows}>
                    {rows.map(([label, value]) => (
                        <div key={label} className={styles.row}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
                <p className={styles.total}>
                    <span>ВСЕГО ВРЕМЕНИ</span>
                    <span>{formatMinutes(total)}</span>
                </p>
                <p className={styles.note}>Цифры по каждому сайту есть в его подвале.</p>
            </div>
        </div>
    );
}
