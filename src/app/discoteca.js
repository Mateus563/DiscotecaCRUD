import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, FlatList, TextInput, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const API_URL = "https://6ae534cf28393034b08e2fb4.mockapi.io/Discoteca";

export default function Discoteca() {
    const [discoteca, setDiscoteca] = useState([]);
    const [artista, setArtista] = useState("");
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [tipoAlbum, setTipoAlbum] = useState("");
    const [lancamento, setLancamento] = useState(0);
    const [idEditando, setIdEditando] = useState(0);

    async function buscarDiscoteca() {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        setDiscoteca(dados);
    }

    async function salvarDiscoteca() {
        if (idEditando === 0) {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    artista: artista,
                    nome: nome,
                    valor: valor,
                    tempo: tempo,
                    tipoAlbum: tipoAlbum,
                    lancamento: lancamento,
                }),
            });
        } else {
            await fetch(API_URL + "/" + idEditando, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    artista: artista,
                    nome: nome,
                    valor: valor,
                    tempo: tempo,
                    tipoAlbum: tipoAlbum,
                    lancamento: lancamento,
                }),
            });

            setIdEditando(0);
        }
        setArtista("");
        setNome("");
        setValor("");
        setTempo("");
        setTipoAlbum("");
        setLancamento("");

        buscarDiscoteca();
    }

    async function excluir(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    buscarDiscoteca();
  }

  async function editar(item) {
    setIdEditando(item.id);
    setArtista(item.artista);
    setNome(item.nome);
    setValor(item.valor);
    setTempo(item.tempo);
    setTipoAlbum(item.tipoAlbum);
    setLancamento(item.lancamento)
  }

  useEffect(() => {
    buscarDiscoteca();
  }, []);


    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Meus álbuns" }} />

            <TextInput
                style={styles.campo}
                value={artista}
                onChangeText={setArtista}
                placeholder="Nome do Artista"
            />

            <TextInput
                style={styles.campo}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do Álbum"
            />
            <TextInput
                style={styles.campo}
                value={valor}
                onChangeText={setValor}
                placeholder="Valor (R$)"
            />
            <TextInput
                style={styles.campo}
                value={tempo}
                onChangeText={setTempo}
                placeholder="Tempo (minutos)"
            />
            <TextInput
                style={styles.campo}
                value={tipoAlbum}
                onChangeText={setTipoAlbum}
                placeholder="Gênero"
            />
            <TextInput
                style={styles.campo}
                value={lancamento}
                onChangeText={setLancamento}
                placeholder="Data de lançamento"
            />

            <Button title="💾" onPress={salvarDiscoteca} />

            <FlatList
                style={styles.lista}
                data={discoteca}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.item}>
                          Artista: {item.artista} 
                          {"\n"}
                          Nome: {item.nome}  
                          {"\n"}
                          Gênero:  {item.tipoAlbum} 
                          {"\n"}
                          Tempo: {item.tempo} minutos 
                          {"\n"}
                          Valor:  R${item.valor} 
                        </Text>
                        <View style={styles.botao}>
                        <Button title="🗑️" onPress={() => excluir(item.id)} />
                        <Button title="✏️" onPress={() => editar(item)} />
                        </View>
                    </View>
                )}
            />
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

    botao: {
        flexDirection: 'row', 
        gap: 10,              
        marginTop: 8,

    },

    campo: {
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: "#090b0e",
        marginBottom: 12,
    },

    lista: {
        flex: 1,
        marginTop: 16,
    },

    item: {
        backgroundColor: "#FFF1A6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        fontSize: 15,
        lineHeight: 28,
        color: "#000000",
    },
});