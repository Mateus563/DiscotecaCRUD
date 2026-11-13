import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Oque deseja fazer?" }} />

      <View style={styles.cabecalho}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.saudacao}>Escolha um hobbie</Text>
          <Text style={styles.subtitulo}>Bem-vindo de volta</Text>
        </View>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Discoteca</Text>
        <Text style={styles.detalhe}>Venha discotecar conosco</Text>
        <Link href="/discoteca" style={styles.link}>
          Ver meus discos →
        </Link>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFD3E1",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7A6A5B",
  },

  saudacao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e3a55",
  },

  subtitulo: {
    fontSize: 14,
    color: "#496eb3",
    marginTop: 2,
  },

  cartao: {
    backgroundColor: "#FFF1A6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },

  cartaoTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4e6597",
  },

  detalhe: {
    fontSize: 14,
    color: "#576c8d",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3e60be",
    marginTop: 4,
  },
});
