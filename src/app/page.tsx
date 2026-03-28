/**
 * Página principal — orquestador de secciones.
 * Este archivo no contiene lógica ni estilos.
 * Solo importa y ordena las secciones del portfolio.
 */
import { BootSection } from '@/features/boot'

export default function Home() {
  return (
    <main>
      {/* /boot — Hero section */}
      <BootSection />

      {/* Las demás secciones se agregan aquí conforme se construyan */}
      {/* <ProfileSection /> */}
      {/* <ProjectsSection /> */}
      {/* <TerminalSection /> */}
      {/* <ContactSection /> */}
    </main>
  )
}