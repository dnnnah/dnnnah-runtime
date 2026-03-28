'use client'

const NAV_ITEMS = [
  { label: 'struct Profile',   href: '#struct-profile' },
  { label: 'class Automation', href: '#class-automation' },
  { label: 'experience[]',     href: '#experience' },
  { label: 'education[]',      href: '#education' },
  { label: 'certifications[]', href: '#certifications' },
  { label: '// soft skills',   href: '#soft-skills' },
]

export function SectionNav() {
  return (
    <nav aria-label="Navegación del perfil">
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="font-mono" style={{ fontSize: '11px', color: 'var(--color-text-muted)', textDecoration: 'none', display: 'block', padding: '4px 8px', borderRadius: '4px', borderLeft: '2px solid transparent', transition: 'color 0.2s ease, border-left-color 0.2s ease' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderLeftColor = 'var(--color-accent)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderLeftColor = 'transparent' }}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
