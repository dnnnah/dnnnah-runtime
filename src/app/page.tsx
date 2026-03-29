/**
 * Página principal — orquestador de secciones.
 * Este archivo no contiene lógica ni estilos.
 * Solo importa y ordena las secciones del portfolio.
 */
import { BootSection } from '@/features/boot'
import { ProfileSection } from '@/features/profile'
import { ProjectsSection } from '@/features/projects'

export default function Home() {
  return (
    <main>
      {/* /boot — Hero section */}
      <BootSection />
      {/* <ProfileSection /> */}
      <ProfileSection />
      {/* <ProjectsSection /> */}
      <ProjectsSection />
      {/* <TerminalSection /> */}
      {/* <ContactSection /> */}
    </main>
  )
}