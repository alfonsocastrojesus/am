import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { z } from "zod";

// El contrato de calidad (Zod). Inmutable. La roca sobre la que construimos.
const registrationSchema = z.object({
  nombre: z
    .string()
    .min(1, "Oye, necesitamos tu nombre")
    .max(20, "Eso es más un título que un nombre")
    .regex(/^[a-zA-Z\s'-]+$/, "Solo letras, por favor"),
  fechaNacimiento: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato: DD/MM/AAAA. Ni más, ni menos."),
  sexo: z.enum(["hombre", "mujer"], {
    required_error: "Selecciona una opción",
  }),
  occupation: z.enum(
    ["albañil", "arquitecto", "ingeniero", "ayudante", "otro"],
    { required_error: "Dinos a qué te dedicas" }
  ),
  tipoTrabajo: z.enum(["obra negra", "obra gris", "obra blanca"], {
    required_error: "Selecciona el tipo de obra",
  }),
  esIndependiente: z.boolean(),
  esEmpleado: z.boolean(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

// La función de formateo. Sigue haciendo su trabajo en silencio, como un buen microservicio.
const formatInputAsDate = (text: string) => {
  const cleaned = text.replace(/[^0-9]/g, "");
  const match = cleaned.match(/^(\d{1,2})(\d{1,2})?(\d{1,4})?$/);
  if (!match) return "";
  const [, day, month, year] = match;
  let formatted = "";
  if (day) formatted += day;
  if (month) formatted += `/${month}`;
  if (year) formatted += `/${year}`;
  return formatted;
};

export default function RegistrationForm({ onClose }: { onClose: () => void }) {
  const [sexoOpen, setSexoOpen] = useState(false);
  const [occupationOpen, setOccupationOpen] = useState(false);
  const [tipoTrabajoOpen, setTipoTrabajoOpen] = useState(false);

  const [sexoItems, setSexoItems] = useState([
    { label: "Hombre", value: "hombre" },
    { label: "Mujer", value: "mujer" },
  ]);
  const [occupationItems, setOccupationItems] = useState([
    { label: "Albañil", value: "albañil" },
    { label: "Arquitecto/a", value: "arquitecto" },
    { label: "Ingeniero/a", value: "ingeniero" },
    { label: "Ayudante", value: "ayudante" },
    { label: "Otro", value: "otro" },
  ]);
  const [tipoTrabajoItems, setTipoTrabajoItems] = useState([
    { label: "Obra Negra", value: "obra negra" },
    { label: "Obra Gris", value: "obra gris" },
    { label: "Obra Blanca", value: "obra blanca" },
  ]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { esIndependiente: false, esEmpleado: false },
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log("¡Funciona! Datos validados:", data);
    alert("¡Registro completado! Por fin.");
    onClose();
  };

  const onSexoOpen = () => {
    setOccupationOpen(false);
    setTipoTrabajoOpen(false);
  };
  const onOccupationOpen = () => {
    setSexoOpen(false);
    setTipoTrabajoOpen(false);
  };
  const onTipoTrabajoOpen = () => {
    setSexoOpen(false);
    setOccupationOpen(false);
  };

  return (
    <View style={styles.modalContainer}>
      <ScrollView
        style={styles.modalContent}
        contentContainerStyle={{
          paddingBottom:
            sexoOpen || occupationOpen || tipoTrabajoOpen ? 220 : 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crear una cuenta</Text>

        <Text style={styles.label}>Nombre</Text>
        <Controller
          control={control}
          name="nombre"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.nombre && (
          <Text style={styles.errorText}>{errors.nombre.message}</Text>
        )}

        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <Controller
          control={control}
          name="fechaNacimiento"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatInputAsDate(text))}
              value={value}
              maxLength={10}
            />
          )}
        />
        {errors.fechaNacimiento && (
          <Text style={styles.errorText}>{errors.fechaNacimiento.message}</Text>
        )}

        {/* === El pequeño cambio con un gran impacto === */}
        <Text style={styles.label}>Sexo</Text>
        <Controller
          control={control}
          name="sexo"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              open={sexoOpen}
              value={value}
              items={sexoItems}
              setOpen={setSexoOpen}
              setValue={onChange}
              setItems={setSexoItems}
              onOpen={onSexoOpen}
              placeholder="Selecciona una opción..."
              style={styles.dropdown}
              listMode="SCROLLVIEW" // --> ¡AQUÍ ESTÁ LA MAGIA! Adiós, bazuca.
              zIndex={3000}
              zIndexInverse={1000}
            />
          )}
        />
        {errors.sexo && (
          <Text style={styles.errorText}>{errors.sexo.message}</Text>
        )}

        <Text style={styles.label}>Ocupación</Text>
        <Controller
          control={control}
          name="occupation"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              open={occupationOpen}
              value={value}
              items={occupationItems}
              setOpen={setOccupationOpen}
              setValue={onChange}
              setItems={setOccupationItems}
              onOpen={onOccupationOpen}
              placeholder="Selecciona una ocupación..."
              style={styles.dropdown}
              listMode="SCROLLVIEW" // --> Consistencia, colega. Siempre consistencia.
              zIndex={2000}
              zIndexInverse={2000}
            />
          )}
        />
        {errors.occupation && (
          <Text style={styles.errorText}>{errors.occupation.message}</Text>
        )}

        <Text style={styles.label}>Tipo de trabajo que realizas</Text>
        <Controller
          control={control}
          name="tipoTrabajo"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              open={tipoTrabajoOpen}
              value={value}
              items={tipoTrabajoItems}
              setOpen={setTipoTrabajoOpen}
              setValue={onChange}
              setItems={setTipoTrabajoItems}
              onOpen={onTipoTrabajoOpen}
              placeholder="Selecciona el tipo de obra..."
              style={styles.dropdown}
              listMode="SCROLLVIEW" // --> Y una vez más, para la buena suerte.
              zIndex={1000}
              zIndexInverse={3000}
            />
          )}
        />
        {errors.tipoTrabajo && (
          <Text style={styles.errorText}>{errors.tipoTrabajo.message}</Text>
        )}

        <Text style={styles.label}>¿Trabajador independiente?</Text>
        <Controller
          control={control}
          name="esIndependiente"
          render={({ field: { value } }) => (
            <View style={styles.segmentedControlContainer}>
              <TouchableOpacity
                onPress={() =>
                  setValue("esIndependiente", true, { shouldValidate: true })
                }
                style={[
                  styles.segmentedButton,
                  value === true && styles.segmentedButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentedButtonText,
                    value === true && styles.segmentedButtonTextActive,
                  ]}
                >
                  Sí
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setValue("esIndependiente", false, { shouldValidate: true })
                }
                style={[
                  styles.segmentedButton,
                  value === false && styles.segmentedButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentedButtonText,
                    value === false && styles.segmentedButtonTextActive,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Text style={styles.label}>¿Empleado de empresa?</Text>
        <Controller
          control={control}
          name="esEmpleado"
          render={({ field: { value } }) => (
            <View style={styles.segmentedControlContainer}>
              <TouchableOpacity
                onPress={() =>
                  setValue("esEmpleado", true, { shouldValidate: true })
                }
                style={[
                  styles.segmentedButton,
                  value === true && styles.segmentedButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentedButtonText,
                    value === true && styles.segmentedButtonTextActive,
                  ]}
                >
                  Sí
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setValue("esEmpleado", false, { shouldValidate: true })
                }
                style={[
                  styles.segmentedButton,
                  value === false && styles.segmentedButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentedButtonText,
                    value === false && styles.segmentedButtonTextActive,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button title="Cancelar" onPress={onClose} color="tomato" />
          <Button title="Registrarme" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  label: { marginTop: 15, fontSize: 16, color: "#333", fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: { color: "red", marginTop: 4, fontSize: 12 },
  dropdown: { borderColor: "#ccc", marginTop: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 40,
  },
  segmentedControlContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    marginTop: 5,
    overflow: "hidden",
  },
  segmentedButton: { flex: 1, padding: 10, alignItems: "center" },
  segmentedButtonActive: { backgroundColor: "#007AFF" },
  segmentedButtonText: { color: "#007AFF", fontSize: 16 },
  segmentedButtonTextActive: { color: "white" },
});
