import { ImageBackground } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const coverImage = require("@/assets/images/coveram.jpg");

export default function HomeScreen() {
  return (
    // Usamos ImageBackground como el contenedor principal que lo ocupa todo.
    <ImageBackground
      style={styles.container}
      source={coverImage}
      contentFit="cover"
    >
      {/* SafeAreaView AHORA ESTÁ DENTRO. Su única misión es empujar
          el contenido hacia abajo para que no choque con la barra de estado. */}
      <SafeAreaView style={styles.container}>
        {/* Esta View es una "pegatina" que pondremos encima de todo. */}
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Arqmat</Text>
        </View>

        {/* Aquí, en el centro, podrías poner más cosas en el futuro */}
        {/*
        <View style={styles.mainContent}>
          <Text>Otro contenido...</Text>
        </View>
        */}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Siempre: ocupa todo el espacio que te den.
  },
  headerOverlay: {
    // ¡AQUÍ ESTÁ LA MAGIA! Como position: absolute en CSS.
    position: "absolute",
    top: 0, // Pégate a la parte de arriba...
    left: 0, // ...a la izquierda...
    right: 0, // ...y a la derecha. Esto hace que ocupe todo el ancho.
    alignItems: "center", // Centra su contenido (el texto) horizontalmente.
    padding: 15, // Un poco de aire para que no se pegue al borde.
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // Texto blanco para que se vea en el cielo.
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Sombrita para legibilidad.
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  mainContent: {
    // Estilos para el futuro contenido que quieras centrar
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
