import { ImageBackground } from "expo-image";

import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Nuestro botón personalizado, reutilizando el trabajo que ya hicimos.
import CustomButton from "@/components/Button";

// La imagen de fondo principal que ya tenías.
const coverImage = require("@/assets/images/slide3.jpg");

export default function WelcomeScreen() {
  // El 'useRouter' es el gancho que nos da el poder de navegar.
  // Es el sustituto del `window.location.href` del mundo web.
  const router = useRouter();
  // Dentro de `export default function WelcomeScreen() { ... }`

  return (
    <ImageBackground
      style={styles.container}
      source={coverImage}
      contentFit="cover"
    >
      <View style={styles.overlay}>
        {/* ZONA 1: EL HEADER */}
        <View style={styles.headerZone}>
          <Text style={styles.title}>Arqmat</Text>
          <Text style={styles.subtitle}>Tu próximo proyecto, calculado.</Text>
        </View>

        {/* ZONA 2: EL ESPACIADOR MÁGICO */}
        {/* Esta View tiene `flex: 1`, lo que significa que es egoísta.
                Crecerá para ocupar TODO el espacio disponible que dejen
                el header y el footer. Es la columna de carga que quitamos. */}
        <View style={{ flex: 1 }} />

        {/* ZONA 3: EL FOOTER */}
        <View style={styles.footerZone}>
          <CustomButton
            title="Comenzar"
            onPress={() => router.push("/projects")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
// ... al final de tu archivo `app/index.tsx`

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    // OJO: HEMOS QUITADO justifyContent y alignItems de aquí.
    // Ahora cada zona se gestiona a sí misma.
    padding: 20,
  },
  headerZone: {
    alignItems: "center", // Centramos el texto de esta zona
  },
  footerZone: {
    // No necesita mucho, el botón ya ocupa todo el ancho que puede.
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
