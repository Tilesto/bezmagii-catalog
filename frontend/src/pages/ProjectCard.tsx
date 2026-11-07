import { useQuery } from '@tanstack/react-query';
import type { RegistryProject } from '../core/topbar/registry';
import { PLATFORM_LABELS, PLATFORMS } from '../core/blog';
import { SocialIcon } from '../core/icons/SocialIcon';
import { Icon } from '../core/icons/Icon';
import { formatNumber } from '../core/format';
import styles from './ProjectCard.module.scss';

interface Counters {
    visits: number;
    users: number;
}

/** Карточка сайта: номер, название, ссылка, ролики, счётчики (читаются с бэка самого сайта). */
export function ProjectCard({ project }: { project: RegistryProject }) {
    const counters = useQuery({
        queryKey: ['project-stats', project.slug],
        queryFn: async (): Promise<Counters> => {
            const res = await fetch(`${project.url.replace(/\/$/, '')}/api/stats`);
            if (!res.ok) throw new Error(String(res.status));
            return (await res.json()) as Counters;
        },
        staleTime: 60_000,
        retry: 0,
    });
    const videos = PLATFORMS.filter((p) => project.videos?.[p]);
    const host = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return (
        <li className={styles.card}>
            <a className={styles.link} href={project.url} data-audit={`project-${project.slug}`}>
                <span className={styles.number}>#{project.number}</span>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.host}>{host}</span>
            </a>
            <div className={styles.meta}>
                {counters.data && (
                    <span className={styles.counter} title="Посещения">
                        <Icon name="eye" className={styles.counterIcon} />
                        {formatNumber(counters.data.visits)}
                    </span>
                )}
                {videos.length > 0 && (
                    <span className={styles.videos}>
                        {videos.map((p) => (
                            <a
                                key={p}
                                className={styles.video}
                                href={project.videos![p]}
                                target="_blank"
                                rel="noopener"
                                aria-label={`Ролик про «${project.title}» в ${PLATFORM_LABELS[p]}`}
                                data-audit={`project-${project.slug}-${p}`}
                            >
                                <SocialIcon platform={p} className={styles.videoIcon} />
                            </a>
                        ))}
                    </span>
                )}
            </div>
        </li>
    );
}
