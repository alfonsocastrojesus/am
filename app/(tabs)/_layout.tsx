import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

// Un componente pequeño y reutilizable para el icono. Es una buena práctica.
// Recibe el nombre del icono y el color como propiedades.
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Aquí podemos configurar opciones para TODAS las pestañas a la vez.
        // Por ejemplo, el color de la pestaña activa.
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          // Usamos la opción `tabBarIcon` para renderizar nuestro icono.
          // La propiedad `color` nos la da `Tabs` automáticamente.
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          // Hacemos lo mismo para la otra pestaña, pero con un icono diferente.
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
