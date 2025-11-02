import { ImageBackground } from "expo-image"; // Usamos ImageBackground para poner contenido encima
import { StyleSheet, Text } from "react-native";

// 1. Aquí le decimos a la app dónde está la imagen.
// El `require` es especial: el sistema (Metro Bundler) encuentra la imagen
// y la empaqueta dentro de tu app. Es como un import para archivos no-JS.
const coverImage = require("@/assets/images/coveram.jpg");

export default function HomeScreen() {
  return (
    // 2. ImageBackground es un componente que es una Imagen y una View a la vez.
    // Todo lo que pongas dentro, se renderizará encima de la imagen.
    <ImageBackground
      style={styles.container}
      source={coverImage}
      contentFit="cover" // Esto es como `background-size: cover` en CSS.
    >
      <Text style={styles.title}>ArqMat</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible.
    justifyContent: "center", // Centra el contenido verticalmente.
    alignItems: "center", // Centra el contenido horizontalmente.
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF", // Texto blanco para que contraste con la imagen.
    // Una pequeña sombra para que el texto sea legible sobre cualquier fondo.
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
