import { ImageBackground, StyleSheet, Text, View, Modal } from "react-native";
import { useState } from "react"; // El gancho para darle memoria al componente.

// Nuestros componentes personalizados. El botón ya lo tenías, el formulario lo vamos a crear.
import CustomButton from "@/components/Button";
import RegistrationForm from "@/components/RegistrationForm"; // ¡La puerta a la nueva habitación!

// La imagen de fondo, que no se nos olvide.
const coverImage = require("@/assets/images/slide3.jpg");

export default function WelcomeScreen() {
  // Creamos un "interruptor" de luz para nuestro modal. Por defecto, está apagado (false).
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground style={styles.container} source={coverImage}>
      <View style={styles.overlay}>
        {/* ZONA 1: EL HEADER (no se toca) */}
        <View style={styles.headerZone}>
          <Text style={styles.title}>Arqmat</Text>
          <Text style={styles.subtitle}>Tu próximo proyecto, calculado.</Text>
        </View>

        {/* ZONA 2: EL ESPACIADOR (tampoco se toca) */}
        <View style={{ flex: 1 }} />

        {/* ZONA 3: EL FOOTER RENACIDO CON LA NUEVA PUERTA */}
        <View style={styles.footerZone}>
          <CustomButton
            title="Registrarse"
            onPress={() => setModalVisible(true)} // Al tocar, encendemos el interruptor.
          />
        </View>
      </View>

      {/* EL MODAL: La ventana emergente que contiene nuestra habitación de registro. */}
      {/* Está fuera de la estructura principal, "flotando" sobre todo lo demás. */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible} // Su visibilidad depende del interruptor.
        onRequestClose={() => setModalVisible(false)} // Para que el botón "atrás" de Android funcione.
      >
        {/* Aquí dentro cargamos el contenido de la nueva habitación */}
        <RegistrationForm onClose={() => setModalVisible(false)} />
      </Modal>
    </ImageBackground>
  );
}

// Los estilos. Prácticamente los mismos, solo asegúrate de que estén ahí.
const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)", padding: 20 },
  headerZone: { alignItems: "center" },
  footerZone: {},
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: { fontSize: 18, color: "#FFFFFF", textAlign: "center" },
});
