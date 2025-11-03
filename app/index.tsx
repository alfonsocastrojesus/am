import { Redirect } from "expo-router";

/**
 * Este componente es el guardián de la puerta principal de la app.
 * Su única función es interceptar a cualquiera que llegue a la raíz ('/')
 * y redirigirlo inmediatamente a la pantalla de proyectos.
 * No es una pantalla, es una señal de tráfico.
 */
export default function RootIndex() {
  return <Redirect href="/projects" />;
}
