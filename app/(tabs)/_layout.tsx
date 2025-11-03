import { FontAwesome5 } from "@expo/vector-icons"; // Usaremos FontAwesome 5, tiene buenos iconos para ti
import { Tabs } from "expo-router";
import React from "react";

// Nuestro componente de icono reutilizable. No lo tocamos, funciona bien.
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  // He aumentado un poco el tamaño, a 24. 28 era un poco grande.
  return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF", // Un azulito más moderno
      }}
    >
      {/* 1. La pantalla de Proyectos. Es la primera. */}
      {/* OJO: El `name` TIENE que coincidir con el nombre del archivo. */}
      <Tabs.Screen
        name="projects" // <- projects.tsx
        options={{
          title: "Proyectos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="drafting-compass" color={color} />
          ),
          headerShown: false, // Mantenemos el header custom que hicimos.
        }}
      />

      {/* 2. Catálogo */}
      <Tabs.Screen
        name="catalog" // <- catalog.tsx
        options={{
          title: "Materiales",
          tabBarIcon: ({ color }) => <TabBarIcon name="cubes" color={color} />,
        }}
      />

      {/* 3. Proveedores */}
      <Tabs.Screen
        name="suppliers" // <- suppliers.tsx
        options={{
          title: "Proveedores",
          tabBarIcon: ({ color }) => <TabBarIcon name="truck" color={color} />,
        }}
      />

      {/* 4. Perfil */}
      <Tabs.Screen
        name="profile" // <- profile.tsx
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
